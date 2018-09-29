import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import ClassBuilds from "./components/ClassBuilds";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/class/:gameClass" component={ClassBuilds} />
        </div>
      </Router>
    );
  }
}

export default App;
