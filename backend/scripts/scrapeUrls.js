const mongoose = require("mongoose");
const { mongooseConfig } = require("../config.json");

const Build = require("../models/Build");
const Config = require("../models/Config");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { scraper } = require("../lib/scraper");

const urls = [
  "https://www.pathofexile.com/forum/view-forum/40",
  "https://www.pathofexile.com/forum/view-forum/marauder",
  "https://www.pathofexile.com/forum/view-forum/24",
  "https://www.pathofexile.com/forum/view-forum/436",
  "https://www.pathofexile.com/forum/view-forum/303",
  "https://www.pathofexile.com/forum/view-forum/41",
  "https://www.pathofexile.com/forum/view-forum/22",
];

async function scrape() {
  const results = await scraper(urls, { limit: 10, depth: 5 });

  // All urls must not return errors
  results.map((result) => {
    if (result.err !== undefined) {
      throw { u, err };
    }
  });

  // Merge data into one array
  return [].concat(...results.map((result) => result.data));
}

async function writeToDb(builds) {
  await mongoose.connect(process.env.MONGO_URL, {
    ...mongooseConfig,
    dbName: process.env.MONGO_DB_NAME,
  });

  mongoose.Promise = Promise;

  console.log(`Connected to db (${process.env.MONGO_URL}) successfully`);

  const versions = {};

  const bulk = Build.collection.initializeUnorderedBulkOp();
  builds.map((build) => {
    // Latest patch is determined by the total number of builds using the patch number
    // TODO: Only count patch numbers from the front page
    if (versions[build.version]) {
      versions[build.version]++;
    } else {
      // Don't count empty string toward version count
      if (build.version.length) {
        versions[build.version] = 1;
      }
    }

    build.updatedOn = new Date();
    bulk
      .find({ url: build.url })
      .upsert()
      .updateOne({ $set: { ...build } });
  });

  await bulk
    .execute()
    .then(({ result }) =>
      console.log(
        "Upserted: " +
          result.nUpserted +
          "\nMatched: " +
          result.nMatched +
          "\nModified: " +
          result.nModified
      )
    )
    .catch((err) => console.log(JSON.stringify(err)));

  // Save latest version to mongodb
  let latest_version;
  Object.keys(versions).map((version) => {
    if (
      latest_version === undefined ||
      versions[version] > versions[latest_version]
    ) {
      latest_version = version;
    }
  });

  await Config.findOneAndUpdate(
    { key: "version" },
    { value: latest_version },
    { upsert: true }
  );
  console.log("Latest version: ", latest_version);

  await mongoose.connection.close();
}

(async () => {
  const builds = await scrape();
  await writeToDb(builds);
})();
