import React, { Component } from "react";
import styled from "styled-components";

import SearchForm from "./SearchForm";
import BuildsTable from "./BuildsTable";
import Container from "./common/Container";
import ClassNav from "./ClassNav";
import Loader from "./common/Loader";
import Error from "./common/Error";
import fetchWithTimeout from "../fetchWithTimeout";

class Home extends Component {
  constructor(props) {
    super(props);

    this.abortController = new AbortController();

    this.state = {
      loading: true,
      builds: [],
      open: false,
      error: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    document.title = "PoE Build List";

    fetchWithTimeout("/api/builds", this.abortController, 5000)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          error: false,
          builds: data.slice(0, 10)
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

  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  render() {
    let builds;
    if (this.state.loading) {
      builds = (
        <LoaderContainer>
          <Loader />;
        </LoaderContainer>
      );
    } else if (this.state.error) {
      builds = (
        <StyledError>Failed to load builds, refresh to try again.</StyledError>
      );
    } else {
      builds = (
        <React.Fragment>
          <StyledSubTitle>Most Popular Builds</StyledSubTitle>
          <BuildsTable builds={this.state.builds} />
        </React.Fragment>
      );
    }

    return (
      <Container>
        <Title>
          Path of Exile<br />Build List
        </Title>
        <Search>
          <SearchForm />
        </Search>
        <ClassListToggle open={this.state.open} onClick={this.toggleDropdown}>
          Explore by class
        </ClassListToggle>
        <StyledClassNav open={this.state.open} />
        {builds}
      </Container>
    );
  }
}

const Title = styled.h1`
  text-align: center;
`;

const StyledSubTitle = styled.h3`
  color: #222;
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

const Search = styled.div`
  margin: 0 auto;
  max-width: 800px;
  box-shadow: 0 2px 4px hsl(0, 0%, 80%);
`;

const ClassListToggle = styled.button`
  position: relative;
  width: 100%;
  text-align: left;
  border: 0;
  padding: 0.5em 1em;
  margin-top: 1em;
  background-color: inherit;

  @media (max-width: 39.99em) {
    background-color: hsl(0, 0%, 95%);
    cursor: pointer;

    ::after {
      position: absolute;
      right: 1em;
      top: ${props => (props.open ? "0.6em" : "1em")};
      content: "";
      border: 5px solid #111;
      border-color: ${props =>
        props.open
          ? "transparent transparent black"
          : "black transparent transparent"};
    }
  }
`;

const StyledClassNav = styled(ClassNav)`
  display: ${props => (props.open ? "block" : "none")};
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    display: inline-block;
    width: 100%;
    padding: 0.5em 1em;
    background-color: #333;
    color: white;
    transition: background-color 0.2s linear;
  }

  a:visited {
    color: white;
  }

  a:hover,
  a:active {
    text-decoration: none;
    background-color: #444;
  }

  @media (min-width: 40em) {
    display: flex;

    li {
      flex: 1;
    }

    a {
      text-align: center;
    }
  }
`;

const StyledError = styled(Error)`
  margin: 1em;
`;

export default Home;
