import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => {
        const formattedTags = data.map(d =>
          d
            .split(" ")
            .map(tag => tag[0].toUpperCase() + tag.substr(1))
            .join(" ")
        );
        this.setState({ tags: formattedTags });
      });
  }

  handleSubmit(value) {
    this.props.history.push("/tag/" + value.toLowerCase());
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
            <SearchForm
              onSubmit={this.handleSubmit}
              dataSrc={this.state.tags}
            />
          </div>
        </div>
        <p className="text-muted">Explore by class</p>
        <div className="row">
          <ClassCard href="duelist">Duelist</ClassCard>
          <ClassCard href="marauder">Marauder</ClassCard>
          <ClassCard href="ranger">Ranger</ClassCard>
          <ClassCard href="scion">Scion</ClassCard>
          <ClassCard href="shadow">Shadow</ClassCard>
          <ClassCard href="templar">Templar</ClassCard>
          <ClassCard href="witch">Witch</ClassCard>
        </div>
      </div>
    );
  }
}

const ClassCard = props => {
  return (
    <div className="card col-12 col-sm">
      <div className="card-body">
        <Link to={`/class/${props.href}`}>{props.children}</Link>
      </div>
    </div>
  );
};

export default Home;
