import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook } from "@testing-library/react-hooks";
import { useFetchWithTimeout } from "utils/fetch";

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterEach(() => {
  jest.useRealTimers();
});

afterAll(() => server.close());

const builds = [
  {
    _id: "611564f96bf23d93f4f0c9dd",
    url: "https://www.pathofexile.com/forum/view-thread/2181275",
    author: "kayella",
    createdOn: "2018-07-06T15:20:49.000Z",
    gameClass: "witch",
    generatedTags: [
      { tag: "herald of purity", type: "str" },
      { tag: "skeletons", type: "int" },
    ],
    latestPost: "2021-08-13T11:14:02.000Z",
    replies: 20411,
    title:
      "👻3.15👻 Kay's Summoner // Spectres👻Spiders🕷️SRS💥Skeletons💀Herald of Purity✝️",
    updatedOn: "2021-08-13T13:38:09.644Z",
    version: "3.15",
    views: 9283340,
  },
  {
    _id: "611564f96bf23d93f4f0c6ef",
    url: "https://www.pathofexile.com/forum/view-thread/1694250",
    author: "guggelhupf",
    createdOn: "2016-06-30T00:32:03.000Z",
    gameClass: "marauder",
    generatedTags: [{ tag: "ancestral warchief", type: "str" }],
    latestPost: "2021-08-12T22:31:47.000Z",
    replies: 4645,
    title:
      "[3.15 WIP] The Warchief | [Facebreaker] Ancestral Warchief | Uber Boss Farmer | Beginner -> Expert",
    updatedOn: "2021-08-13T13:38:09.632Z",
    version: "3.15",
    views: 5003914,
  },
  {
    _id: "611564f96bf23d93f4f0c670",
    url: "https://www.pathofexile.com/forum/view-thread/1819239",
    author: "kira1414",
    createdOn: "2017-01-15T08:00:30.000Z",
    gameClass: "duelist",
    generatedTags: [
      { tag: "consecrated path", type: "str" },
      { tag: "cyclone", type: "dex" },
      { tag: "tectonic slam", type: "str" },
    ],
    latestPost: "2021-08-06T05:50:18.000Z",
    replies: 5358,
    title:
      "[3.15] For Slayer / Champion - Ngamahu Cyclone / Consecrated Path / Tectonic Slam",
    updatedOn: "2021-08-13T13:38:09.630Z",
    version: "3.15",
    views: 4858874,
  },
];

test("fetchWithTimeout should return data", async () => {
  server.use(
    rest.get("/api/builds", (req, res, ctx) => {
      return res(ctx.json(builds));
    })
  );

  const { result } = renderHook(() => useFetchWithTimeout(5000));
  const fetchWithTimeout = result.current;
  const data = await fetchWithTimeout("builds");
  expect(data).toStrictEqual(builds);
});

test("fetchWithTimeout should reject after time has elapsed", async () => {
  jest.useFakeTimers();

  server.use(
    rest.get("/api/builds", async (req, res, ctx) => {
      await Promise((resolve) => setTimeout(resolve, 10000));
      return res(ctx.json(builds));
    })
  );

  const { result } = renderHook(() => useFetchWithTimeout(5000));
  const fetchWithTimeout = result.current;
  const promise = fetchWithTimeout("builds");

  jest.runAllTimers();

  expect(promise).rejects.toMatch("Timeout");
});
