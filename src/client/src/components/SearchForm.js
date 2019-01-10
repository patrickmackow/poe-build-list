import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";
import styled from "styled-components";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      autoSuggestVisible: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(element, value) {
    if (element === "button") {
      this.setState({
        value,
        autoSuggestVisible: false
      });
    } else if (element === "input") {
      this.setState({
        value,
        autoSuggestVisible: true
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleKeyDown(e) {
    if (e.key === "Escape" && this.state.autoSuggestVisible) {
      this.setState({ autoSuggestVisible: false });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        autoComplete="off"
        className={this.props.className}
      >
        <InputGroup>
          <SearchInput
            type="text"
            placeholder="Search by tag"
            value={this.state.value}
            onChange={e => this.handleChange("input", e.target.value)}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ autoSuggestVisible: false })}
          />
          <SearchButton>
            <I className="fa fa-search text-muted" aria-hidden="true" />
            <SearchButtonText>Search</SearchButtonText>
          </SearchButton>
        </InputGroup>
        {this.state.autoSuggestVisible ? (
          <AutoSuggest
            dataSrc={this.props.dataSrc}
            value={this.state.value}
            onChange={this.handleChange}
          />
        ) : null}
      </Form>
    );
  }
}

/*const SearchInput = props => {
  return (
    <input
      className="form-control bg-light border-0"
      type="text"
      placeholder="Search by tag"
      value={props.value}
      onChange={e => {
        props.onChange("input", e.target.value);
      }}
      onKeyDown={props.onKeyDown}
      onBlur={props.onBlur}
    />
  );
};*/

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

  ${SearchButton}:hover & {
    transform: scale(1.1);
  }
`;

export default SearchForm;
