const cheerio = require("cheerio");
const url = require("url");

const GAME_CLASSES = [
  "duelist",
  "marauder",
  "ranger",
  "scion",
  "shadow",
  "templar",
  "witch"
];

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

extractCreationDate = (el, $) => {
  return $(".postBy .post_date", el)
    .text()
    .trim()
    .slice(2);
};

extractLatestPost = (el, $) => {
  return $(".last_post .post_date a", el)
    .text()
    .trim();
};

extractGameClass = $ => {
  title = $("head title")
    .text()
    .trim()
    .toLowerCase();
  return GAME_CLASSES.find(gameClass => {
    if (title.includes(gameClass)) {
      return gameClass;
    }
  });
};

const parser = body => {
  const $ = cheerio.load(body);

  const gameClass = extractGameClass($);
  const rows = $("#view_forum_table tbody tr")
    .map((i, el) => {
      return {
        title: extractTitle(el, $),
        author: extractAuthor(el, $),
        url: extractUrl(el, $),
        views: extractViews(el, $),
        createdOn: extractCreationDate(el, $),
        latestPost: extractLatestPost(el, $),
        gameClass
      };
    })
    .get();

  return rows;
};

module.exports = {
  parser,
  GAME_CLASSES
};
