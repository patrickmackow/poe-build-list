import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import AutoSuggest from "./AutoSuggest";

afterEach(() => {
  cleanup();
  onChange.mockClear();
});

const onChange = jest.fn();

const tags = ["Caustic Arrow", "Cleave", "Cyclone", "Double Strike"];

test("<AutoSuggest />", () => {
  const {
    container,
    debug,
    queryByTestId,
    queryAllByTestId,
    getAllByTestId
  } = render(<AutoSuggest dataSrc={tags} onChange={onChange} />);
  expect(getAllByTestId("suggestion").length).toBe(tags.length);
  expect(queryByTestId("suggestion-active")).toBeFalsy();

  // Navigate down one item
  fireEvent.keyDown(container, { keyCode: 40 });
  expect(queryAllByTestId("suggestion-active").length).toBe(1);
  expect(queryByTestId("suggestion-active").value).toBe(tags[0]);

  // Navigate down one item
  fireEvent.keyDown(container, { keyCode: 40 });
  expect(queryAllByTestId("suggestion-active").length).toBe(1);
  expect(queryByTestId("suggestion-active").value).toBe(tags[1]);

  // Navigate down until it rolls over to the first item
  fireEvent.keyDown(container, { keyCode: 40 });
  fireEvent.keyDown(container, { keyCode: 40 });
  fireEvent.keyDown(container, { keyCode: 40 });
  expect(queryAllByTestId("suggestion-active").length).toBe(1);
  expect(queryByTestId("suggestion-active").value).toBe(tags[0]);

  // Navigate up one item, should roll back to the last item
  fireEvent.keyDown(container, { keyCode: 38 });
  expect(queryAllByTestId("suggestion-active").length).toBe(1);
  expect(queryByTestId("suggestion-active").value).toBe(tags[3]);

  // Submit with enter key
  fireEvent.keyDown(container, { keyCode: 13 });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith("button", tags[3]);
});
