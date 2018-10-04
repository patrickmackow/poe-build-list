import React, { Component } from "react";
import { Link } from "react-router-dom";

class TagBuilds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      builds: []
    };
  }

  componentDidMount() {
    const { tag } = this.props.match.params;
    fetch("/api/tags/" + tag)
      .then(res => res.json())
      .then(builds =>
        this.setState({
          builds,
          loading: false
        })
      );
  }

  render() {
    const { loading, builds } = this.state;

    const buildsViews = loading ? (
      <p>Loading...</p>
    ) : (
      <p>{builds.length} builds loaded</p>
    );

    return (
      <div>
        <Link to="/">Back to Home</Link>
        <h1>Tag</h1>
        {buildsViews}
      </div>
    );
  }
}

export default TagBuilds;
