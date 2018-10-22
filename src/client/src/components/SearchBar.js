import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => {
        const formattedTags = data.map(d =>
          d
            .split(" ")
            .map(tag => tag[0].toUpperCase() + tag.substr(1))
            .join(" ")
        );
        this.setState({ data: formattedTags });
      });
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/tag/" + this.state.value.toLowerCase());
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
