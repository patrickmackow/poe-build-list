const mongoose = require("mongoose");
const Build = require("../models/Build");
const Config = require("../models/Config");
require("dotenv").config();

const { scraper } = require("../lib/scraper");
const e = require("express");

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
  const builds = [].concat(...results.map((result) => result.data));
  return builds;
}

async function writeToDb(builds) {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
  });

  mongoose.Promise = Promise;

  console.log(`Connected to db (${process.env.MONGO_URL}) successfully`);

  versions = {};
  latest_version = "";

  const bulk = Build.collection.initializeUnorderedBulkOp();
  builds.map((build) => {
    // Latest patch is determined by the total number of builds using the patch number
    // TODO: Only count patch numbers from the front page
    if (versions[build.version]) {
      versions[build.version]++;
    } else {
      versions[build.version] = 1;
    }

    if (!latest_version) {
      latest_version = build.version;
    } else if (versions[build.version] > versions[latest_version]) {
      latest_version = build.version;
    }

    build.updatedOn = new Date();
    bulk
      .find({ url: build.url })
      .upsert()
      .updateOne({ ...build });
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
  await Config.findOneAndUpdate(
    { key: "version" },
    { value: latest_version },
    { upsert: true }
  );
  console.log("Latest version: ", latest_version);

  mongoose.connection.close();
}

async function runScraper() {
  const builds = await scrape();
  await writeToDb(builds);
}

runScraper();
