import React, { Component } from "react";

class BuildRow extends Component {
  render() {
    const { build } = this.props;

    return (
      <div className="row border-bottom">
        <div className="row">
          <div className="col-12" />
        </div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-12">
              <a rel="external" href={build.url}>
                {build.title}
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {build.generatedTags.map(tag => tagBadge(tag))}
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="row">
            <div className="col-12 text-sm-right">{build.views}</div>
          </div>
          <div className="row">
            <div className="col-12 text-sm-right">{build.replies}</div>
          </div>
        </div>
      </div>
    );
  }
}

const tagBadge = tag => {
  return (
    <span className="badge badge-pill badge-primary mr-1 text-uppercase">
      {tag}
    </span>
  );
};

export default BuildRow;
