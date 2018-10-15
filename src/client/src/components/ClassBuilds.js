import React, { Component } from "react";
import { Link } from "react-router-dom";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./VersionFilter";

class ClassBuilds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      builds: [],
      version: "3.4"
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  componentDidMount() {
    fetch("/api/builds/" + this.props.match.params.gameClass)
      .then(res => res.json())
      .then(builds => {
        this.setState({
          loading: false,
          builds
        });
      });
  }

  handleVersionChange(e) {
    this.setState({ version: e.target.value });
  }

  filterBuilds(builds) {
    // Default filter is latest patch and has at least 1 tag
    return builds.filter(build => {
      if (build.version === this.state.version && build.generatedTags.length) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { loading, builds } = this.state;

    let buildsView;

    if (loading) {
      buildsView = (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      const filteredBuilds = this.filterBuilds(builds);

      buildsView = (
        <div>
          <VersionFilter
            value={this.state.version}
            builds={builds}
            onChange={this.handleVersionChange}
          />
          <p>{this.state.builds.length} builds loaded</p>
          <p>{filteredBuilds.length} builds displayed</p>
          <BuildsTable builds={filteredBuilds} />
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Back to Home</Link>
        <h1>{this.props.match.params.gameClass}</h1>
        {buildsView}
      </div>
    );
  }
}

export default ClassBuilds;
