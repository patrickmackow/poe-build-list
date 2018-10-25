import React, { Component } from "react";

class AutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: undefined
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ active: undefined });
    }
  }

  handleKeyDown(e) {
    // TODO: Clean this up
    if (e.keyCode === 13) {
      // Enter key
      if (this.state.active !== undefined) {
        e.preventDefault();
        this.props.onChange(
          "button",
          this.filterDataSrcByValue(this.props.dataSrc, this.props.value)[
            this.state.active
          ].input
        );
      }
    } else if (e.keyCode === 38) {
      // Arrow up
      e.preventDefault();

      if (this.state.active === undefined || this.state.active <= 0) {
        this.setState({
          active:
            this.filterDataSrcByValue(this.props.dataSrc, this.props.value)
              .length - 1
        });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    } else if (e.keyCode === 40) {
      // Arrow down
      e.preventDefault();

      if (this.state.active === undefined) {
        this.setState({ active: 0 }); // TODO: what if dataSrc is empty?
      } else if (
        this.state.active >=
        this.filterDataSrcByValue(this.props.dataSrc, this.props.value).length -
          1
      ) {
        this.setState({ active: 0 }); // TODO: what if dataSrc is empty?
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onChange("button", e.target.value);
  }

  filterDataSrcByValue(dataSrc, value) {
    // Check if dataSrc is undefined
    // TODO: Memoize this?
    // TODO: Arguments are always the same
    // TODO: Escape value, breaks regex
    return dataSrc
      ? dataSrc
          .map(tag => tag.match(new RegExp(value, "i")))
          .filter(tag => tag !== null)
      : [];
  }

  render() {
    const data = this.filterDataSrcByValue(
      this.props.dataSrc,
      this.props.value
    );

    // TODO: add a suggestion when filtered data is empty
    const suggestions = data.map((d, i) => {
      const tag = d.input;
      const formattedTag = (
        <React.Fragment>
          {tag.substring(0, d.index)}
          <span className="font-weight-bold">{d[0]}</span>
          {tag.substring(d.index + d[0].length)}
        </React.Fragment>
      );
      return (
        <Suggestion
          key={d.input}
          value={tag}
          onClick={this.handleClick}
          active={i === this.state.active ? true : false}
        >
          {formattedTag}
        </Suggestion>
      );
    });

    return suggestions.length ? (
      <div className="dropdown">
        <div
          className="dropdown-menu d-block col-12 py-0"
          style={{ maxHeight: 200, overflowY: "scroll" }}
        >
          {suggestions}
        </div>
      </div>
    ) : null;
  }
}

class Suggestion extends Component {
  render() {
    const { children, value, active, onClick } = this.props;

    return (
      <button
        className={"dropdown-item py-2 " + (active ? " active" : " text-muted")}
        onClick={onClick}
        onMouseDown={e => e.preventDefault()} // Needed because onBlur is fired before onClick
        value={value}
        data-testid={"suggestion" + (active ? "-active" : "")}
      >
        {children}
      </button>
    );
  }
}

export default AutoSuggest;
