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
        <table>
          {/* TODO: Generate these from props */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Views</th>
              <th>Replies</th>
              <th>Latest Post</th>
            </tr>
          </thead>
          <tbody>{buildRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BuildsTable;
