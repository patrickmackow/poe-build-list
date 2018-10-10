const mongoose = require("mongoose");
const Build = require("../src/models/Build");
const assert = require("assert");
require("dotenv").config();

const { generateTags } = require("../src/lib/parser");

function arrayEquals(a, b) {
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // Array isn't sorted but this doesn't matter
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

async function updateBuildTags() {
  // Connect to db
  await mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      dbName: process.env.MONGO_DB_NAME
    }
  );

  console.log(`Connected to db ${process.env.MONGO_URL} successfully`);

  // Get all builds
  const builds = await Build.find();

  // Loop over builds and update the tags based on the title
  // If tags are unchanged don't update
  let updated = 0;
  await Promise.all(
    builds.map(build => {
      const tags = generateTags(build.title);

      // Save builds back to db
      if (arrayEquals(tags, build.generatedTags)) return;

      console.log(build.title, tags, build.generatedTags);
      build.generatedTags = tags;
      return build
        .save()
        .then(result => updated++)
        .catch(err => {
          if (err) throw new Error("Error saving to db");
        });
    })
  );

  console.log(`Updated ${updated} builds`);

  mongoose.disconnect();
}

(function testArrayEquals() {
  assert(arrayEquals([], []));
  assert(arrayEquals(["a"], ["a"]));
  assert(arrayEquals(["a", "b"], ["a", "b"]));
  assert(!arrayEquals(["a"], ["b"]));
  assert(!arrayEquals([], ["b"]));
  assert(!arrayEquals(["a"], []));
})();

updateBuildTags();
