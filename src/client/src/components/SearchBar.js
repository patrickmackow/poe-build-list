import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 mb-3">
          <form onSubmit={this.props.handleSubmit}>
            <div className="input-group">
              <input
                className="form-control bg-light border-0"
                type="text"
                placeholder="Search by tag"
                value={this.props.tag}
                onChange={this.props.handleChange}
              />
              <div className="input-group-append">
                <button className="btn bg-light btn-block">
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
