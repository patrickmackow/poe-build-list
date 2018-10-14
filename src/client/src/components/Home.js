import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
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
      <div>
        <div className="row justify-content-center">
          <div className="col-5">
            <h1>Path of Exile Build List</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 mb-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="col-10">
                  <input
                    className="form-control bg-light border-0"
                    type="text"
                    placeholder="Search by tag"
                    value={this.state.tag}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control bg-light border-0"
                    type="submit"
                    value="Search"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <p className="text-muted">Explore by class</p>
        <div className="row">
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/duelist">Duelist</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/marauder">Marauder</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/ranger">Ranger</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/scion">Scion</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/shadow">Shadow</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/templar">Templar</Link>
            </div>
          </div>
          <div className="card col-12 col-sm">
            <div className="card-body">
              <Link to="/class/witch">Witch</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
