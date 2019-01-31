import React, { Component } from "react";
import { Filter, Label, Select } from "./FilterStyles";

const MINIMUM_VERSION = "3.0";

class VersionFilter extends Component {
  constructor(props) {
    super(props);

    const versionSet = new Set();
    this.props.builds.map(
      build =>
        build.version && build.version >= MINIMUM_VERSION
          ? versionSet.add(build.version)
          : null
    );

    this.patches = Array.from(versionSet).sort((a, b) => b - a);
  }

  componentDidMount() {
    if (this.props.value !== this.patches[0]) {
      this.props.onChange({ target: { value: this.patches[0] } });
    }
  }

  render() {
    const patches = this.patches.map(version => (
      <option key={version} value={version}>
        {version}
      </option>
    ));

    if (patches.length) {
      return (
        <Filter>
          <Label htmlFor="version-filter">Patch</Label>
          <Select
            id="version-filter"
            value={this.props.value}
            onChange={this.props.onChange}
          >
            {patches}
          </Select>
        </Filter>
      );
    } else {
      return null;
    }
  }
}

export default VersionFilter;
