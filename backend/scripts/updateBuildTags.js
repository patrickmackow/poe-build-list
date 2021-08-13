const mongoose = require("mongoose");
const { mongooseConfig } = require("../config.json");

const Build = require("../models/Build");
const assert = require("assert");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { generateTags } = require("../lib/parser");

function arrayEquals(a, b) {
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // Array isn't sorted but this doesn't matter
  for (let i = 0; i < a.length; i++) {
    let aProps = Object.getOwnPropertyNames(a[i]);
    let bProps = Object.getOwnPropertyNames(b[i]);

    // Check amount of properties is equal
    if (aProps.length !== bProps.length) {
      return false;
    }

    // Check property values are equal
    for (let j = 0; j < aProps.length; j++) {
      let prop = aProps[j];

      if (a[i][prop] !== b[i][prop]) {
        return false;
      }
    }
  }
  return true;
}

async function updateBuildTags() {
  // Connect to db
  await mongoose.connect(process.env.MONGO_URL, {
    ...mongooseConfig,
    dbName: process.env.MONGO_DB_NAME,
  });

  console.log(`Connected to db ${process.env.MONGO_URL} successfully`);

  // Get all builds
  const builds = await Build.find();

  // Loop over builds and update the tags based on the title
  // If tags are unchanged don't update
  let updated = 0;
  await Promise.all(
    builds.map((build) => {
      const tags = generateTags(build.title);

      // Save builds back to db
      if (arrayEquals(tags, build.toObject().generatedTags)) return;

      console.log(build.title, tags, build.generatedTags);
      build.generatedTags = tags;
      return build
        .save()
        .then((result) => updated++)
        .catch((err) => {
          if (err) throw new Error("Error saving to db");
        });
    })
  );

  console.log(`Updated ${updated} builds`);

  mongoose.disconnect();
}

(function testArrayEquals() {
  assert(arrayEquals([], []));
  assert(arrayEquals([{}], [{}]));
  assert(arrayEquals([{ tag: "a", type: "" }], [{ tag: "a", type: "" }]));
  assert(
    arrayEquals(
      [
        { tag: "a", type: "" },
        { tag: "b", type: "" },
      ],
      [
        { tag: "a", type: "" },
        { tag: "b", type: "" },
      ]
    )
  );
  assert(!arrayEquals([{ tag: "a", type: "" }], [{ tag: "b", type: "" }]));
  assert(!arrayEquals([], [{ tag: "b", type: "" }]));
  assert(!arrayEquals([{ tag: "a", type: "" }], []));
})();

updateBuildTags();
