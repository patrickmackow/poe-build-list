import React from "react";
import { Filter, Label, Select } from "./FilterStyles";

const ClassFilter = props => {
  const classes = [
    "All",
    "Duelist",
    "Marauder",
    "Ranger",
    "Scion",
    "Shadow",
    "Templar",
    "Witch"
  ];

  return (
    <Filter>
      <Label htmlFor="class-filter">Class</Label>
      <Select id="class-filter" value={props.value} onChange={props.onChange}>
        {classes.map(c => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </Select>
    </Filter>
  );
};

export default ClassFilter;
