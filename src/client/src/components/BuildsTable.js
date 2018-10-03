import React, { Component } from "react";
import BuildRow from "./BuildRow";

class BuildsTable extends Component {
  render() {
    const { builds } = this.props;

    const buildRows = builds.map(build => (
      <BuildRow key={build._id} build={build} />
    ));

    return (
      <div>
        <p>{builds ? builds.length : 0} builds loaded</p>
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
