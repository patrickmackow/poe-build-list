import React from "react";
import BuildsTable from "components/BuildsTable";
import VersionFilter from "components/filters/VersionFilter";
import ClassFilter from "components/filters/ClassFilter";
import NavBar from "components/NavBar";
import styled from "styled-components";
import FilterContainer from "components/filters/FilterContainer";
import SortSelect from "components/SortSelect";
import { Container, Error, CentredLoader } from "components/lib";
import { useParams } from "react-router-dom";
import { useFetchWithTimeout } from "utils/fetch";

function TagBuilds() {
  const [loading, setLoading] = React.useState(true);
  const [builds, setBuilds] = React.useState([]);
  const [version, setVersion] = React.useState("");
  const [latestVersion, setLatestVersion] = React.useState("");
  const [gameClass, setGameClass] = React.useState("All");
  const [error, setError] = React.useState(false);
  const [sort, setSort] = React.useState("latest");

  const { tag } = useParams();
  const { fetchWithTimeout } = useFetchWithTimeout(5000);

  function setTitle(title) {
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
  React.useEffect(() => {
    setTitle(tag);
  }, [tag]);

  React.useEffect(() => {
    fetchWithTimeout("version").then(({ version }) => {
      setLatestVersion(version);
      setVersion(version);
    });
  }, [fetchWithTimeout]);

  React.useEffect(() => {
    fetchWithTimeout(`tags/${tag}`)
      .then((builds) => {
        setLoading(false);
        setBuilds(builds);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [fetchWithTimeout, tag]);

  const handleVersionChange = React.useCallback((event) => {
    setVersion(event.target.value);
    setGameClass("All");
  }, []);

  const handleClassChange = React.useCallback((event) => {
    setGameClass(event.target.value);
  }, []);

  const handleSortChange = React.useCallback((event) => {
    setSort(event.target.value);
  }, []);

  function filterBuilds(builds) {
    const filter = (builds, ignoreVersion = false) => {
      if (ignoreVersion) {
        return filterBuildsByClass(builds);
      } else {
        const filtered = filterBuildsByVersion(builds);
        return filterBuildsByClass(filtered);
      }
    };

    let filteredBuilds = filter(builds);

    if (filteredBuilds.length) {
      return filteredBuilds;
    } else {
      return filter(builds, true);
    }
  }

  function filterBuildsByClass(builds) {
    const filtered = builds.filter((build) => {
      if (build.gameClass === gameClass.toLowerCase() || gameClass === "All") {
        return true;
      }

      return false;
    });

    return filtered;
  }

  function filterBuildsByVersion(builds) {
    const filtered = builds.filter((build) => {
      if (build.version === version) {
        return true;
      }

      return false;
    });

    return filtered;
  }

  let buildsView;
  if (loading) {
    buildsView = <CentredLoader />;
  } else if (error) {
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
      <React.Fragment>
        <FlexboxRow>
          <FilterContainer>
            <VersionFilter
              value={version}
              builds={builds}
              onChange={handleVersionChange}
              latestVersion={latestVersion}
            />
            <ClassFilter
              value={gameClass}
              builds={filterBuildsByVersion(builds)}
              onChange={handleClassChange}
            />
          </FilterContainer>
          <SortSelect value={sort} onChange={handleSortChange} />
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

const Title = styled.h1`
  text-transform: capitalize;
`;

const FlexboxRow = styled.div`
  position: relative;

  @media (min-width: 40em) {
    display: flex;
    justify-content: space-between;
  }
`;

export default TagBuilds;
