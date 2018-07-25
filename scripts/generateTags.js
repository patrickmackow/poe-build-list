const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const URL = "http://poedb.tw/us/gem.php?cn=Active+Skill+Gem";

const tags = {};

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    // If file doesn't exist return an empty JSON string
    return "{}";
  }
}

function writeFile(filePath, file) {
  fs.writeFileSync(filePath, file, "utf-8");
}

function jsonToObject(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
}

request(URL, function(error, response, body) {
  if (response && response.statusCode !== 200) {
    throw new Error("Request returned with status: " + response.statusCode);
  }

  const $ = cheerio.load(body);
  $("table tbody tr").each(function(i, el) {
    tag = $("a", el)
      .eq(1)
      .text()
      .toLowerCase();
    tags[tag] = [tag];
  });

  const filePath = process.argv[2] ? path.resolve(process.argv[2]) : undefined;

  // Write to console if filePath is not specified
  if (!filePath) {
    console.log(tags);
    return;
  }

  const oldFile = jsonToObject(readFile(filePath));
  const newFile = Object.assign(tags, oldFile);
  const sortedJSON = prettier.format(
    JSON.stringify(newFile, Object.keys(newFile).sort(), 2),
    { parser: "json" }
  );
  writeFile(filePath, sortedJSON);
});
