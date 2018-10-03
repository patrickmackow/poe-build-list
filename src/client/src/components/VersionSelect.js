import React, { Component } from "react";

class VersionSelect extends Component {
  render() {
    const versionSet = new Set();
    this.props.builds.map(
      build => (build.version ? versionSet.add(build.version) : null)
    );
    return (
      <select value={this.props.value} onChange={this.props.onChange}>
        {Array.from(versionSet)
          .sort((a, b) => b - a)
          .map(version => <option value={version}>{version}</option>)}
      </select>
    );
  }
}

export default VersionSelect;
