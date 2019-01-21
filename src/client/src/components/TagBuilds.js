import React, { Component } from "react";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./filters/VersionFilter";
import ClassFilter from "./filters/ClassFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";
import styled from "styled-components";
import Loader from "./common/Loader";
import FilterContainer from "./filters/FilterContainer";

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
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tag !== this.props.match.params.tag) {
      this.setState({ loading: true });
      this.fetchData();
    }
  }

  fetchData() {
    fetch("/api/tags/" + this.props.match.params.tag)
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
      buildsView = (
        <LoaderContainer data-testid="loading">
          <Loader />;
        </LoaderContainer>
      );
    } else {
      const filteredBuilds = this.filterBuilds(builds);
      buildsView = (
        <React.Fragment>
          <FilterContainer>
            <VersionFilter
              value={this.state.version}
              builds={builds}
              onChange={this.handleVersionChange}
            />
            <ClassFilter
              value={this.state.class}
              onChange={this.handleClassChange}
            />
          </FilterContainer>
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

const Title = styled.h1`
  text-transform: capitalize;
`;

const LoaderContainer = styled.div`
  margin-top: 7em;

  @media (min-width: 40em) {
    margin-top: 10em;
  }

  div {
    margin: 0 auto;
  }
`;

export default TagBuilds;
