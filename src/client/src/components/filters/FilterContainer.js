import React, { Component } from "react";
import styled from "styled-components";

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <StyledFilterContainer>
        <FilterLabel isOpen={this.state.isOpen} onClick={this.toggleOpen}>
          Filters
        </FilterLabel>
        <FilterDrawer isOpen={this.state.isOpen}>
          {this.props.children}
        </FilterDrawer>
      </StyledFilterContainer>
    );
  }
}

const StyledFilterContainer = styled.div`
  @media (min-width: 40em) {
    display: flex;
    align-items: center;
  }

  margin-bottom: 0.5em;
`;

const FilterLabel = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: bold;
  color: #555;
  padding: 0.5em 1em;
  padding-left: 0;
  border: 0;
  background: inherit;

  ::after {
    font-weight: normal;
    margin-left: 0.2em;
    display: inline-block;
    content: "${props => (props.isOpen ? "-" : "+")}";
    transform: scale(1.3);
  }

  @media (min-width: 40em) {
    padding-left: 1em;
  }
`;

const FilterDrawer = styled.div`
  display: ${props => (props.isOpen ? "block" : "none")};
  padding: 0.5em 1em 0.5em 0;

  > * + * {
    margin-left: 0.5em;
  }

  @media (min-width: 40em) {
    padding: 0;
  }
`;

export default FilterContainer;
