const cheerio = require("cheerio");
const url = require("url");

const TAGS = require("./tags");

const LATEST_VERSION = "3.4";
const GAME_CLASSES = [
  "duelist",
  "marauder",
  "ranger",
  "scion",
  "shadow",
  "templar",
  "witch"
];

const extractTitle = (el, $) => {
  return $(".title a", el)
    .text()
    .trim();
};

const extractAuthor = (el, $) => {
  return $(".postBy a", el)
    .eq(0)
    .text()
    .trim();
};

const extractUrl = (el, $) => {
  const relative = $(".title a", el).attr("href");
  return url.resolve("https://www.pathofexile.com/forum", relative);
};

const extractViews = (el, $) => {
  return $(".post-stat span", el)
    .text()
    .trim();
};

const extractCreationDate = (el, $) => {
  return $(".postBy .post_date", el)
    .text()
    .trim()
    .slice(2);
};

const extractLatestPost = (el, $) => {
  return $(".last_post .post_date a", el)
    .text()
    .trim();
};

const extractGameClass = $ => {
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

const extractReplies = (el, $) => {
  return $("td.views div:not(.post-stat) span", el)
    .text()
    .trim();
};

const extractVersion = title => {
  const versionRegExp = /(\d+\.\d+)/; // Look for #.#, this will only match the first instance
  const version = versionRegExp.exec(title);

  // Return empty string if found string is greater than current patch version
  if (version && parseFloat(LATEST_VERSION) >= parseFloat(version[0])) {
    return version[0];
  } else {
    return "";
  }
};

const extractTags = title => {
  const lowerCaseTitle = title.toLowerCase();

  /*  Tags priority:
      1. Tags on their own
      2. Tag keys included within the string
  */
  const regexTags = Object.keys(TAGS).filter(key => {
    const found = TAGS[key].find(tag => {
      let tagRegex = new RegExp(`\\b${tag}\\b`);
      return tagRegex.test(lowerCaseTitle);
    });
    return found ? true : false;
  });

  if (regexTags.length) {
    return regexTags;
  }

  // No tags found, check again for tag anywhere in the string
  const includeTags = Object.keys(TAGS).filter(key => {
    return lowerCaseTitle.includes(key);
  });

  return includeTags;
};

const parser = body => {
  const $ = cheerio.load(body);

  const gameClass = extractGameClass($);
  const rows = $("#view_forum_table tbody tr")
    .map((i, el) => {
      const row = {
        title: extractTitle(el, $),
        author: extractAuthor(el, $),
        url: extractUrl(el, $),
        views: extractViews(el, $),
        replies: extractReplies(el, $),
        createdOn: extractCreationDate(el, $),
        latestPost: extractLatestPost(el, $),
        gameClass
      };
      row.version = extractVersion(row.title);
      row.tags = extractTags(row.title);
      return row;
    })
    .get();

  return rows;
};

module.exports = {
  parser,
  GAME_CLASSES,
  extractVersion,
  extractTags
};
