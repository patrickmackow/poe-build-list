import React from "react";
import styled from "styled-components";

function FilterContainer({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <StyledFilterContainer>
      <FilterLabel isOpen={isOpen} onClick={toggleOpen}>
        Filters
      </FilterLabel>
      <FilterDrawer isOpen={isOpen}>{children}</FilterDrawer>
    </StyledFilterContainer>
  );
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
    content: "${(props) => (props.isOpen ? "-" : "+")}";
    transform: scale(1.3);
  }

  @media (min-width: 40em) {
    padding-left: 1em;
  }
`;

const FilterDrawer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: 0.5em 1em 0.5em 0;

  > * + * {
    margin-left: 0.5em;
  }

  @media (min-width: 40em) {
    padding: 0;
  }
`;

export default FilterContainer;
