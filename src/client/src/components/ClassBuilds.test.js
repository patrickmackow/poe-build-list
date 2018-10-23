import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import ClassBuilds from "./ClassBuilds";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
});

const match = {
  params: {
    gameClass: "duelist"
  }
};

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
  },
  {
    generatedTags: ["righteous fire"],
    _id: "5bc0f66ba53ff0234c201329",
    title:
      "[ 3.3 ] Leech-based RF+Obliteration Slayer <ExtremelyCheap> Guardians/Uber Lab/Shaper/HC",
    author: "lucksickle",
    url: "https://www.pathofexile.com/forum/view-thread/2013175",
    views: 244662,
    replies: 461,
    createdOn: "2017-10-04T11:58:55.000Z",
    latestPost: "2018-10-11T20:53:07.000Z",
    gameClass: "duelist",
    version: "3.3",
    updatedOn: "2018-10-17T03:03:13.042Z"
  }
];

test("<ClassBuilds />", async () => {
  fetch.mockResponseOnce(JSON.stringify(builds));

  const { debug, queryByTestId, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <ClassBuilds match={match} />
    </MemoryRouter>
  );

  expect(queryByTestId("loading")).toBeTruthy();
  await waitForElement(() => getByTestId("build-table"));
  expect(queryByTestId("loading")).toBeFalsy();
  expect(getByTestId("build-table").childElementCount).toBe(2);

  fireEvent.change(getByLabelText("Patch"), { target: { value: "3.3" } });
  expect(getByLabelText("Patch").value).toBe("3.3");
  expect(getByTestId("build-table").childElementCount).toBe(1);

  //
  // expect(getByLabelText("Patch").childElementCount).toBe(2);

  // debug();
});
