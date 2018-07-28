const axios = require("axios");
const url = require("url");

const { parser } = require("./parser");

const config = {
  headers: {},
  timeout: 0
};

const mapUrls = (urls = [], depth = 0) => {
  mappedUrls = [];
  urls.map(u => {
    // Add trailing slash otherwise url.resolve with overwrite the last part of the url
    if (u[u.length - 1] !== "/") {
      u = u + "/";
    }

    for (let i = 1; i <= depth; i++) {
      mappedUrls.push(url.resolve(u, "page/" + i));
    }
  });
  return mappedUrls;
};

const scraper = async scapeURL => {};

const scrape = (urls, options = { limit: 0, depth: 3 }) => {};

module.exports = {
  scrape,
  mapUrls
};
