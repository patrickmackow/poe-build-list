const {
  parser,
  GAME_CLASSES,
  extractVersion,
  extractTags
} = require("./parser");
const fs = require("fs");

const testFile = fs.readFileSync(__dirname + "/parserTestFile.html", "utf-8");

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

  it("rows in array contain all keys", () => {
    const fields = [
      "title",
      "author",
      "url",
      "views",
      "createdOn",
      "latestPost",
      "gameClass",
      "version",
      "tags"
    ];

    rows.map(row => {
      expect(Object.keys(row)).toEqual(expect.arrayContaining(fields));
    });
  });

  it("row fields contain valid data", () => {
    rows.map(row => {
      expect(row.title).toEqual(expect.any(String));
      expect(row.title.length).toBeGreaterThan(0);

      expect(row.author).toEqual(expect.any(String));
      expect(row.author.length).toBeGreaterThan(0);

      expect(row.url).toContain("www.pathofexile.com/forum");

      expect(row.views).toMatch(/\d+/);

      expect(row.createdOn).toMatch(/\w{3} .+/);

      expect(row.latestPost).toMatch(/\w{3} .+/);

      expect(GAME_CLASSES).toContain(row.gameClass);

      expect(row.version).toBeDefined();

      expect(row.tags).toEqual(expect.any(Array));
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
    ],
    ["[3.3] Vision of the Divine - DW Dagger Crit Gladiator", []]
  ];

  it.each(expectedTags)("extractTags parses '%s' into '%s'", (s, expected) => {
    expect(extractTags(s)).toEqual(expected);
  });
});
