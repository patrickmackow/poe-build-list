import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

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
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="input-group">
          <SearchInput
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ autoSuggestVisible: false })}
          />
          <div className="input-group-append">
            <button className="btn bg-light">
              <i className="fa fa-search text-muted" aria-hidden="true" />
            </button>
          </div>
        </div>
        {this.state.autoSuggestVisible ? (
          <AutoSuggest
            dataSrc={this.props.dataSrc}
            value={this.state.value}
            onChange={this.handleChange}
          />
        ) : null}
      </form>
    );
  }
}

const SearchInput = props => {
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
};

export default SearchForm;
