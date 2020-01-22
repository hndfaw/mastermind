import React, { Component } from 'react';
import './CodeKeeper.css';

class CodeKeeper extends Component {
  render() {
    const {code, roundFinished } = this.props;
    return (
      <div className="the-code">
            <p className="the-code-num">
                {roundFinished ? code[0] : "*"}
            </p>
            <p className="the-code-num">
                {roundFinished ? code[1] : "*"}
            </p>
            <p className="the-code-num">
                 {roundFinished ? code[2] : "*"}
            </p>
            <p className="the-code-num">
                {roundFinished ? code[3] : "*"}
            </p>
          </div>
    )
  }
}

export default CodeKeeper
