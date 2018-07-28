const { mapUrls } = require("./scraper");

describe("testing mapUrls", () => {
  const urls = [
    "https://www.pathofexile.com/forum/view-forum/40",
    "https://www.pathofexile.com/forum/view-forum/40/"
  ];

  it("returns an array", () => {
    expect(mapUrls(urls)).toEqual(expect.any(Array));
  });

  it("if depth is 0 return empty array", () => {
    expect(mapUrls(urls, 0)).toHaveLength(0);
  });

  it("if depth is 3 return array with length of urls * 3", () => {
    expect(mapUrls(urls, 3)).toHaveLength(urls.length * 3);
  });

  it.each(urls)(
    "returned urls in depth range should contain original url",
    () => {
      expect(mapUrls(urls, 3)[0]).toContain(urls[0]);
    }
  );
});
