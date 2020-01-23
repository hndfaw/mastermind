import React, { Component } from "react";
import "./CodeKeeper.css";

class CodeKeeper extends Component {
  render() {
    const { code, roundFinished } = this.props;
    let fontStyle = roundFinished ? { fontSize: "2.3em" } : { fontSize: "3em" };
    return (
      <div className="the-code">
        <p className="the-code-num the-code-num-1" style={fontStyle}>
          {roundFinished ? code[0] : "*"}
        </p>
        <p className="the-code-num the-code-num-2" style={fontStyle}>
          {roundFinished ? code[1] : "*"}
        </p>
        <p className="the-code-num the-code-num-3" style={fontStyle}>
          {roundFinished ? code[2] : "*"}
        </p>
        <p className="the-code-num the-code-num-4" style={fontStyle}>
          {roundFinished ? code[3] : "*"}
        </p>
      </div>
    );
  }
}

export default CodeKeeper;
