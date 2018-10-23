import React, { Component } from "react";

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

    return (
      <div className="form-inline mb-2">
        <label
          className="col-form-label col-form-label-sm text-muted text-uppercase mr-2"
          htmlFor="version-filter"
        >
          Patch
        </label>
        <select
          id="version-filter"
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
