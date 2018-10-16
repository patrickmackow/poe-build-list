import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

class Home extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-5">
            <h1>Path of Exile Build List</h1>
          </div>
        </div>
        <SearchBar history={history} />
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
