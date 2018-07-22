const parser = require("./parser");
const fs = require("fs");

const testFile = fs.readFileSync(__dirname + "/parserTestFile.html");

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

  it("object in array contains all keys", () => {
    const expectedRow = {
      title: expect.stringMatching(/.+/), // Any non empty string
      author: expect.stringMatching(/.+/),
      url: expect.stringMatching(/http(s)?:\/\/.+/), // string beginning with http(s)://
      views: expect.stringMatching(/.+/),
      postDate: expect.stringMatching(/.+/)
    };

    expect(rows[0]).toMatchObject(expectedRow);
  });
});
