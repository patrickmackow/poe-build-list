import React, { Component } from "react";
import { Filter, Label, Select } from "./FilterStyles";

class ClassFilter extends Component {
  render() {
    const classSet = new Set();
    this.props.builds.map(b =>
      classSet.add(b.gameClass[0].toUpperCase() + b.gameClass.slice(1))
    );

    const classes = ["All"].concat(Array.from(classSet).sort());

    return (
      <Filter>
        <Label htmlFor="class-filter">Class</Label>
        <Select
          id="class-filter"
          value={this.props.value}
          onChange={this.props.onChange}
        >
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
  }
}

export default ClassFilter;
