import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Path of Exile Build List</h1>
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
