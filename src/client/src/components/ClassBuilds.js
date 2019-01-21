import React, { Component } from "react";
import BuildsTable from "./BuildsTable";
import VersionFilter from "./filters/VersionFilter";
import NavBar from "./NavBar";
import Container from "./common/Container";
import styled from "styled-components";

class ClassBuilds extends Component {
  constructor(props) {
    super(props);

    this.abortController = new AbortController();

    this.state = {
      loading: true,
      builds: [],
      version: "" // TODO: Determine latest version within this component
    };

    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.gameClass !== this.props.match.params.gameClass
    ) {
      this.setState({ loading: true });
      this.fetchData();
    }
  }

  fetchData() {
    fetch("/api/builds/" + this.props.match.params.gameClass, {
      signal: this.abortController.signal
    })
      .then(res => res.json())
      .then(builds => {
        this.setState({
          loading: false,
          builds
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
    const { loading, builds } = this.state;

    let buildsView;

    if (loading) {
      buildsView = (
        <div data-testid="loading">
          <p>Loading...</p>
        </div>
      );
    } else {
      const filteredBuilds = this.filterBuilds(builds);

      buildsView = (
        <StyledClassBuilds>
          <VersionFilter
            value={this.state.version}
            builds={builds}
            onChange={this.handleVersionChange}
          />
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

export default ClassBuilds;
