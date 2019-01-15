import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import SearchForm from "../SearchForm";

const fetchMock = require("fetch-mock");

afterEach(() => {
  cleanup();
  fetchMock.restore();
});

const tags = ["Caustic Arrow", "Cleave", "Cyclone", "Double Strike"];

test("<SearchForm />", async () => {
  fetchMock.get("/api/tags", JSON.stringify(tags));

  const {
    container,
    debug,
    getByPlaceholderText,
    getAllByTestId,
    getByTestId,
    queryByTestId
  } = render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchInput = getByPlaceholderText("Search by tag");

  fireEvent.change(searchInput, { target: { value: "c" } });

  await waitForElement(() => getByTestId(/^suggestion/));

  fireEvent.keyDown(container, { keyCode: 40 });
  expect(getAllByTestId(/^suggestion/).length).toBe(3);
  expect(queryByTestId("suggestion-active")).toBeTruthy();

  fireEvent.change(searchInput, { target: { value: "d" } });
  expect(getAllByTestId(/^suggestion/).length).toBe(1);
  expect(queryByTestId("suggestion-active")).toBeFalsy();

  fireEvent.click(getByTestId("suggestion"));
  expect(searchInput.value).toBe("Double Strike");
  expect(queryByTestId(/^suggestion/)).toBeFalsy();

  fireEvent.submit(searchInput);
});

/*test("<SearchForm /> with empty dataSrc", async () => {
  fetchMock.get("/api/tags", JSON.stringify([]));

  const { debug, getByPlaceholderText, queryByTestId, getByText } = render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchTerm = "Cyclone";

  const searchInput = getByPlaceholderText("Search by tag");

  fireEvent.change(searchInput, { target: { value: searchTerm.charAt(0) } });
  await waitForElement(() => getByText(/^suggestion/));

  expect(queryByTestId("suggestion")).toBeFalsy();

  fireEvent.change(searchInput, { target: { value: searchTerm } });
  fireEvent.submit(searchInput);
});*/
