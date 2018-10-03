import React, { Component } from "react";

class VersionFilter extends Component {
  constructor(props) {
    super(props);

    this.versionSet = new Set();
    this.props.builds.map(
      build => (build.version ? this.versionSet.add(build.version) : null)
    );
  }

  render() {
    return (
      <select value={this.props.value} onChange={this.props.onChange}>
        {Array.from(this.versionSet)
          .sort((a, b) => b - a)
          .map(version => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
      </select>
    );
  }
}

export default VersionFilter;
