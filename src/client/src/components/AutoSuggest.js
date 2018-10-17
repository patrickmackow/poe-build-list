import React, { Component } from "react";

class AutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, index: undefined, suggestion: "" };

    this.handleChange = this.handleChange.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.activeIndex = this.isActive.bind(this);
  }

  handleChange(e) {
    if (!this.state.visible) this.setVisibility(true);
    this.props.onChange(e);
  }

  setVisibility(v) {
    this.setState({ visible: v });
    if (!v) {
      this.setState({ index: undefined });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setVisibility(false);
    } else if (e.keyCode === 13) {
      //e.preventDefault();
    } else if (e.keyCode === 38) {
      // Arrow up
      e.preventDefault();

      if (!this.state.visible) return;

      if (this.state.index !== undefined) {
        this.setState({ index: this.state.index - 1 });
      } else {
        this.setState({ index: 0 });
      }
    } else if (e.keyCode === 40) {
      // Arrow down
      e.preventDefault();

      if (!this.state.visible) return;

      if (this.state.index !== undefined) {
        this.setState({ index: this.state.index + 1 });
      } else {
        this.setState({ index: 0 });
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onChange(e);
    this.setVisibility(false);
  }

  isActive(index, i, arr) {
    if (index === undefined) {
      return false;
    }

    index = index < 0 ? (index = arr.length + index) : index;
    return index % arr.length === i ? true : false;
  }

  render() {
    const data = this.props.data.filter(d => d.includes(this.props.value));
    let { index } = this.state;

    // TODO: add a suggestion when filtered data is empty
    const suggestions = data.map((d, i, data) => {
      const active = this.isActive(index, i, data);

      return (
        <Suggestion key={d} handleClick={this.handleClick} active={active}>
          {d}
        </Suggestion>
      );
    });

    return (
      <React.Fragment>
        <div className="input-group">
          <input
            className="form-control bg-light border-0"
            type="text"
            placeholder="Search by tag"
            value={this.props.value}
            onChange={this.handleChange}
            onBlur={() => {
              this.setVisibility(false);
            }}
            onKeyDown={this.handleKeyDown}
          />
          <div className="input-group-append">
            <button className="btn bg-light">
              <i className="fa fa-search text-muted" aria-hidden="true" />
            </button>
          </div>
        </div>
        {this.state.visible ? (
          <div className="list-group">{suggestions}</div>
        ) : null}
      </React.Fragment>
    );
  }
}

const Suggestion = props => {
  const { children, active } = props;

  return (
    <button
      className={
        "list-group-item list-group-item-action py-2" +
        (active ? " active" : "")
      }
      value={children}
      onClick={props.handleClick}
    >
      {children}
    </button>
  );
};

export default AutoSuggest;
