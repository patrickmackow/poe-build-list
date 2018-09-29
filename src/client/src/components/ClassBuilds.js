import React, { Component } from "react";
import { Link } from "react-router-dom";

class ClassBuilds extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/api/builds/" + this.props.match.params.gameClass)
      .then(res => res.json())
      .then(builds => {
        this.setState({
          loading: false,
          builds
        });
      });
  }

  render() {
    const { loading, builds } = this.state;

    let buildsView;

    if (loading) {
      buildsView = (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      buildsView = (
        <div>
          <p>{builds ? builds.length : 0} builds loaded</p>
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Back to Home</Link>
        <h1>{this.props.match.params.gameClass}</h1>
        {buildsView}
      </div>
    );
  }
}

export default ClassBuilds;
