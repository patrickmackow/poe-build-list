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
        <h1>Path of Exile Build List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search by tag"
            value={this.state.tag}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>
        <br />
        <div>
          <Link to="/class/duelist">Duelist</Link>
        </div>
        <div>
          <Link to="/class/marauder">Marauder</Link>
        </div>
        <div>
          <Link to="/class/ranger">Ranger</Link>
        </div>
        <div>
          <Link to="/class/scion">Scion</Link>
        </div>
        <div>
          <Link to="/class/shadow">Shadow</Link>
        </div>
        <div>
          <Link to="/class/templar">Templar</Link>
        </div>
        <div>
          <Link to="/class/witch">Witch</Link>
        </div>
      </div>
    );
  }
}

export default Home;
