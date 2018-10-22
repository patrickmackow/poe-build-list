import React from "react";
import { render, cleanup } from "react-testing-library";
import BuildRow from "./BuildRow";

afterEach(cleanup);

const build = {
  url: "https://example.com",
  title: "test",
  generatedTags: ["tag", "tag2"],
  views: 1000,
  replies: 10
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
