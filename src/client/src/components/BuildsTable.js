import React, { Component } from "react";
import BuildRow from "./BuildRow";

class BuildsTable extends Component {
  sortBuilds(builds) {
    const newArray = builds.slice();
    newArray.sort((a, b) => {
      return new Date(b.latestPost) - new Date(a.latestPost);
    });
    return newArray;
  }

  render() {
    const builds = this.sortBuilds(this.props.builds);

    const buildRows = builds.map(build => (
      <BuildRow key={build._id} build={build} data-testid="build-row" />
    ));

    return <div data-testid="build-table">{buildRows}</div>;
  }
}

export default BuildsTable;
