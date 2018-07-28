const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const axios = require("axios");

const URL = "http://poedb.tw/us/gem.php?cn=Active+Skill+Gem";
const config = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0"
  }
};

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    // If file doesn't exist return an empty JSON string
    return "{}";
  }
}

function writeFile(filePath, file) {
  if (!filePath) {
    console.log(file);
    return;
  }
  try {
    fs.writeFileSync(filePath, file, "utf-8");
  } catch (error) {
    console.log("Error writing file", error.message);
  }
}

function jsonToObject(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
}

function scrapeTags(body) {
  const $ = cheerio.load(body);
  const tags = {};

  $("table tbody tr").each(function(i, el) {
    tag = $("a", el)
      .eq(1)
      .text()
      .toLowerCase();
    tags[tag] = [tag];
  });

  return tags;
}

function sortJSON(json) {
  const sorted = JSON.stringify(json, Object.keys(json).sort(), 2);
  return prettier.format(sorted, { parser: "json" });
}

function handleErrors(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

axios
  .get(URL, config)
  .then(response => {
    const tags = scrapeTags(response.data);
    const filePath = process.argv[2]
      ? path.resolve(process.argv[2])
      : undefined;

    const oldFile = jsonToObject(readFile(filePath));
    const newFile = Object.assign(tags, oldFile);
    const sortedJSON = sortJSON(newFile);

    writeFile(filePath, sortedJSON);
  })
  .catch(error => {
    handleErrors(error);
  });
