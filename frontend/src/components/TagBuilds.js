import React, { Component } from "react";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./filters/VersionFilter";
import ClassFilter from "./filters/ClassFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";
import styled from "styled-components";
import Loader from "./common/Loader";
import FilterContainer from "./filters/FilterContainer";
import fetchWithTimeout from "../fetchWithTimeout";
import Error from "./common/Error";
import SortSelect from "./SortSelect";

class TagBuilds extends Component {
  constructor(props) {
    super(props);

    this.abortController = new AbortController();

    this.state = {
      loading: true,
      builds: [],
      version: "",
      latestVersion: "",
      class: "All",
      error: false,
      sort: "latest",
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.setTitle(this.props.match.params.tag);
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tag !== this.props.match.params.tag) {
      this.setTitle(this.props.match.params.tag);
      this.setState({
        loading: true,
        class: "All",
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
      "/api/tags/" + this.props.match.params.tag,
      this.abortController,
      5000
    )
      .then((res) => res.json())
      .then((builds) =>
        this.setState({
          builds,
          loading: false,
          error: false,
        })
      )
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
    this.setState({
      version: e.target.value,
      class: "All",
    });
  }

  handleClassChange(e) {
    this.setState({ class: e.target.value });
  }

  handleSortChange(e) {
    this.setState({ sort: e.target.value });
  }

  filterBuilds(builds) {
    const filter = (builds, ignoreVersion = false) => {
      if (ignoreVersion) {
        return this.filterBuildsByClass(builds);
      } else {
        const filtered = this.filterBuildsByVersion(builds);
        return this.filterBuildsByClass(filtered);
      }
    };

    let filteredBuilds = filter(builds);

    if (filteredBuilds.length) {
      return filteredBuilds;
    } else {
      return filter(builds, true);
    }
  }

  filterBuildsByClass(builds) {
    const filtered = builds.filter((build) => {
      if (
        build.gameClass === this.state.class.toLowerCase() ||
        this.state.class === "All"
      ) {
        return true;
      }

      return false;
    });

    return filtered;
  }

  filterBuildsByVersion(builds) {
    const filtered = builds.filter((build) => {
      if (build.version === this.state.version) {
        return true;
      }

      return false;
    });

    return filtered;
  }

  render() {
    const { loading, builds, error } = this.state;
    const { tag } = this.props.match.params;

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
        <React.Fragment>
          <FlexboxRow>
            <FilterContainer>
              <VersionFilter
                value={this.state.version}
                builds={builds}
                onChange={this.handleVersionChange}
                latestVersion={this.state.latestVersion}
              />
              <ClassFilter
                value={this.state.class}
                builds={this.filterBuildsByVersion(builds)}
                onChange={this.handleClassChange}
              />
            </FilterContainer>
            <SortSelect
              value={this.state.sort}
              onChange={this.handleSortChange}
            />
          </FlexboxRow>
          {table}
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

const FlexboxRow = styled.div`
  position: relative;

  @media (min-width: 40em) {
    display: flex;
    justify-content: space-between;
  }
`;

export default TagBuilds;
