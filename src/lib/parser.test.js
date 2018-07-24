const { parser, GAME_CLASSES } = require("./parser");
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

it("returns empty array when it doesn't find valid data", () => {
  const empty = parser("");
  expect(Array.isArray(empty)).toBe(true);
  expect(empty.length).toBe(0);
});

describe("returned array contains objects with valid data", () => {
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
      gameClass: expect.toBeStringInArray(GAME_CLASSES)
    };

    console.log(rows[0]);
    rows.map(row => {
      expect(row).toMatchObject(expectedRow);
    });
  });
});
