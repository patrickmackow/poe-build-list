const cheerio = require("cheerio");
const url = require("url");

const TAGS = require("./tags");

const GAME_CLASSES = [
  "duelist",
  "marauder",
  "ranger",
  "scion",
  "shadow",
  "templar",
  "witch",
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

const extractGameClass = ($) => {
  title = $("head title")
    .text()
    .trim()
    .toLowerCase();
  return GAME_CLASSES.find((gameClass) => {
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

// Extract the game version the build is meant for
const extractVersion = (title) => {
  const versionRegExp = /(\d+\.\d+)/; // Look for #.#, this will only match the first instance
  const version = versionRegExp.exec(title);

  // Return empty string if found string is greater than current patch version
  if (version && parseFloat(version[0])) {
    return version[0];
  } else {
    return "";
  }
};

// Automatically generate tags from title
const generateTags = (title) => {
  const format = function(t) {
    if (t.length === 0) {
      return [];
    }

    return t.map((tag) => {
      return { tag, type: TAGS[tag].type ? TAGS[tag].type : "" };
    });
  };

  const lowerCaseTitle = title.toLowerCase();

  /*  Tags priority:
      1. Tags on their own
      2. Tag keys included within the string 
      
      Tags that are part of another tag, e.g. vortex and blade vortex,
      should not be included as a tag. 

      Simplest fix is to add an object to exclude tags that match
  */
  const exclude = { vortex: ["blade vortex"], berserk: ["berserker"] };

  const regexTags = Object.keys(TAGS).filter((key) => {
    const foundTag = TAGS[key].tags.find((tag) => {
      const tagRegex = new RegExp(`\\b${tag}\\b`);

      const result = tagRegex.test(lowerCaseTitle);
      if (!result) {
        // Tag not found with regex
        return false;
      }

      // Tag found with regex, but not in excluded object
      if (!exclude.hasOwnProperty(tag)) {
        return true;
      }

      const excludeRegexes = exclude[tag].map((e) => new RegExp(`\\b${e}\\b`));
      // Tag has a match inside the exclude object
      // Each excluded regex must not match in order for the tag to be valid
      return excludeRegexes.every(
        (exclude) => exclude.test(lowerCaseTitle) === false
      );
    });

    return foundTag ? true : false;
  });

  if (regexTags.length) {
    return format(regexTags);
  }

  // No tags found, check again for tag key anywhere in the string,
  // also checking for exclusions
  const includeTags = Object.keys(TAGS).filter((key) => {
    if (!lowerCaseTitle.includes(key)) {
      // Tag key not found in string
      return false;
    } else if (
      exclude.hasOwnProperty(key) &&
      exclude[key].some((e) => lowerCaseTitle.includes(e))
    ) {
      // Tag key found, but is excluded
      return false;
    }

    return true;
  });

  return format(includeTags);
};

// Parse HTTP request body and extract data
const parser = (body) => {
  const $ = cheerio.load(body);

  const gameClass = extractGameClass($);
  const rows = $("#view_forum_table tbody tr")
    .map((i, el) => {
      const row = {
        title: extractTitle(el, $),
        author: extractAuthor(el, $),
        url: extractUrl(el, $),
        views: parseInt(extractViews(el, $)),
        replies: parseInt(extractReplies(el, $)),
        createdOn: new Date(extractCreationDate(el, $)),
        latestPost: new Date(extractLatestPost(el, $)),
        gameClass,
      };
      row.version = extractVersion(row.title);
      row.generatedTags = generateTags(row.title);
      return row;
    })
    .get();

  return rows;
};

module.exports = {
  parser,
  GAME_CLASSES,
  extractVersion,
  generateTags,
};
