import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "./SearchBar";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
});

const tags = ["caustic arrow", "cleave", "cyclone", "double strike"];

test("<SearchBar />", async () => {
  fetch.mockResponse(JSON.stringify(tags));
  const { debug, getByPlaceholderText, getAllByTestId, getByTestId } = render(
    <SearchBar />
  );

  const searchInput = getByPlaceholderText("Search by tag");

  fireEvent.change(searchInput, { target: { value: "c" } });
  await waitForElement(() => getAllByTestId("suggestion"));
  expect(getAllByTestId("suggestion").length).toBe(3);

  fireEvent.change(searchInput, { target: { value: "d" } });
  await waitForElement(() => getAllByTestId("suggestion"));
  expect(getAllByTestId("suggestion").length).toBe(1);

  fireEvent.click(getByTestId("suggestion"));
  expect(searchInput.value).toBe("Double Strike");

  // debug();
});
