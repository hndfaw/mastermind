import React, { Component } from "react";
import "./CodeKeeper.css";

class CodeKeeper extends Component {
  fontStyle = () => {
    const { roundFinished } = this.props;
    return roundFinished ? { fontSize: "1.88em" } : { fontSize: "2.6em" };
  };

  codeKeeperExtraLayerStyle = () => {
    const { openEndOfRoundMsg } = this.props;
    return !openEndOfRoundMsg
      ? {
          display: "none"
        }
      : {
          display: "block"
        };
  };

  render() {
    const { code, roundFinished } = this.props;

    return (
      <div className="code-keeper">
        <div
          className="code-keeper-extra-layer"
          style={this.codeKeeperExtraLayerStyle()}
        ></div>
        <div className="the-code">
          <p className="the-code-num" style={this.fontStyle()}>
            {roundFinished ? code[0] : "*"}
          </p>
          <p className="the-code-num" style={this.fontStyle()}>
            {roundFinished ? code[1] : "*"}
          </p>
          <p className="the-code-num" style={this.fontStyle()}>
            {roundFinished ? code[2] : "*"}
          </p>
          <p className="the-code-num" style={this.fontStyle()}>
            {roundFinished ? code[3] : "*"}
          </p>
        </div>
      </div>
    );
  }
}

export default CodeKeeper;
