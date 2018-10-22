import React from "react";
import { render, cleanup } from "react-testing-library";
import BuildsTable from "./BuildsTable";

afterEach(cleanup);

const builds = [
  {
    _id: 1,
    url: "https://example1.com",
    title: "test 1",
    generatedTags: ["tag", "tag2"],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 1, 2018")
  },
  {
    _id: 2,
    url: "https://example2.com",
    title: "test 2",
    generatedTags: ["tag", "tag2"],
    views: 1000,
    replies: 10,
    latestPost: new Date("January 2, 2018")
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
