import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Path of Exile Build List</h1>
          <div>
            <Link to="/class/duelist">Duelist</Link>
          </div>
          <div>
            <Link to="/class/maurader">Marauder</Link>
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
          <Route path="/class/:gameClass" component={GameClass} />
        </div>
      </Router>
    );
  }
}

const GameClass = ({ match }) => (
  <div>
    <h3>{match.params.gameClass}</h3>
  </div>
);

export default App;
