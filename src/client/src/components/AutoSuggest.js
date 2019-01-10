import React, { Component } from "react";
import styled from "styled-components";

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
    switch (e.keyCode) {
      case 13: // Enter key
        if (this.state.active !== undefined) {
          e.preventDefault();
          this.props.onChange(
            "button",
            this.filterDataSrcByValue(this.props.dataSrc, this.props.value)[
              this.state.active
            ].input
          );
        }
        break;
      case 38: // Up arrow
        e.preventDefault();
        this.changeActiveBy(-1);
        break;
      case 40: // Down arrow
        e.preventDefault();
        this.changeActiveBy(1);
        break;
      default:
        break;
    }
  }

  changeActiveBy(value) {
    if (value === 1) {
      // Down Arrow
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
    } else if (value === -1) {
      // Up Arrow
      if (this.state.active === undefined || this.state.active <= 0) {
        this.setState({
          active:
            this.filterDataSrcByValue(this.props.dataSrc, this.props.value)
              .length - 1
        });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onChange("button", e.target.value);
  }

  filterDataSrcByValue(dataSrc, value) {
    // TODO: Memoize this?
    // TODO: Arguments are always the same
    const escapeValue = v => {
      return v.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    // Check if dataSrc is undefined
    return dataSrc
      ? dataSrc
          .map(tag => tag.match(new RegExp(escapeValue(value), "i")))
          .filter(tag => tag !== null)
      : [];
  }

  render() {
    const { dataSrc, value } = this.props;

    // Return early if there is no data
    if (!dataSrc || dataSrc.length === 0) {
      return null;
    }

    const filtered = this.filterDataSrcByValue(dataSrc, value);

    let suggestions;
    if (filtered.length) {
      suggestions = filtered.map((d, i) => {
        const active = i === this.state.active;
        const tag = d.input;
        const formattedTag = (
          <React.Fragment>
            {tag.substring(0, d.index)}
            <span style={{ fontWeight: "bold" }}>{d[0]}</span>
            {tag.substring(d.index + d[0].length)}
          </React.Fragment>
        );
        return (
          <Suggestion
            key={d.input}
            value={tag}
            active={active}
            onClick={this.handleClick}
            onMouseDown={e => e.preventDefault()}
            data-testid={"suggestion" + (active ? "-active" : "")}
          >
            {formattedTag}
          </Suggestion>
          /*<Suggestion
            key={d.input}
            value={tag}
            onClick={this.handleClick}
            active={i === this.state.active ? true : false}

            onClick={!disabled ? onClick : e => e.preventDefault()}
        onMouseDown={e => e.preventDefault()} // Needed because onBlur is fired before onClick
        value={value}
        data-testid={"suggestion" + (active ? "-active" : "")}
          >
            {formattedTag}
          </Suggestion>*/
        );
      });
    } else {
      // Add a suggestion when filtered data is empty
      suggestions = (
        <Suggestion
          data-testid="suggestion"
          disabled
          onClick={e => e.preventDefault()}
        >
          No suggestions found
        </Suggestion>
      );
    }

    return suggestions ? (
      <Dropdown>
        <DropdownDrawer>{suggestions}</DropdownDrawer>
      </Dropdown>
    ) : null;
  }
}

const Dropdown = styled.div`
  position: absolute;
  z-index: 10;
  min-width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px hsl(0, 0%, 80%);
`;

const DropdownDrawer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

const Suggestion = styled.button`
  width: 100%;
  text-align: left;
  border: 0;
  padding: 0.5em 1em;
  /* color: hsl(27.5, 25%, 35%); */
  background-color: ${props =>
    props.active ? "hsl(27.5, 25%, 35%)" : "white"};
  color: ${props => (props.active ? "white" : "inherit")};

  &:hover {
    background-color: ${props => (props.disabled ? "" : "silver")};
    color: inherit;
  }
`;

/*class Suggestion extends Component {
  render() {
    const { children, value, active, onClick, disabled } = this.props;

    return (
      <button
        className={
          "dropdown-item py-2 " +
          (active ? " active" : " text-muted") +
          (disabled ? " disabled" : "")
        }
        onClick={!disabled ? onClick : e => e.preventDefault()}
        onMouseDown={e => e.preventDefault()} // Needed because onBlur is fired before onClick
        value={value}
        data-testid={"suggestion" + (active ? "-active" : "")}
      >
        {children}
      </button>
    );
  }
}*/

export default AutoSuggest;
