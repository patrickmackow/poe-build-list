import React, { Component } from "react";
import { Link } from "react-router-dom";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./VersionFilter";

class TagBuilds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      builds: [],
      version: "3.4",
      class: "all"
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
  }

  componentDidMount() {
    const { tag } = this.props.match.params;
    fetch("/api/tags/" + tag)
      .then(res => res.json())
      .then(builds =>
        this.setState({
          builds,
          loading: false
        })
      );
  }

  handleVersionChange(e) {
    this.setState({ version: e.target.value });
  }

  handleClassChange(e) {
    this.setState({ class: e.target.value });
  }

  filterBuilds(builds) {
    return builds.filter(build => {
      if (build.gameClass === this.state.class || this.state.class === "all") {
        if (build.version === this.state.version) {
          return true;
        }
      }

      return false;
    });
  }

  render() {
    const { loading, builds } = this.state;
    const { tag } = this.props.match.params;

    let buildsView;
    if (loading) {
      buildsView = <p>Loading...</p>;
    } else {
      const filteredBuilds = this.filterBuilds(builds);
      buildsView = (
        <div>
          <VersionFilter
            value={this.state.version}
            builds={builds}
            onChange={this.handleVersionChange}
          />
          <ClassFilter
            value={this.state.class}
            onChange={this.handleClassChange}
          />
          <BuildsTable builds={filteredBuilds} />
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Back to Home</Link>
        <h1>{tag}</h1>
        {buildsView}
      </div>
    );
  }
}

const ClassFilter = props => {
  const classes = [
    "all",
    "duelist",
    "marauder",
    "ranger",
    "scion",
    "shadow",
    "templar",
    "witch"
  ];

  return (
    <select value={props.value} onChange={props.onChange}>
      {classes.map(c => {
        return (
          <option key={c} value={c} children={c}>
            {c}
          </option>
        );
      })}
    </select>
  );
};

export default TagBuilds;
