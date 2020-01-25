import React, { Component } from "react";
import "./CodeKeeper.css";

class CodeKeeper extends Component {

	fontStyle = () => {
	 const { roundFinished } = this.props;
	 return roundFinished
      ? { fontSize: "1.88em" }
      : { fontSize: "2.6em" };
	}

  render() {
	const { code, roundFinished } = this.props;
    
    return (
      <div className="code-keeper">
        <div className="the-code">
          <p className="the-code-num the-code-num-1" style={this.fontStyle()}>
            {roundFinished ? code[0] : "*"}
          </p>
          <p className="the-code-num the-code-num-2" style={this.fontStyle()}>
            {roundFinished ? code[1] : "*"}
          </p>
          <p className="the-code-num the-code-num-3" style={this.fontStyle()}>
            {roundFinished ? code[2] : "*"}
          </p>
          <p className="the-code-num the-code-num-4" style={this.fontStyle()}>
            {roundFinished ? code[3] : "*"}
          </p>
        </div>
      </div>
    );
  }
}

export default CodeKeeper;
