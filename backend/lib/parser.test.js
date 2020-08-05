const {
  parser,
  GAME_CLASSES,
  extractVersion,
  generateTags
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
      "replies",
      "createdOn",
      "latestPost",
      "gameClass",
      "version",
      "generatedTags"
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

      expect(row.url).toContain("www.pathofexile.com/forum/view-thread/");

      expect(row.views).toEqual(expect.any(Number));

      expect(row.replies).toEqual(expect.any(Number));

      expect(row.createdOn).toEqual(expect.any(Date));

      expect(row.latestPost).toEqual(expect.any(Date));

      expect(GAME_CLASSES).toContain(row.gameClass);

      expect(row.version).toBeDefined();

      expect(row.generatedTags).toEqual(expect.any(Array));
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

describe("testing generateTags", () => {
  const expectedTags = [
    [
      "Patch 3.3 4.7m Shaper dps - Max Block Blade Flurry - Gladiator",
      [{ tag: "blade flurry", type: "dex" }]
    ],
    [
      "[3.3] From League Starter to Shaper – Cheap, Tanky, Fast and Fun Physical ST – Very Detailed Guide",
      [{ tag: "spectral throw", type: "dex" }]
    ],
    ["[3.3] Vision of the Divine - DW Dagger Crit Gladiator", []],
    [
      "[3.3] SonicSunder, 2M+ DPS, SSF, HC, BEGINNER LEAGUE STARTER, UBER LAB/ELDER, SHAPER, FAST ]",
      [{ tag: "sunder", type: "str" }]
    ],
    ["Blade vortexhypothetical", [{ tag: "blade vortex", type: "dex" }]]
  ];

  it.each(expectedTags)("generateTags parses '%s' into '%s'", (s, expected) => {
    expect(generateTags(s)).toEqual(expected);
  });

  describe("Alternate tags should not be found if it's a part of a word", () => {
    const unexpectedTags = [
      [
        "[3.3] From League Starter to Shaper – Cheap, Tanky, Fast and Fun Physical ST – Very Detailed Guide",
        { tag: "essence drain", type: "int" }
      ],
      [
        "[3.3] SonicSunder, 2M+ DPS, SSF, HC, BEGINNER LEAGUE STARTER, UBER LAB/ELDER, SHAPER, FAST ]",
        "spectral throw"
      ],
      [
        "[3.3] Lifting's Uber Lab Warchief Totem Champion",
        { tag: "arc", type: "int" }
      ],
      [
        "[3.4] Triple Herald Blade Vortex Elementalist",
        { tag: "vortex", type: "int" }
      ]
    ];

    it.each(unexpectedTags)('"%s" shouldn\'t contain "%s"', (s, unexpected) => {
      expect(generateTags(s)).not.toContain(unexpected);
    });
  });
});
