import React from "react";
import { render, cleanup } from "react-testing-library";
import BuildRow from "../BuildRow";

afterEach(cleanup);

const build = {
  generatedTags: ["consecrated path", "cyclone"],
  _id: "5bc0f66ba53ff0234c20132c",
  title:
    "[3.4] For Slayer / Champion - Ngamahu Cyclone / Consecrated Path Build (Uber Lab Runner + End Game)",
  author: "kira1414",
  url: "https://www.pathofexile.com/forum/view-thread/1819239",
  views: 3155260,
  replies: 4444,
  createdOn: "2017-01-15T08:00:30.000Z",
  latestPost: "2018-10-11T15:29:12.000Z",
  gameClass: "duelist",
  version: "3.4",
  updatedOn: "2018-10-17T03:03:13.043Z"
};

test("<BuildRow />", () => {
  const { getByTestId, queryAllByTestId } = render(<BuildRow build={build} />);

  const buildLink = getByTestId("build-link");

  expect(buildLink.getAttribute("href")).toBe(build.url);
  expect(buildLink.textContent).toBe(build.title);
  expect(queryAllByTestId("build-tag").length).toBe(build.generatedTags.length);
  expect(getByTestId("build-views").textContent).toContain(build.views);
  expect(getByTestId("build-replies").textContent).toContain(build.replies);
});
