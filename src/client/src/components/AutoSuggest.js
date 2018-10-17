import React, { Component } from "react";

class AutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.activeIndex = this.isActive.bind(this);
  }

  isActive() {
    return false;

    /*if (index !== undefined) {
      index = index < 0 ? (index = arr.length + index) : index;
      classString += index % arr.length === i ? " active" : "";
    }*/
  }

  render() {
    const data = this.props.data.filter(d => d.includes(this.props.tag));
    let { index } = this.props;

    const suggestions = data.map(d => {
      const active = this.isActive();

      return (
        <Suggestion handleClick={this.props.handleClick} active={active}>
          {d}
        </Suggestion>
      );
    });

    return <div className="list-group">{suggestions}</div>;
  }
}

const Suggestion = props => {
  const { children, active } = props;

  return (
    <button
      key={children}
      className={
        "list-group-item list-group-item-action py-2" +
        (active ? " active" : "")
      }
      onClick={props.handleClick}
    >
      {children}
    </button>
  );
};

export default AutoSuggest;
