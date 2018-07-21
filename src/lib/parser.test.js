const parser = require("./parser");
const fs = require("fs");

let testFile, rows;

beforeAll(() => {
  testFile = fs.readFileSync(__dirname + "/parserTestFile.html");
});

beforeEach(() => {
  rows = parser(testFile);
});

it("returns empty array when it doesn't find valid data", () => {
  const empty = parser("");
  expect(Array.isArray(empty)).toBe(true);
  expect(empty.length).toBe(0);
});

describe("returned array contains objects with valid data", () => {
  it("returns an array", () => {
    expect(Array.isArray(rows)).toBe(true);
  });

  it("array must not be empty", () => {
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it("object in array contains all data", () => {
    const expectedRow = {
      title: "",
      author: "",
      url: "",
      views: "",
      postDate: ""
    };
    const row = rows[0];

    Object.keys(expectedRow).map(key => {
      expect(row).toHaveProperty(key);
    });
  });
});
