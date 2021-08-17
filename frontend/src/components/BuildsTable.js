import React from "react";
import BuildRow from "./BuildRow";

function sortBuilds(builds, sort) {
  const sortedBuilds = builds.slice();

  if (sortedBuilds.length === 0 || !sort) {
    return sortedBuilds;
  }

  if (sort === "latest") {
    const compareLatest = (a, b) => {
      return new Date(b.latestPost) - new Date(a.latestPost);
    };

    sortedBuilds.sort(compareLatest);
  } else if (sort === "views") {
    const compareViews = (a, b) => {
      return b.views - a.views;
    };

    sortedBuilds.sort(compareViews);
  }

  return sortedBuilds;
}

function BuildsTable({ sort = true, builds: data }) {
  let builds;
  if (sort) {
    builds = sortBuilds(data, sort);
  } else {
    builds = data;
  }

  return (
    <div data-testid="build-table">
      {builds.map((build) => (
        <BuildRow key={build._id} build={build} data-testid="build-row" />
      ))}
    </div>
  );
}

export default React.memo(BuildsTable);
