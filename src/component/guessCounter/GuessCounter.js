import React, { Component } from "react";
import "./GuessCounter.css";

class GuessCounter extends Component {
  generateGuessStatus = () => {
    const { currentGuesses } = this.props;
    let guessStatus = [];

    for (let i = 9; i >= 0; i--) {
      if (!currentGuesses[i]) {
        guessStatus.push(1);
      } else {
        guessStatus.push(0);
      }
    }
    return guessStatus;
  };

  generateElement = () => {

    return this.generateGuessStatus().map((el, i) => {
      if (el === 1) {
        return <div className="single-guess-counter" key={i}></div>;
      } else {
        return <div className="single-guess-counter empty" key={i}></div>;
      }
    });
  };

  render() {
    return (
      <div className="guess-counter">
        <div className="guess-counter-container">{this.generateElement()}</div>
      </div>
    );
  }
}

export default GuessCounter;
