import React, { Component } from "react";
import styled from "styled-components";

class BuildRow extends Component {
  render() {
    const { build, ...rest } = this.props;

    return (
      <Build {...rest}>
        {/* <BuildImage src="/images/slayer.png" /> */}
        <BuildLeft>
          <BuildTitle rel="external" href={build.url} data-testid="build-link">
            {build.title}
          </BuildTitle>
          {build.generatedTags.map(tag => (
            <Tag key={tag} data-testid="build-tag">
              {tag}
            </Tag>
          ))}
        </BuildLeft>
        <BuildRight>
          <BuildMetaInfo data-testid="build-views">
            <i className="fa fa-eye" aria-hidden="true" />
            {build.views}
          </BuildMetaInfo>
          <BuildMetaInfo data-testid="build-replies">
            <i className="fa fa-comment-o" aria-hidden="true" />
            {build.replies}
          </BuildMetaInfo>
        </BuildRight>
      </Build>
    );
  }
}

const Build = styled.div`
  padding: 0.6em 1em;
  margin: 0 0 0.6em;
  background-color: white;
  box-shadow: 0 2px 4px hsl(0, 0%, 80%);
  // border-bottom: 1px solid #000;

  @media (min-width: 35em) {
    display: flex;
  }
`;

const BuildImage = styled.img`
  flex: initial;
`;

const BuildLeft = styled.div`
  flex: 1;

  a::after {
    display: block;
    content: " ";
  }
`;

const BuildRight = styled.div`
  flex: initial;

  @media (min-width: 35em) {
    margin-left: 1em;
  }
`;

const BuildTitle = styled.a`
  font-size: 1.1rem;
`;

const BuildMetaInfo = styled.span`
  display: inline-block;
  margin-top: 0.2em;
  margin-right: 0.5em;
  color: grey;

  i {
    margin-right: 0.3em;
  }

  @media (min-width: 35em) {
    display: block;
    text-align: right;
  }
`;

const Tag = styled.span`
  display: inline-block;
  // background-image: linear-gradient(
  //   to bottom,
  //   hsl(210, 75%, 50%),
  //   hsl(210, 75%, 47%)
  // );
  background-color: hsl(210, 75%, 50%);
  box-shadow: 0 2px 4px hsl(0, 0%, 70%);
  padding: 0.2em 0.5em;
  margin-top: 0.4em;
  margin-right: 0.3em;
  border-radius: 1em;
  color: white;
  text-transform: uppercase;
  font-size: 0.775rem;
  font-weight: bold;
`;

export default BuildRow;
