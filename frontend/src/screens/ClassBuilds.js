import React, { Component } from "react";
import BuildsTable from "components/BuildsTable";
import VersionFilter from "components/filters/VersionFilter";
import NavBar from "components/NavBar";
import styled from "styled-components";
import FilterContainer from "components/filters/FilterContainer";
import fetchWithTimeout from "fetchWithTimeout";
import SortSelect from "components/SortSelect";
import { Container, Error, Loader } from "components/lib";

class ClassBuilds extends Component {
  constructor(props) {
    super(props);

    this.abortController = new AbortController();

    this.state = {
      loading: true,
      builds: [],
      version: "",
      latestVersion: "",
      error: false,
      sort: "latest",
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
      this.setState({
        loading: true,
        version: "",
        builds: [],
        sort: "latest",
      });
      this.fetchData();
    }
  }

  setTitle(title) {
    const transformedTitle = ((title) => {
      return title
        .split(" ")
        .map((t) => {
          return t[0].toUpperCase() + t.slice(1);
        })
        .join(" ");
    })(title);

    document.title = transformedTitle + " | PoE Build List";
  }

  fetchData() {
    fetchWithTimeout("/api/version", this.abortController, 5000)
      .then((res) => res.json())
      .then(({ version }) => {
        this.setState({ latestVersion: version, version });
      });

    fetchWithTimeout(
      "/api/builds/" + this.props.match.params.gameClass,
      this.abortController,
      5000
    )
      .then((res) => res.json())
      .then((builds) => {
        this.setState({
          loading: false,
          error: false,
          builds,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
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
    return builds.filter((build) => {
      if (build.version === this.state.version && build.generatedTags.length) {
        return true;
      }
      return false;
    });
  }

  handleSortChange(e) {
    this.setState({ sort: e.target.value });
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

      let table;
      if (filteredBuilds.length) {
        table = <BuildsTable builds={filteredBuilds} sort={this.state.sort} />;
      } else {
        table = <Error>No builds found</Error>;
      }

      buildsView = (
        <StyledClassBuilds>
          <FlexboxRow>
            <FilterContainer>
              <VersionFilter
                value={this.state.version}
                builds={builds}
                onChange={this.handleVersionChange}
                latestVersion={this.state.latestVersion}
              />
            </FilterContainer>
            <SortSelect
              value={this.state.sort}
              onChange={this.handleSortChange}
            />
          </FlexboxRow>
          {table}
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

const FlexboxRow = styled.div`
  position: relative;

  @media (min-width: 40em) {
    display: flex;
    justify-content: space-between;
  }
`;

export default ClassBuilds;
