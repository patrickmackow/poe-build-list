import React, { Component } from "react";
import styled from "styled-components";

class BuildRow extends Component {
  render() {
    const { build, ...rest } = this.props;
    const cssClass = "game-class " + build.gameClass;
    return (
      <Build {...rest}>
        <BuildLeft>
          <BuildTitle
            rel="noopener noreferrer"
            target="_blank"
            href={build.url}
            data-testid="build-link"
          >
            {build.title}
          </BuildTitle>
          <Tag key={build.gameClass} className={cssClass}>
            {build.gameClass}
          </Tag>
          {build.generatedTags.map(tag => (
            <Tag key={tag.tag} data-testid="build-tag" className={tag.type}>
              {tag.tag}
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
  border-radius: 2px;
  // border-bottom: 1px solid #000;

  @media (min-width: 35em) {
    display: flex;
  }
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
  letter-spacing: 0.3px;
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
  background-color: #e1e1e1;
  color: #111;
  padding: 0.2em 0.5em;
  margin-top: 0.4em;
  margin-right: 0.3em;
  border-radius: 1em;
  text-transform: uppercase;
  font-size: 0.775rem;
  font-weight: bold;

  &.dex {
    background-color: hsl(120, 50%, 90%);
    color: hsl(120, 50%, 30%);
  }
  &.str {
    background-color: hsl(350, 50%, 90%);
    color: hsl(350, 50%, 30%);
  }
  &.int {
    background-color: hsl(220, 50%, 90%);
    color: hsl(220, 50%, 30%);
  }

  &.duelist {
    background-color: hsl(30, 90%, 90%);
    color: hsl(30, 90%, 20%);
  }
  &.marauder {
    background-color: hsl(0, 90%, 90%);
    color: hsl(0, 90%, 20%);
  }
  &.ranger {
    background-color: hsl(120, 90%, 90%);
    color: hsl(120, 90%, 20%);
  }
  &.scion {
    background-color: hsl(0, 0%, 90%);
    color: hsl(0, 0%, 20%);
  }
  &.shadow {
    background-color: hsl(200, 90%, 90%);
    color: hsl(200, 90%, 20%);
  }
  &.templar {
    background-color: hsl(300, 90%, 90%);
    color: hsl(300, 90%, 20%);
  }
  &.witch {
    background-color: hsl(230, 90%, 90%);
    color: hsl(230, 90%, 20%);
  }
`;

export default BuildRow;
