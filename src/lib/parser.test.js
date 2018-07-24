const {
  parser,
  GAME_CLASSES,
  extractVersion,
  extractTags
} = require("./parser");
const fs = require("fs");

const testFile = fs.readFileSync(__dirname + "/parserTestFile.html");

expect.extend({
  toBeStringInArray(received, argument) {
    const pass = argument.includes(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be in array ${argument}`,
        pass
      };
    } else {
      return {
        message: () => `expected ${received} to be in array ${argument}`,
        pass
      };
    }
  }
});

it("parser returns empty array when it doesn't find valid data", () => {
  const empty = parser("");
  expect(Array.isArray(empty)).toBe(true);
  expect(empty.length).toBe(0);
});

describe("parser returns array that contains objects with valid data", () => {
  const rows = parser(testFile);

  it("returns an array", () => {
    expect(Array.isArray(rows)).toBe(true);
  });

  it("array must not be empty", () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  it("objects in array contain all keys", () => {
    const expectedRow = {
      title: expect.stringMatching(/.+/), // Any non empty string
      author: expect.stringMatching(/.+/),
      url: expect.stringMatching(/http(s)?:\/\/.+/), // string beginning with http(s)://
      views: expect.stringMatching(/\d+/), // string containing digits
      createdOn: expect.stringMatching(/\w{3} .+/), // string beginning with 3 letter month
      latestPost: expect.stringMatching(/\w{3} .+/),
      gameClass: expect.toBeStringInArray(GAME_CLASSES),
      version: expect.anything()
    };

    rows.map(row => {
      expect(row).toMatchObject(expectedRow);
    });
  });
});

describe("testing extractVersion", () => {
  const expectedVersions = [
    [
      "[3.3] From League Starter to Shaper – Cheap, Tanky, Fast and Fun Physical ST – Very Detailed Guide",
      "3.3"
    ],
    [
      "[3.3] Ahfack's Crimson Cyclone | 3.1 Video Build Guide! UP! | 100% Pure Phys | All Content",
      "3.3"
    ],
    ["(3.3)Double strike uber elder farm pick ur budget Incursion O_O", "3.3"],
    ["Patch 3.3 4.7m Shaper dps - Max Block Blade Flurry - Gladiator", "3.3"],
    [
      "[3.3 Updated] MoM`s bloody Gladiator: when bleed actually does the job",
      "3.3"
    ],
    [
      "beyblade and fidget spinners love child slayer/champion cyclone vp bm build",
      ""
    ],
    ["3.3 morgan dual blade flurry 5.3 mill viable all", "3.3"],
    [
      "*Updated for 3.2* Volkuur's poison! millions of dps (7.5 mil shaper - 20 mil shaper GG gear)",
      "3.2"
    ]
  ];

  it.each(expectedVersions)(
    "extractVersion parses '%s' into '%s'",
    (s, expected) => {
      expect(extractVersion(s)).toBe(expected);
    }
  );

  it("Number found higher than latest patch verion should not be returned", () => {
    const s = "5.3 mill viable all blade flurry";

    expect(extractVersion(s)).toBe("");
  });
});

describe("testing extractTags", () => {
  const expectedTags = [
    [
      "Patch 3.3 4.7m Shaper dps - Max Block Blade Flurry - Gladiator",
      ["blade flurry"]
    ],
    [
      "[3.3] From League Starter to Shaper – Cheap, Tanky, Fast and Fun Physical ST – Very Detailed Guide",
      ["spectral throw"]
    ]
  ];

  it.each(expectedTags)("extractTags parses '%s' into '%s'", (s, expected) => {
    expect(extractTags(s)).toEqual(expected);
  });
});
