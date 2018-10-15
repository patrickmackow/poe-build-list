import React, { Component } from "react";
import BuildRow from "./BuildRow";

class BuildsTable extends Component {
  sortBuilds(builds) {
    builds.sort((a, b) => {
      return new Date(b.latestPost) - new Date(a.latestPost);
    });
  }

  render() {
    const { builds } = this.props;
    this.sortBuilds(builds);

    const buildRows = builds.map(build => (
      <BuildRow key={build._id} build={build} />
    ));

    return <div>{buildRows}</div>;
  }
}

export default BuildsTable;
