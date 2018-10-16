import React, { Component } from "react";

class AutoSuggest extends Component {
  render() {
    const data = this.props.data.filter(d => d.includes(this.props.current));
    return (
      <div className="list-group">
        {data.map(d => (
          <button
            key={d}
            className="list-group-item list-group-item-action py-2"
            onClick={this.props.handleClick}
          >
            {d}
          </button>
        ))}
      </div>
    );
  }
}

export default AutoSuggest;
