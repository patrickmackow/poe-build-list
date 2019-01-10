import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchForm from "./SearchForm";
import BuildsTable from "./BuildsTable";
import Container from "./common/Container";

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
        <ClassList open={this.state.open}>
          <ClassItem>
            <ClassItemLink to="/class/duelist">Duelist</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/marauder">Marauder</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/ranger">Ranger</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/scion">Scion</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/shadow">Shadow</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/templar">Templar</ClassItemLink>
          </ClassItem>
          <ClassItem>
            <ClassItemLink to="/class/witch">Witch</ClassItemLink>
          </ClassItem>
        </ClassList>
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

const ClassList = styled.ul`
  display: ${props => (props.open ? "block" : "none")};
  list-style: none;
  padding-left: 0;
  margin-top: 0;

  @media (min-width: 40em) {
    display: flex;
    justify-content: space-between;
  }
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

const ClassItem = styled.li`
  flex: 1;
`;

const ClassItemLink = styled(Link)`
  display: block;
  padding: 0.5em 1em;
  background-color: #333;
  color: white;
  transition: background-color 0.2s linear;

  &:visited {
    color: white;
  }

  &:hover,
  &:active {
    text-decoration: none;
    background-color: #444;
  }

  @media (min-width: 40em) {
    text-align: center;
  }
`;

const ClassItemLinkImage = styled.img`
  display: none;
  width: 100%;
`;

export default Home;
