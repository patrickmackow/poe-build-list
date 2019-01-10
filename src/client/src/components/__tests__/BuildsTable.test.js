import React from "react";
import { render, cleanup } from "react-testing-library";
import BuildsTable from "../BuildsTable";

afterEach(cleanup);

const builds = [
  {
    generatedTags: ["double strike"],
    _id: "5bc0f66ba53ff0234c201320",
    title:
      "[3.4] FACETANK THE WORLD | Instant Leech! 9k life, 2m+ Shaper DPS Double Strike",
    author: "PsychicMuffin",
    url: "https://www.pathofexile.com/forum/view-thread/2186326",
    views: 188772,
    replies: 420,
    createdOn: "2018-07-17T02:54:00.000Z",
    latestPost: "2018-10-16T11:27:08.000Z",
    gameClass: "duelist",
    version: "3.4",
    updatedOn: "2018-10-17T03:03:13.041Z"
  },
  {
    generatedTags: ["reave"],
    _id: "5bc0f66ba53ff0234c201322",
    title:
      "[3.4] KissMeQuick's Gladiator Reave || Beginner Friendly || 101% IIQ 347% IIR MF || HC & Uber Elder",
    author: "Kiss_Me_Quick",
    url: "https://www.pathofexile.com/forum/view-thread/2064695",
    views: 1222845,
    replies: 2330,
    createdOn: "2018-01-02T20:32:13.000Z",
    latestPost: "2018-10-16T21:50:58.000Z",
    gameClass: "duelist",
    version: "3.4",
    updatedOn: "2018-10-17T03:03:13.041Z"
  }
];

test("<BuildsTable />", () => {
  const { debug, getAllByTestId, getByTestId } = render(
    <BuildsTable builds={builds} />
  );

  expect(getAllByTestId("build-row").length).toBe(builds.length);

  // Build table is sorted by descending latestPost
  expect(getByTestId("build-link").textContent).toContain(builds[1].title);
  //   debug();
});