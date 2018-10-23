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
    _id: 1,
    url: "https://example1.com",
    title: "test 1",
    generatedTags: ["tag", "tag2"],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 1, 2018"),
    version: "3.4"
  },
  {
    _id: 2,
    url: "https://example2.com",
    title: "test 2",
    generatedTags: ["tag", "tag2"],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 2, 2018"),
    version: "3.4"
  },
  {
    _id: 3,
    url: "https://example2.com",
    title: "test 3",
    generatedTags: ["tag", "tag2"],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 3, 2018"),
    version: "3.3"
  },
  {
    _id: 4,
    url: "https://example2.com",
    title: "test 4",
    generatedTags: [],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 4, 2018"),
    version: "3.2"
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
