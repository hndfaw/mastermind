import React, { Component } from "react";
import "./CodeKeeper.css";
// import GuessCounter from "../../component/guessCounter/GuessCounter";

class CodeKeeper extends Component {



  render() {

    const { code, roundFinished } = this.props;
	let fontStyle = roundFinished ? { fontSize: "1.88em" } : { fontSize: "2.6em" };
	
	
    return (
      <div className="code-keeper">
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
      </div>
    );
  }
}

export default CodeKeeper;
