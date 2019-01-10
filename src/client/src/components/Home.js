import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchForm from "./SearchForm";
import BuildsTable from "./BuildsTable";
import Container from "./common/Container";
import ClassNav from "./ClassNav";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tags: [],
      builds: [],
      open: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => {
        const formattedTags = data.map(d =>
          d
            .split(" ")
            .map(tag => tag[0].toUpperCase() + tag.substr(1))
            .join(" ")
        );
        this.setState({ tags: formattedTags });
      });

    fetch("/api/builds")
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          builds: data.slice(0, 10)
        });
      });
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  handleSubmit(value) {
    this.props.history.push("/tag/" + value.toLowerCase());
  }

  render() {
    let builds;
    if (this.state.loading) {
      builds = <p>Loading...</p>;
    } else {
      builds = <BuildsTable builds={this.state.builds} sort={false} />;
    }

    return (
      <Container>
        <Title>
          Path of Exile<br />Build List
        </Title>
        <Search>
          <SearchForm onSubmit={this.handleSubmit} dataSrc={this.state.tags} />
        </Search>
        <ClassListToggle open={this.state.open} onClick={this.toggleDropdown}>
          Explore by class
        </ClassListToggle>
        <StyledClassNav open={this.state.open} />
        <h4>Most Popular Builds</h4>
        {builds}
      </Container>
    );
  }
}

const Title = styled.h1`
  text-align: center;
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

export default Home;
