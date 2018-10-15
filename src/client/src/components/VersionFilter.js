import React, { Component } from "react";

const MINIMUM_VERSION = "3.0";

class VersionFilter extends Component {
  constructor(props) {
    super(props);

    this.versionSet = new Set();
    this.props.builds.map(
      build =>
        build.version && build.version >= MINIMUM_VERSION
          ? this.versionSet.add(build.version)
          : null
    );
  }

  render() {
    const patches = Array.from(this.versionSet)
      .sort((a, b) => b - a)
      .map(version => (
        <option key={version} value={version}>
          {version}
        </option>
      ));

    return (
      <div className="form-inline mb-2">
        <label className="col-form-label col-form-label-sm text-muted text-uppercase mr-2">
          Patch
        </label>
        <select
          className="col-auto form-control form-control-sm custom-select border-0 bg-light"
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {patches}
        </select>
      </div>
    );
  }
}

export default VersionFilter;
