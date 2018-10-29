import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { tags: [] };
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
        this.setState({ tags: formattedTags });
      });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light px-0">
        <Link to="/">Back to Home</Link>
        <SearchForm
          onSubmit={this.props.onSubmit}
          dataSrc={this.state.tags}
          className="ml-auto"
        />
      </nav>
    );
  }
}

export default NavBar;
