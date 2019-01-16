import React, { Component } from "react";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./VersionFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";
import styled from "styled-components";

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
          <Filters>
            <VersionFilter
              value={this.state.version}
              builds={builds}
              onChange={this.handleVersionChange}
            />
            <ClassFilter
              value={this.state.class}
              onChange={this.handleClassChange}
            />
          </Filters>
          <BuildsTable builds={filteredBuilds} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Title>{tag}</Title>
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
    <StyledClassFilter>
      <Label htmlFor="class-filter">Class</Label>
      <Select id="class-filter" value={props.value} onChange={props.onChange}>
        {classes.map(c => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </Select>
    </StyledClassFilter>
  );
};

const Title = styled.h1`
  text-transform: capitalize;
`;

const Filters = styled.div`
  margin-bottom: 0.5em;

  > * + * {
    margin-left: 0.5em;
  }
`;

const StyledClassFilter = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 0.9rem;
  color: #666;
  margin-right: 0.5em;
`;

const Select = styled.select``;

export default TagBuilds;
