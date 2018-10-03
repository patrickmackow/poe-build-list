import React, { Component } from "react";
import BuildRow from "./BuildRow";
import VersionSelect from "./VersionSelect";

class BuildsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { version: "3.4" };

    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  handleVersionChange(e) {
    this.setState({ version: e.target.value });
  }

  render() {
    const { builds } = this.props;

    const buildRows = builds
      .filter(build => build.version === this.state.version)
      .map(build => <BuildRow key={build._id} build={build} />);

    return (
      <div>
        <p>{builds ? builds.length : 0} builds loaded</p>
        <p>{buildRows.length} builds displayed</p>
        <VersionSelect
          value={this.state.version}
          builds={builds}
          onChange={this.handleVersionChange}
        />
        <table>
          <thead>
            <th>Title</th>
            <th>Views</th>
            <th>Replies</th>
            <th>Latest Post</th>
          </thead>
          <tbody>{buildRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BuildsTable;
