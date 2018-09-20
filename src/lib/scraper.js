const axios = require("axios");
const url = require("url");
const http = require("http");
const https = require("https");

const { parser } = require("./parser");

const config = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0"
  },
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

const scrapeURL = u => {
  return axios
    .get(u, config)
    .then(response => {
      return {
        url: u,
        data: parser(response.data)
      };
    })
    .catch(error => {
      return {
        url: u,
        error
      };
    });
};

const scraper = async (urls, options = { limit: 0, depth: 1 }) => {
  if (options && options.limit) {
    config.httpAgent = new http.Agent({ maxSockets: options.limit });
    config.httpsAgent = new https.Agent({ maxSockets: options.limit });
  }

  const promises = mapUrls(urls, options.depth).map(u => {
    return scrapeURL(u);
  });

  const rows = await Promise.all(promises);
  return rows;
};

module.exports = {
  scraper,
  mapUrls,
  scrapeURL
};
