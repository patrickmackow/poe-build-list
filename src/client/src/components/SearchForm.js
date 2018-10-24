import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <AutoSuggest
          dataSrc={this.props.dataSrc}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
