const cheerio = require("cheerio");

parser = body => {
  let rows;
  const $ = cheerio.load(body);

  rows = $("#view_forum_table tbody tr")
    .map((i, el) => {
      const row = {};
      row.title = "";
      row.author = "";
      row.url = "";
      row.views = "";
      row.postDate = "";
      return row;
    })
    .get();

  return rows;
};

module.exports = parser;
