import React, { Component } from "react";

class BuildRow extends Component {
  render() {
    const { build, ...rest } = this.props;

    return (
      <div className="row border-bottom mb-2" {...rest}>
        <div className="row">
          <div className="col-12" />
        </div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-12">
              <a rel="external" href={build.url} data-testid="build-link">
                {build.title}
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-sm-1">
              {build.generatedTags.map(tag => tagBadge(tag))}
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="row">
            <div
              className="col-auto col-sm-12 text-sm-right text-muted"
              data-testid="build-views"
            >
              <i className="fa fa-eye mr-1" aria-hidden="true" />
              {build.views}
            </div>
            <div
              className="col-auto col-sm-12 text-sm-right text-muted"
              data-testid="build-replies"
            >
              <i className="fa fa-comment-o mr-1" aria-hidden="true" />
              {build.replies}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const tagBadge = tag => {
  return (
    <span
      key={tag}
      className="badge badge-pill badge-primary mr-1 text-uppercase"
      data-testid="build-tag"
    >
      {tag}
    </span>
  );
};

export default BuildRow;
