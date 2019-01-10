import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

// import "./App.css";

import Home from "./components/Home";
import ClassBuilds from "./components/ClassBuilds";
import TagBuilds from "./components/TagBuilds";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/class/:gameClass" component={ClassBuilds} />
          <Route exact path="/tag/:tag" component={TagBuilds} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
