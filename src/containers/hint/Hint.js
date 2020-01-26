import React, { Component } from "react";
import "./Hint.css";

class Hint extends Component {
  state = {
    randomCodeIndex: 0,
    randomCodeNum: 0,
    hint: "",
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
      this.countDown(7);
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
		  backgroundColor: 'rgb(47, 98, 154)',
        }
      : {
          color: null,
          cursor: "default",
          borderColor: null,
          backgroundColor: null
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
  Í;

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


  render() {
    const { hint } = this.state;
    const { hintsBalance } = this.props;

	return (
      <section className="hint">
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
      </section>
    );
  }
}

export default Hint;
