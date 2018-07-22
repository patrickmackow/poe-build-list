const cheerio = require("cheerio");
const url = require("url");

extractTitle = (el, $) => {
  return $(".title a", el)
    .text()
    .trim();
};

extractAuthor = (el, $) => {
  return $(".postBy a", el)
    .eq(0)
    .text()
    .trim();
};

extractUrl = (el, $) => {
  const relative = $(".title a", el).attr("href");
  return url.resolve("https://www.pathofexile.com/forum", relative);
};

extractViews = (el, $) => {
  return $(".post-stat span", el)
    .text()
    .trim();
};

extractPostDate = (el, $) => {
  return $(".postBy .post_date", el)
    .text()
    .trim()
    .slice(2);
};

parser = body => {
  const $ = cheerio.load(body);

  const rows = $("#view_forum_table tbody tr")
    .map((i, el) => {
      return {
        title: extractTitle(el, $),
        author: extractAuthor(el, $),
        url: extractUrl(el, $),
        views: extractViews(el, $),
        postDate: extractPostDate(el, $)
      };
    })
    .get();

  return rows;
};

module.exports = parser;
