import React, { Component } from "react";
import { Link } from "react-router-dom";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./VersionFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";

class TagBuilds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      builds: [],
      version: "", // TODO: Determine latest version within this component
      class: "All"
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
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
      if (
        build.gameClass === this.state.class.toLowerCase() ||
        this.state.class === "All"
      ) {
        if (build.version === this.state.version) {
          return true;
        }
      }

      return false;
    });
  }

  handleSearchSubmit(value) {
    this.props.history.push("/tag/" + value.toLowerCase());
  }

  render() {
    const { loading, builds } = this.state;
    const { tag } = this.props.match.params;

    let buildsView;
    if (loading) {
      buildsView = <p data-testid="loading">Loading...</p>;
    } else {
      const filteredBuilds = this.filterBuilds(builds);
      buildsView = (
        <React.Fragment>
          <div className="row">
            <div className="col-sm-auto">
              <VersionFilter
                value={this.state.version}
                builds={builds}
                onChange={this.handleVersionChange}
              />
            </div>
            <div className="col-sm-auto">
              <ClassFilter
                value={this.state.class}
                onChange={this.handleClassChange}
              />
            </div>
          </div>
          <BuildsTable builds={filteredBuilds} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <NavBar onSubmit={this.handleSearchSubmit} />
        <Container>
          <h1 className="text-capitalize">{tag}</h1>
          {buildsView}
        </Container>
      </React.Fragment>
    );
  }
}

const ClassFilter = props => {
  const classes = [
    "All",
    "Duelist",
    "Marauder",
    "Ranger",
    "Scion",
    "Shadow",
    "Templar",
    "Witch"
  ];

  return (
    <div className="form-inline mb-2">
      <label
        className="col-form-label col-form-label-sm text-muted text-uppercase mr-2"
        htmlFor="class-filter"
      >
        Class
      </label>
      <select
        id="class-filter"
        className="col-auto form-control form-control-sm custom-select border-0 bg-light"
        value={props.value}
        onChange={props.onChange}
      >
        {classes.map(c => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TagBuilds;
