import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: "", visible: false, index: undefined };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({
      tag: e.target.value,
      index: undefined
    });
    this.setVisibility(true);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/tag/" + this.state.tag);
  }

  setVisibility(v) {
    this.setState({ visible: v });
    if (!v) {
      this.setState({ index: undefined });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setVisibility(false);
    } else if (e.keyCode === 38) {
      // Arrow up
      e.preventDefault();

      if (!this.state.visible) return;

      if (this.state.index !== undefined) {
        this.setState({ index: this.state.index - 1 });
      } else {
        this.setState({ index: 0 });
      }
    } else if (e.keyCode === 40) {
      // Arrow down
      e.preventDefault();

      if (!this.state.visible) return;

      if (this.state.index !== undefined) {
        this.setState({ index: this.state.index + 1 });
      } else {
        this.setState({ index: 0 });
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ tag: e.target.textContent });
    this.setVisibility(false);
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
                onFocus={() => {
                  this.setVisibility(true);
                }}
                onKeyDown={this.handleKeyDown}
              />
              <div className="input-group-append">
                <button className="btn bg-light">
                  <i className="fa fa-search text-muted" aria-hidden="true" />
                </button>
              </div>
            </div>
            {this.state.visible ? (
              <AutoSuggest
                data={["caustic arrow", "cleave", "cyclone"]}
                tag={this.state.tag}
                index={this.state.index}
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
