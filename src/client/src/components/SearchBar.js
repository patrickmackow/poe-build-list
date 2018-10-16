import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ tag: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/tag/" + this.state.tag);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 mb-3">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                className="form-control bg-light border-0"
                type="text"
                placeholder="Search by tag"
                value={this.state.tag}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <button className="btn bg-light">
                  <i className="fa fa-search text-muted" aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
