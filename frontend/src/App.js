import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "screens/Home";
import ClassBuilds from "screens/ClassBuilds";
import TagBuilds from "screens/TagBuilds";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <React.Fragment>
            <Wrapper>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/class/:gameClass" component={ClassBuilds} />
                <Route exact path="/tag/:tag" component={TagBuilds} />
                <Route
                  render={() => (
                    <h1 style={{ marginLeft: "1em" }}>404 not found</h1>
                  )}
                />
              </Switch>
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
        </QueryClientProvider>
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
