import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: "", isFocused: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({ tag: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/tag/" + this.state.tag);
  }

  toggleFocus(e) {
    this.setState({ isFocused: !this.state.isFocused });
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.toggleFocus();
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ tag: e.target.textContent });
    this.toggleFocus();
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 mb-3">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="input-group">
              <input
                className="form-control bg-light border-0"
                type="text"
                placeholder="Search by tag"
                value={this.state.tag}
                onChange={this.handleChange}
                onFocus={this.toggleFocus}
                onKeyDown={this.handleKeyDown}
              />
              <div className="input-group-append">
                <button className="btn bg-light">
                  <i className="fa fa-search text-muted" aria-hidden="true" />
                </button>
              </div>
            </div>
            {this.state.isFocused ? (
              <AutoSuggest
                data={["caustic arrow", "cleave", "cyclone"]}
                current={this.state.tag}
                handleClick={this.handleClick}
              />
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
