import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import BuildsTable from "components/BuildsTable";
import VersionFilter from "components/filters/VersionFilter";
import NavBar from "components/NavBar";
import FilterContainer from "components/filters/FilterContainer";
import SortSelect from "components/SortSelect";
import { CentredLoader, Container, Error } from "components/lib";
import { setTitle } from "utils/misc";
import { useLatestVersion, useClassBuilds } from "utils/api";

function ClassBuilds() {
  const { gameClass } = useParams();
  const {
    data: latestVersion,
    isLoading: loadingLatestVersion,
    isError: errorLatestVersion,
  } = useLatestVersion();
  const {
    data: builds,
    isLoading: loadingClassBuilds,
    isError: errorClassBuilds,
  } = useClassBuilds(gameClass);

  const isLoading = loadingLatestVersion || loadingClassBuilds;
  const isError = errorLatestVersion || errorClassBuilds;

  const [version, setVersion] = React.useState("");
  const [sort, setSort] = React.useState("latest");

  const handleVersionChange = React.useCallback((event) => {
    setVersion(event.target.value);
  }, []);

  const handleSortChange = React.useCallback((event) => {
    setSort(event.target.value);
  }, []);

  function filterBuilds(builds) {
    // Default filter is latest patch and has at least 1 tag
    return builds.filter(
      (build) => build.version === version && build.generatedTags.length
    );
  }

  React.useEffect(() => {
    setTitle(gameClass);
  }, [gameClass]);

  let buildsView;

  if (isLoading) {
    buildsView = <CentredLoader />;
  } else if (isError) {
    buildsView = <Error>Failed to load builds, refresh to try again.</Error>;
  } else {
    const filteredBuilds = filterBuilds(builds);

    let table;
    if (filteredBuilds.length) {
      table = <BuildsTable builds={filteredBuilds} sort={sort} />;
    } else {
      table = <Error>No builds found</Error>;
    }

    buildsView = (
      <StyledClassBuilds>
        <FlexboxRow>
          <FilterContainer>
            <VersionFilter
              value={version}
              builds={builds}
              onChange={handleVersionChange}
              latestVersion={latestVersion}
            />
          </FilterContainer>
          <SortSelect value={sort} onChange={handleSortChange} />
        </FlexboxRow>
        {table}
      </StyledClassBuilds>
    );
  }

  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Title>{gameClass}</Title>
        {buildsView}
      </Container>
    </React.Fragment>
  );
}

const Title = styled.h1`
  text-transform: capitalize;
`;

const StyledClassBuilds = styled.div`
  .game-class {
    display: none;
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
