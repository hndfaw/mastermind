import React, { Component } from "react";
import "./Hint.css";

class Hint extends Component {
  state = {
    hint: "",
    randomCodeIndex: 0,
    randomCodeNum: 0,
    secondSideCard: false,
  };

  returnAHint = () => {
    const { hintIsReady, updateHintReady, hints } = this.props;

    if (hintIsReady) {
      const min = 0;
      const max = parseInt(hints.length - 1);
      const minFixed = min;
      const maxFixed = max - min + 1;
      const randomNumber = Math.floor(Math.random() * maxFixed) + minFixed;
      this.setState({ hint: hints[randomNumber], secondSideCard: true });
      hints.splice(randomNumber, 1);
      this.countDown();
      setTimeout(this.flipBackTheCard, 6000);
      updateHintReady();
    }
  };

  frontStyle = () => {
    const { hintIsReady } = this.props;

    return hintIsReady
      ? {
          color: "#fff",
          cursor: "pointer",
          backgroundColor: "rgb(47, 98, 154)"
        }
      : {
          color: null,
          cursor: "default",
          borderColor: null
        };
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
  };

  hintFrontSideMsg = () => {
    const { hintIsReady, hintsBalance } = this.props;

    if (hintsBalance === 0) {
      return `You do not have hints anymore. You will get 2 hints again in the next round!`;
    } else if (!hintIsReady && hintsBalance === 3) {
      return "Your first hint is NOT ready yet, it will be ready after you make two guesses!";
    } else if (hintIsReady && hintsBalance === 3) {
      return "Your first hint is ready, Click here to reveal it!";
    } else if (!hintIsReady && hintsBalance < 3) {
      return "Your next hint is NOT ready yet. You can only get one hint per a guess!";
    } else if (hintIsReady && hintsBalance < 3) {
      return "Your hint is ready, Click here to reveal it!";
    }
  };

  flipStyle = () => {
    const { secondSideCard } = this.state;
    return secondSideCard
      ? {
          transform: "rotateY(180deg)"
        }
      : {
          transform: null
        };
  };

  timerStyle = () => {
    const { secondSideCard } = this.state;

    return secondSideCard
      ? {
          color: "#fff"
        }
      : {
          color: null
        };
  };

  colorCode = () => {
    return (
      <div className="color-code-container">
        <p className="color-code-1 color-code">
          Correct number in the correct location
        </p>
        <p className="color-code-2 color-code">
          Possible correct number in the wrong location, or just a duplicate!
        </p>
        <p className="color-code-3 color-code">The number does NOT exist</p>
      </div>
    );
  };

  render() {
    const { hint } = this.state;
    const { hintsBalance, roundFinished } = this.props;

    return (
      <section className="hint">
        {roundFinished ? (
          this.colorCode()
        ) : (
          <div>
            <div className="flip-card">
              <div className="flip-card-inner" style={this.flipStyle()}>
                <article
                  style={this.frontStyle()}
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
              <p className="hits-balance">Hints balance: {hintsBalance}</p>
              <p style={this.timerStyle()} className="show-timer">
                0
              </p>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Hint;
