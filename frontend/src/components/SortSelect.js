import React from "react";
import { Filter, Label, Select } from "./filters/FilterStyles";
import styled from "styled-components";

function SortSelect({ value, onChange }) {
  const sortOptions = { latest: "Latest Updated", views: "Most Views" };

  const options = Object.keys(sortOptions).map((option) => {
    return (
      <option key={option} value={option}>
        {sortOptions[option]}
      </option>
    );
  });

  return (
    <StyledFilter>
      <Label htmlFor="sort-select">Sort by:</Label>
      <Select id="sort-select" value={value} onChange={onChange}>
        {options}
      </Select>
    </StyledFilter>
  );
}

const StyledFilter = styled(Filter)`
  margin-bottom: 0.5em;

  @media (min-width: 20em) and (max-width: 40em) {
    position: absolute;
    top: 0.1em;
    right: 0;
  }
`;

export default React.memo(SortSelect);
