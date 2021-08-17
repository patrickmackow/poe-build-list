import React from "react";
import { Filter, Label, Select } from "./FilterStyles";

function ClassFilter({ builds, value, onChange }) {
  const classSet = new Set();
  builds.map((b) =>
    classSet.add(b.gameClass[0].toUpperCase() + b.gameClass.slice(1))
  );

  const classes = ["All"].concat(Array.from(classSet).sort());

  return (
    <Filter>
      <Label htmlFor="class-filter">Class</Label>
      <Select id="class-filter" value={value} onChange={onChange}>
        {classes.map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </Select>
    </Filter>
  );
}

export default React.memo(ClassFilter);
