import React from "react";
import styled from "styled-components";

function AutoSuggest({ dataSrc, query, onChange }) {
  const activeRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const filteredSuggestions = React.useMemo(
    () => filterDataSrcByValue(dataSrc, query),
    [dataSrc, query]
  );

  const changeActiveBy = React.useCallback(
    (n) => {
      if (n === 1) {
        // Down Arrow
        if (activeIndex === null) {
          setActiveIndex(0);
        } else if (activeIndex >= filteredSuggestions.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex + 1);
        }
      } else if (n === -1) {
        // Up Arrow
        if (activeIndex === null || activeIndex <= 0) {
          setActiveIndex(filteredSuggestions.length - 1);
        } else {
          setActiveIndex(activeIndex - 1);
        }
      }
    },
    [activeIndex, filteredSuggestions]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.keyCode) {
        case 13: // Enter key
          if (activeIndex !== null) {
            event.preventDefault();
            onChange("button", filteredSuggestions[activeIndex].input);
          }
          break;
        case 38: // Up arrow
          event.preventDefault();
          changeActiveBy(-1);
          break;
        case 40: // Down arrow
          event.preventDefault();
          changeActiveBy(1);
          break;
        default:
          break;
      }
    },
    [activeIndex, changeActiveBy, filteredSuggestions, onChange]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  React.useEffect(() => {
    scrollDrawer();
  }, [activeIndex]);

  function scrollDrawer() {
    const activeEl = activeRef.current;
    if (!activeEl) {
      return;
    }

    const parent = activeEl.parentElement;

    if (activeEl.offsetTop < parent.scrollTop) {
      parent.scrollTop = activeEl.offsetTop;
    } else if (
      activeEl.offsetTop + activeEl.offsetHeight >
      parent.scrollTop + parent.offsetHeight
    ) {
      parent.scrollTop =
        activeEl.offsetTop + activeEl.offsetHeight - parent.offsetHeight;
    }
  }

  function handleClick(event) {
    event.preventDefault();
    onChange("button", event.currentTarget.value);
  }

  function filterDataSrcByValue(dataSrc, value) {
    const escapeValue = (v) => {
      return v.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    // Check if dataSrc is undefined
    return dataSrc
      ? dataSrc
          .map((tag) => tag.match(new RegExp(escapeValue(value), "i")))
          .filter((tag) => tag !== null)
      : [];
  }

  // Return early if there is no data
  if (!dataSrc || dataSrc.length === 0) {
    return null;
  }

  let suggestions;
  if (filteredSuggestions.length) {
    suggestions = filteredSuggestions.map((d, i) => {
      const isActive = i === activeIndex;
      const tag = d.input;
      const formattedTag = (
        <React.Fragment>
          {tag.substring(0, d.index)}
          <span style={{ fontWeight: "bold" }}>{d[0]}</span>
          {tag.substring(d.index + d[0].length)}
        </React.Fragment>
      );
      return (
        <Suggestion
          key={d.input}
          value={tag}
          active={isActive}
          ref={isActive ? activeRef : undefined}
          onClick={handleClick}
          onMouseDown={(event) => event.preventDefault()}
          data-testid={"suggestion" + (isActive ? "-active" : "")}
        >
          {formattedTag}
        </Suggestion>
      );
    });
  } else {
    // Add a suggestion when filtered data is empty
    suggestions = (
      <Suggestion
        data-testid="suggestion"
        disabled
        onClick={(e) => e.preventDefault()}
      >
        No suggestions found
      </Suggestion>
    );
  }

  return suggestions ? (
    <Dropdown>
      <DropdownDrawer>{suggestions}</DropdownDrawer>
    </Dropdown>
  ) : null;
}

const Dropdown = styled.div`
  position: absolute;
  z-index: 10;
  min-width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px hsl(0, 0%, 80%);
`;

const DropdownDrawer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

const Suggestion = styled.button`
  width: 100%;
  text-align: left;
  border: 0;
  padding: 0.5em 1em;
  background-color: ${(props) =>
    props.active ? "hsl(27.5, 25%, 35%)" : "white"};
  color: ${(props) => (props.active ? "white" : "inherit")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "" : "silver")};
    color: inherit;
  }
`;

export default AutoSuggest;
