const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

const { mapUrls, scrapeURL, scraper } = require("./scraper");

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

describe("testing scrapeURL", () => {
  const url = "https://www.pathofexile.com/forum/view-forum/40";

  afterEach(() => {
    mock.reset();
  });

  it("promise resolves into object", () => {
    mock.onGet(url).reply(200, { data: "" });

    expect.assertions(2);
    return scrapeURL(url).then(result => {
      expect(result).toHaveProperty("url");
      expect(result).toHaveProperty("data");
    });
  });

  it("promise rejects into object", () => {
    mock.onGet(url).networkError();

    expect.assertions(2);
    return scrapeURL(url).then(result => {
      expect(result).toHaveProperty("url");
      expect(result).toHaveProperty("error");
    });
  });
});

describe("testing scraper", () => {
  const urls = [
    "https://www.pathofexile.com/forum/view-forum/40",
    "https://www.pathofexile.com/forum/view-forum/marauder"
  ];

  afterEach(() => {
    mock.reset();
  });

  it("returns an array with an object per url", () => {
    mock.onAny().reply(200, { data: "" });

    expect.assertions(1);
    return scraper(urls).then(results => {
      expect(results).toHaveLength(2);
    });
  });

  it("scraper with defined depth returns array of objects with length of urls * depth", () => {
    mock.onAny().reply(200, { data: "" });
    const options = { depth: 2 };

    expect.assertions(1);
    return scraper(urls, options).then(results => {
      expect(results).toHaveLength(urls.length * options.depth);
    });
  });
});
