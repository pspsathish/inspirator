import React, { Component } from "react";
import "./ProgressBar.css";
class ProgressBar extends Component {
  state = {};
  render() {
    return (
      <div className="slider" style={{ width: this.props.width }}>
        <div
          className="line"
          style={{ width: this.props.width, backgroundColor: "#f7d747" }}
        />
        <div className="subline inc" style={{ backgroundColor: "#d69410" }} />
        <div className="subline dec" />
      </div>
    );
  }
}

export default ProgressBar;
