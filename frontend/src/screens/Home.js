import React from "react";
import styled from "styled-components";

import SearchForm from "components/SearchForm";
import BuildsTable from "components/BuildsTable";
import ClassNav from "components/ClassNav";
import { CentredLoader, Container, Error } from "components/lib";
import { useFetchWithTimeout } from "utils/fetch";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [builds, setBuilds] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    document.title = "PoE Build List";
  }, []);

  const { fetchWithTimeout } = useFetchWithTimeout(5000);

  React.useEffect(() => {
    fetchWithTimeout("builds")
      .then((data) => {
        setLoading(false);
        setError(false);
        setBuilds(data.slice(0, 10));
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [fetchWithTimeout]);

  function toggleDropdown() {
    setOpen(!open);
  }

  let children;
  if (loading) {
    children = <CentredLoader />;
  } else if (error) {
    children = (
      <StyledError>Failed to load builds, refresh to try again.</StyledError>
    );
  } else {
    children = (
      <React.Fragment>
        <StyledSubTitle>Most Popular Builds</StyledSubTitle>
        <BuildsTable builds={builds} />
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Title>
        Path of Exile
        <br />
        Build List
      </Title>
      <Search>
        <SearchForm />
      </Search>
      <ClassListToggle open={open} onClick={toggleDropdown}>
        Explore by class
      </ClassListToggle>
      <StyledClassNav open={open} />
      {children}
    </Container>
  );
}

const Title = styled.h1`
  text-align: center;
`;

const StyledSubTitle = styled.h3`
  color: #222;
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
      top: ${(props) => (props.open ? "0.6em" : "1em")};
      content: "";
      border: 5px solid #111;
      border-color: ${(props) =>
        props.open
          ? "transparent transparent black"
          : "black transparent transparent"};
    }
  }
`;

const StyledClassNav = styled(ClassNav)`
  display: ${(props) => (props.open ? "block" : "none")};
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
