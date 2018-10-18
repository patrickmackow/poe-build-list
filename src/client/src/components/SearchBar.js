import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", data: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/tag/" + this.state.value);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 mb-3">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <AutoSuggest
              data={this.state.data}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
