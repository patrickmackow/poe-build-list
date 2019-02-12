import React, { Component } from "react";
import BuildRow from "./BuildRow";

class BuildsTable extends Component {
  sortBuilds(builds) {
    const sortedBuilds = builds.slice();

    if (sortedBuilds.length === 0 || !this.props.sort) {
      return sortedBuilds;
    }

    if (this.props.sort === "latest") {
      const compareLatest = (a, b) => {
        return new Date(b.latestPost) - new Date(a.latestPost);
      };

      sortedBuilds.sort(compareLatest);
    } else if (this.props.sort === "views") {
      const compareViews = (a, b) => {
        return b.views - a.views;
      };

      sortedBuilds.sort(compareViews);
    }

    return sortedBuilds;
  }

  render() {
    let builds;
    if (this.props.sort) {
      builds = this.sortBuilds(this.props.builds);
    } else {
      builds = this.props.builds;
    }

    const buildRows = builds.map(build => (
      <BuildRow key={build._id} build={build} data-testid="build-row" />
    ));

    return <div data-testid="build-table">{buildRows}</div>;
  }

  static defaultProps = {
    sort: true
  };
}

export default BuildsTable;
