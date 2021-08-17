import React from "react";
import AutoSuggest from "./AutoSuggest";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useTags } from "utils/api";

function SearchForm({ className }) {
  const { data: tags } = useTags();
  const formattedTags = React.useMemo(
    () =>
      tags
        ? tags.map((d) =>
            d
              .split(" ")
              .map((tag) => tag[0].toUpperCase() + tag.substr(1))
              .join(" ")
          )
        : [],
    [tags]
  );
  const [query, setQuery] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const history = useHistory();

  function handleChange(element, value) {
    if (element === "button") {
      setQuery(value);
      setIsVisible(false);
      submit(value); // useState is asynchronous, so value needs to be passed to submit
    } else if (element === "input") {
      setQuery(value);
      setIsVisible(true);
    }
  }

  function submit(value = "") {
    if (!query.length && !value.length) {
      return;
    }
    setIsVisible(false);
    history.push(`/tag/${value ? value.toLowerCase() : query.toLowerCase()}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && isVisible) {
      setIsVisible(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off" className={className}>
      <InputGroup>
        <SearchInput
          type="text"
          placeholder="Search by tag"
          value={query}
          onChange={(event) => handleChange("input", event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsVisible(false)}
        />
        <SearchButton>
          <I className="fa fa-search" aria-hidden="true" />
          <SearchButtonText>Search</SearchButtonText>
        </SearchButton>
      </InputGroup>
      {isVisible ? (
        <AutoSuggest
          dataSrc={formattedTags}
          query={query}
          onChange={handleChange}
        />
      ) : null}
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;

  input {
    flex: 1;
  }

  button {
    flex: initial;
  }
`;

const SearchInput = styled.input`
  border: 0;
  padding-left: 1em;
`;

const SearchButton = styled.button`
  background-color: white;
  border: 0;
  display: block;
  overflow: hidden;
  position: relative;
  padding: 0.5em 1em;
`;

const SearchButtonText = styled.span`
  position: absolute;
  left: 1000px;
`;

const I = styled.i`
  transition: transform 0.2s ease-out;
  color: #666;

  ${SearchButton}:hover & {
    transform: scale(1.1);
  }
`;

export default SearchForm;
