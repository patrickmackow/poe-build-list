import React, { Component } from "react";

class AutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, index: undefined, suggestion: "" };

    this.updateSuggestion = this.updateSuggestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.activeIndex = this.isActive.bind(this);
  }

  updateSuggestion(suggestion) {
    this.setState({ suggestion });
  }

  handleChange(value) {
    if (!this.state.visible) this.setVisibility(true);
    this.setState({ index: undefined, suggestion: "" });
    this.props.onChange(value);
  }

  setVisibility(v) {
    this.setState({ visible: v });
    if (!v) {
      this.setState({ index: undefined, suggestion: "" });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setVisibility(false);
    } else if (e.keyCode === 13) {
      if (this.state.suggestion) {
        e.preventDefault();
        this.handleChange(this.state.suggestion);
      }
    } else if (e.keyCode === 38) {
      // Arrow up
      // TODO: Current logic isn't function properly. Negative index is bugged
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
    this.props.onChange(e.target.value);
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
    const data = this.props.data.filter(d => {
      return d.match(new RegExp(this.props.value, "i")) !== null;
    });
    let { index } = this.state;

    // TODO: add a suggestion when filtered data is empty
    // TODO: style suggestion text based on current input value
    // TODO: make case insensitive
    const suggestions = data.map((d, i, data) => {
      const active = this.isActive(index, i, data);
      return (
        <Suggestion
          key={d}
          handleClick={this.handleClick}
          active={active}
          updateSuggestion={this.updateSuggestion}
        >
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
            onChange={e => {
              this.handleChange(e.target.value);
            }}
            onBlur={() => {
              //this.setVisibility(false);
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
          <div className="dropdown">
            <div
              className="dropdown-menu d-block col-12 py-0"
              style={{ maxHeight: 200, overflowY: "scroll" }}
            >
              {suggestions}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

class Suggestion extends Component {
  componentDidUpdate(prevProps) {
    const { active, children } = this.props;

    if (active && !prevProps.active) {
      this.props.updateSuggestion(children);
    }
  }

  render() {
    const { children, active } = this.props;

    return (
      <button
        className={"dropdown-item py-2 " + (active ? " active" : " text-muted")}
        value={children}
        onClick={this.props.handleClick}
      >
        {children}
      </button>
    );
  }
}

export default AutoSuggest;
