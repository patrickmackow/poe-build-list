const parser = require("./parser");
const fs = require("fs");

let testFile;

beforeAll(() => {
  testFile = fs.readFileSync(__dirname + "/parserTestFile.html");
});

it("returns empty array when it doesn't find valid data", () => {
  const empty = parser("");
  expect(Array.isArray(empty)).toBe(true);
  expect(empty.length).toBe(0);
});

it("returns an array", () => {
  expect(Array.isArray(parser(testFile))).toBe(true);
});

it("returned array contains objects with valid data", () => {
  const value = parser(testFile);
  expect(value.length).toBeGreaterThanOrEqual(1);
});
