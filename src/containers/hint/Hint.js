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
      setTimeout(this.flipBackTheCard, 9000);
      updateHintReady();
    }
  };

  flipBackTheCard = () => {
    this.setState({ secondSideCard: false });
  };

  countDown = () => {
    let timeLeft = 8;
    let timer = setInterval(function() {
      document.querySelector(".show-timer").innerHTML = timeLeft;
      timeLeft -= 1;
      if (timeLeft < 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  render() {
    const { hint, secondSideCard, timeLeft } = this.state;
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
          color: "#fff"
        }
      : {
          color: null
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
              {!hintIsReady ? (
                <p>
                  Your hint is not ready yet, it will be ready after you make
                  two guesses!
                </p>
              ) : (
                <p>Your hint is ready! Click Here to reveal it!</p>
              )}

              {/* <p className="hints-balance">Hints Balance <span className="hints-balance-num">{hintsBalance}</span></p> */}
            </article>

            <article className="flip-card-back">
              <p>{hint}</p>
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
