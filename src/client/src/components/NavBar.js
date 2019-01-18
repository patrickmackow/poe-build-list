import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import styled from "styled-components";
import ClassNav from "./ClassNav";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClassOpen: false,
      isSearchOpen: false
    };

    this.searchInputRef = React.createRef();

    this.toggleClass = this.toggleClass.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleClass() {
    this.setState({
      isClassOpen: !this.state.isClassOpen,
      isSearchOpen: false
    });
  }

  toggleSearch() {
    this.setState({
      isSearchOpen: !this.state.isSearchOpen,
      isClassOpen: false
    });

    // Input won't focus until it is visible, so timeout is used
    setTimeout(() => {
      this.searchInputRef.current.focus();
    }, 0);
  }

  render() {
    return (
      <StyledNavBar>
        <LinkContainer>
          <StyledLink to="/">PoE Build List</StyledLink>
        </LinkContainer>
        <ClassContainer>
          <ClassLabel
            onClick={this.toggleClass}
            isClassOpen={this.state.isClassOpen}
          >
            Classes
          </ClassLabel>
          <ClassDrawer isClassOpen={this.state.isClassOpen}>
            <StyledClassNav />
          </ClassDrawer>
        </ClassContainer>
        <SearchContainer>
          <SearchLabel onClick={this.toggleSearch}>Search</SearchLabel>
          <SearchDrawer isSearchOpen={this.state.isSearchOpen}>
            <SearchForm searchInputRef={this.searchInputRef} />
          </SearchDrawer>
        </SearchContainer>
      </StyledNavBar>
    );
  }
}

const StyledNavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  display: flex;
  padding: 0.2em 0;

  & + * {
    margin-top: 4em;
  }
`;

const Container = styled.div`
  > a,
  > button {
    transition: background-color 0.2s linear;
  }
`;

const Label = styled.button`
  background: none;
  border: 0;
  color: white;
  font-size: 1rem;
  padding: 0.5em 1em;
  cursor: pointer;
  height: 100%;

  &:hover,
  &:active {
    background-color: #444;
  }
`;

const Drawer = styled.div`
  position: fixed;
  background-color: #333;
  top: 2.5em;
  left: 0;
  width: 100%;
  padding: 0;
`;

const LinkContainer = styled(Container)``;

const StyledLink = styled(Link)`
  display: inline-block;
  color: white;
  font-size: 1rem;
  padding: 0.5em 1em;

  &:visited {
    color: white;
  }

  &:hover,
  &:active {
    text-decoration: none;
    background-color: #444;
  }
`;

const ClassContainer = styled(Container)``;

const ClassLabel = styled(Label)`
  position: relative;
  padding-right: 1.8em;

  ::after {
    position: absolute;
    right: 0.7em;
    top: ${props => (props.isClassOpen ? "0.6em" : "1em")};
    content: "";
    border: 5px solid white;
    border-color: ${props =>
      props.isClassOpen
        ? "transparent transparent white"
        : "white transparent transparent"};
  }

  @media (min-width: 40em) {
    padding-right: 1em;

    ::after {
      border: 0;
    }

    ${ClassContainer}:hover & {
      background-color: #444;
    }
  }
`;

const ClassDrawer = styled(Drawer)`
  display: ${props => (props.isClassOpen ? "block" : "none")};

  @media (min-width: 40em) {
    display: none;

    ${ClassContainer}:hover & {
      display: block;
    }
  }
`;

const SearchContainer = styled(Container)`
  margin-left: auto;
`;

const SearchLabel = styled(Label)`
  @media (min-width: 40em) {
    display: none;
  }
`;

const SearchDrawer = styled(Drawer)`
  display: ${props => (props.isSearchOpen ? "block" : "none")};
  padding: 0.5em 1em;

  @media (min-width: 40em) {
    display: inline-block;
    position: relative;
    background-color: #333;
    top: 0.05em;
    width: 100%;
    padding: 0 0.3em;
  }
`;

const StyledClassNav = styled(ClassNav)`
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    display: inline-block;
    width: 100%;
    color: white;
    padding: 0.5em 1em;
    transition: background-color 0.2s linear;
  }

  a:visited {
    color: white;
  }

  a:hover,
  a:active,
  a.active {
    text-decoration: none;
    background-color: #444;
  }

  @media (min-width: 40em) {
    display: flex;
  }
`;

export default NavBar;
