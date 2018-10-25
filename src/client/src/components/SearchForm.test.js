import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import SearchForm from "./SearchForm";

afterEach(() => {
  cleanup();
  onSubmit.mockClear();
});

const onSubmit = jest.fn();

const tags = ["Caustic Arrow", "Cleave", "Cyclone", "Double Strike"];

test("<SearchForm />", () => {
  const {
    container,
    debug,
    getByPlaceholderText,
    getAllByTestId,
    getByTestId,
    queryByTestId
  } = render(<SearchForm dataSrc={tags} onSubmit={onSubmit} />);

  const searchInput = getByPlaceholderText("Search by tag");

  fireEvent.change(searchInput, { target: { value: "c" } });
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
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith("Double Strike");
  // debug();
});

test("<SearchForm /> with empty dataSrc", () => {
  const { debug, getByPlaceholderText, queryByTestId } = render(
    <SearchForm onSubmit={onSubmit} />
  );

  const searchTerm = "Cyclone";

  const searchInput = getByPlaceholderText("Search by tag");

  fireEvent.change(searchInput, { target: { value: searchTerm.charAt(0) } });
  expect(queryByTestId("suggestion")).toBeFalsy();

  fireEvent.change(searchInput, { target: { value: searchTerm } });
  fireEvent.submit(searchInput);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith(searchTerm);
});
