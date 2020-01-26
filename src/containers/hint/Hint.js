import React, { Component } from "react";
import "./Hint.css";

class Hint extends Component {
  state = {
    randomCodeIndex: 0,
    randomCodeNum: 0,
    hint: "",
    secondSideCard: false
  };

  returnAHint = () => {
    const { hintIsReady, updateHintReady } = this.props;

    if (hintIsReady) {
      const { hints } = this.props;
      const min = 0;
      const max = parseInt(hints.length - 1);
      const minFixed = min;
      const maxFixed = max - min + 1;
      const randomNumber = Math.floor(Math.random() * maxFixed) + minFixed;
      this.setState({ hint: hints[randomNumber], secondSideCard: true });
      this.countDown(7);
      setTimeout(this.flipBackTheCard, 6000);
      updateHintReady();
    }
  };

  flipBackTheCard = () => {
    this.setState({ secondSideCard: false });
  };

  countDown = () => {
    let timeLeft = 5;
    let timer = setInterval(function() {
      document.querySelector(".show-timer").innerHTML = timeLeft;
      timeLeft -= 1;
      if (timeLeft < 0) {
        clearInterval(timer);
      }
    }, 1000);
  };Í

  hintFrontSideMsg = () => {
    const { hintIsReady, hintsBalance } = this.props;

    if (hintsBalance === 0) {
      return `You do not have hints anymore. You will get 2 hints again in the next round!`;
    } else if (!hintIsReady && hintsBalance === 3) {
      return "Your first hint is NOT ready yet, it will be ready after you make two guesses!";
    } else if (hintIsReady && hintsBalance === 3) {
      return "Your first hint is ready, CLICK here to reveal it!";
    } else if (!hintIsReady && hintsBalance < 3) {
      return "Your next hint is NOT ready yet. You can only get one hint per a guess!";
    } else if (hintIsReady && hintsBalance < 3) {
      return "Your hint is ready, CLICK here to reveal it!";
    }
  };

  render() {
    const { hint, secondSideCard } = this.state;
    const { hintIsReady, hintsBalance } = this.props;

    const flipStyle = secondSideCard
      ? {
          transform: "rotateY(180deg)"
        }
      : {
          transform: null
        };

    const frontStyle = hintIsReady
      ? {
          color: "#fff",
          cursor: "pointer"
        }
      : {
          color: null,
          cursor: "default"
        };

    const timerStyle = secondSideCard
      ? {
          color: "#fff"
        }
      : {
          color: null
        };

    return (
      <section className="hint">
        <div className="flip-card">
          <div className="flip-card-inner" style={flipStyle}>
            <article
              style={frontStyle}
              className="flip-card-front"
              onClick={this.returnAHint}
            >
              {this.hintFrontSideMsg()}
            </article>

            <article className="flip-card-back">
              <p className="flip-card-hint">{hint}</p>
            </article>
          </div>
        </div>
        <div className="hits-balance-timer-container">
          <p className="hits-balance">Hits balance: {hintsBalance}</p>
          <p style={timerStyle} className="show-timer">
            0
          </p>
        </div>
      </section>
    );
  }
}

export default Hint;
