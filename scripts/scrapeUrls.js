const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const { scraper } = require("../src/lib/scraper");

const urls = [
  "https://www.pathofexile.com/forum/view-forum/40",
  "https://www.pathofexile.com/forum/view-forum/marauder",
  "https://www.pathofexile.com/forum/view-forum/24",
  "https://www.pathofexile.com/forum/view-forum/436",
  "https://www.pathofexile.com/forum/view-forum/303",
  "https://www.pathofexile.com/forum/view-forum/41",
  "https://www.pathofexile.com/forum/view-forum/22"
];

async function runScraper() {
  const results = await scraper(urls, { limit: 10, depth: 5 });

  // All urls must not return errors
  results.map(result => {
    if (result.err !== undefined) {
      throw { u, err };
    }
  });

  // Merge data into one array
  const builds = [].concat(...results.map(result => result.data));

  MongoClient.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) throw err;
      console.log(`Connected to db (${process.env.MONGO_URL}) successfully`);

      const db = client.db(process.env.MONGO_DB_NAME);

      // Create bulk update operations for Mongo
      let bulk = db.collection("builds").initializeUnorderedBulkOp();
      builds.map(build => {
        bulk
          .find({ url: build.url })
          .upsert()
          .updateOne({
            ...build
          });
      });

      bulk.execute().then(({ result }) => {
        console.log(result);
      });

      client.close();
    }
  );
}

runScraper();
