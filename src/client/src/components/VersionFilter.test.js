import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import VersionFilter from "./VersionFilter";

afterEach(() => {
  cleanup();
});

const onChange = jest.fn();

const builds = [
  {
    version: "3.4"
  },
  {
    version: "3.4"
  },
  {
    version: "3.3"
  }
];

const value = "3.4";

test("<VersionFilter />", () => {
  const { debug, getByLabelText } = render(
    <VersionFilter builds={builds} onChange={onChange} value={value} />
  );
  const versionFilter = getByLabelText("Patch");
  expect(versionFilter.childElementCount).toBe(2);
  expect(versionFilter.value).toBe(value);
  fireEvent.change(versionFilter, { target: { value: "3.3" } });
  expect(onChange).toHaveBeenCalledTimes(1);
});
