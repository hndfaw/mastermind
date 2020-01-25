import React, { Component } from "react";
import "./Hint.css";

class Hint extends Component {
  state = {
    randomCodeIndex: 0,
    randomCodeNum: 0,
    hint: "",
    firstSideOfCard: false,
    hintIsReady: true,
	hintsBalance: 2
  };

  returnAHint = () => {
    const { hintIsReady } = this.state;

    if (hintIsReady) {
      const { hints } = this.props;
      const min = 0;
      const max = parseInt(hints.length - 1);
      const minFixed = min;
      const maxFixed = max - min + 1;
	  const randomNumber = Math.floor(Math.random() * maxFixed) + minFixed;
	  this.setState({ hint: hints[randomNumber], firstSideOfCard: true})
	}
	this.countDown(7)
	setTimeout(this.flipBackTheCard, 9000)
  };

  flipBackTheCard = () => {
	this.setState({ firstSideOfCard: false });
  }

   countDown = () => {
			let timeLeft = 8;
			let timer = setInterval(function(){
				document.querySelector('.show-timer').innerHTML = timeLeft
				timeLeft -= 1;
			if(timeLeft < 0){
				clearInterval(timer);
			} 
		}, 1000);

	}

  render() {

	// const { difficultyLevel, code, currentGuesses} = this.props;
    const { hint, firstSideOfCard, hintsBalance, hintIsReady, timeLeft} = this.state;

    const flipStyle = firstSideOfCard
      ? {
          transform: "rotateY(180deg)"
        }
      : {
          transform: null
		};
		
		const frontStyle = hintIsReady ? {
			color: '#fff'
		} : {
			color: null
		}


    return (
      <section className="hint">
        <div className="flip-card">
          <div className="flip-card-inner" style={flipStyle}>
            <article style={frontStyle} className="flip-card-front" onDoubleClick={this.returnAHint}>
				{!hintIsReady ? <p>Your hint is not ready yet, it will be ready after you make two
              guesses!</p> : <p>Your hint is ready! Double Click Here to open it!</p>}

			  {/* <p className="hints-balance">Hints Balance <span className="hints-balance-num">{hintsBalance}</span></p> */}
              

            </article>

            <article className="flip-card-back">
              <p>{hint}</p>
            </article>
          </div>
        </div>
			  <p className="show-timer">0</p>
      </section>
    );
  }
}

export default Hint;
