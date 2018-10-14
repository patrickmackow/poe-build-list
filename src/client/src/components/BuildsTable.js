import React, { Component } from "react";
import BuildRow from "./BuildRow";

class BuildsTable extends Component {
  render() {
    const { builds } = this.props;

    const buildRows = builds.map(build => (
      <BuildRow key={build._id} build={build} />
    ));

    return <div>{buildRows}</div>;
  }
}

export default BuildsTable;
