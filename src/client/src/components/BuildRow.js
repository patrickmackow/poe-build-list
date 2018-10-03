import React, { Component } from "react";

class BuildRow extends Component {
  render() {
    const { build } = this.props;

    return (
      <tr>
        <td>
          <a href={build.url}>{build.title}</a>
        </td>
        <td>{build.views}</td>
        <td>{build.replies}</td>
        <td>{build.latestPost}</td>
      </tr>
    );
  }
}

export default BuildRow;
