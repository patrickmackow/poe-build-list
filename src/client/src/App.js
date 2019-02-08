import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";

// import "./App.css";

import Home from "./components/Home";
import ClassBuilds from "./components/ClassBuilds";
import TagBuilds from "./components/TagBuilds";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Wrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/class/:gameClass" component={ClassBuilds} />
            <Route exact path="/tag/:tag" component={TagBuilds} />
          </Wrapper>
          <Footer>
            <p>This is a fan site not associated with Grinding Gear Games.</p>
            <a
              href="https://github.com/patrickmackow/poe-build-list"
              rel="noopener noreferrer"
              target="_blank"
            >
              View source on GitHub
            </a>
          </Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const Wrapper = styled.div`
  overflow: auto;
  margin-bottom: 1em;
  flex: 1 0 auto;
`;

const Footer = styled.footer`
  flex-shrink: 1;
  padding: 1em 0;
  font-size: 0.8rem;
  background-color: #ddd;
  text-align: center;

  > * {
    margin: 0;
  }

  p {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export default App;
