import React, { Component } from "react";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./filters/VersionFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";
import styled from "styled-components";
import Loader from "./common/Loader";
import FilterContainer from "./filters/FilterContainer";
import fetchWithTimeout from "../fetchWithTimeout";
import Error from "./common/Error";

class ClassBuilds extends Component {
  constructor(props) {
    super(props);

    this.abortController = new AbortController();

    this.state = {
      loading: true,
      builds: [],
      version: "", // TODO: Determine latest version within this component
      error: false
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  componentDidMount() {
    this.setTitle(this.props.match.params.gameClass);
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.gameClass !== this.props.match.params.gameClass
    ) {
      this.setTitle(this.props.match.params.gameClass);
      this.setState({ loading: true });
      this.fetchData();
    }
  }

  setTitle(title) {
    const transformedTitle = (title => {
      return title
        .split(" ")
        .map(t => {
          return t[0].toUpperCase() + t.slice(1);
        })
        .join(" ");
    })(title);

    document.title = transformedTitle + " | PoE Build List";
  }

  fetchData() {
    fetchWithTimeout(
      "/api/builds/" + this.props.match.params.gameClass,
      this.abortController,
      5000
    )
      .then(res => res.json())
      .then(builds => {
        this.setState({
          loading: false,
          error: false,
          builds
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
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
    const { loading, builds, error } = this.state;

    let buildsView;

    if (loading) {
      buildsView = (
        <LoaderContainer data-testid="loading">
          <Loader />
        </LoaderContainer>
      );
    } else if (error) {
      buildsView = <Error>Failed to load builds, refresh to try again.</Error>;
    } else {
      const filteredBuilds = this.filterBuilds(builds);

      buildsView = (
        <StyledClassBuilds>
          <FilterContainer>
            <VersionFilter
              value={this.state.version}
              builds={builds}
              onChange={this.handleVersionChange}
            />
          </FilterContainer>
          <BuildsTable builds={filteredBuilds} />
        </StyledClassBuilds>
      );
    }

    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Title>{this.props.match.params.gameClass}</Title>
          {buildsView}
        </Container>
      </React.Fragment>
    );
  }
}

const Title = styled.h1`
  text-transform: capitalize;
`;

const StyledClassBuilds = styled.div`
  .game-class {
    display: none;
  }
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

export default ClassBuilds;
