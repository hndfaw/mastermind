import React, { Component } from "react";
import "./Guess.css";

class ShowGuess extends Component {

 

  partOneAndTwoStyle = () => {
    const { feedbackRespnse, index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    const dynamicWidth = (103 - (length - index) * 3) - (((length - index) * index) / 2)
    return feedbackRespnse === "single" ? {
      height: "60%",
      width: `${dynamicWidth}%`
    } : {
      height: null,
      width: `${dynamicWidth}%`
    };
  }


  codeNumStyle = (i, value) => {
    const { index, currentGuesses, roundFinished, code } = this.props;
    let length = currentGuesses.length;

    let dynamicOpacity = 1 - ((length - index) / 25) ;
    if(!roundFinished) {
      return {
        background: `rgba(52, 58, 64, ${dynamicOpacity})`,
      }
    } else {
      return this.codeNumFinalStyle(i, value, code, dynamicOpacity)
    }
  }

  codeNumFinalStyle = (index, value, code, dynamicOpacity) => {

    if(code[index] === value) {
      return {
        background: `rgba(38,162,67, ${dynamicOpacity})`,
      }
    } else if (code.includes(value)) {
      return {
        background: `rgba(255,193,8, ${dynamicOpacity})`,
      }
    } else {
      return {
        background: `rgba(52, 58, 64, ${dynamicOpacity})`,
      }
    }
    
  }

  msgStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    let dynamicFontSize = 1 - ((length - index) / 20);
    return {
      fontSize: `${dynamicFontSize}em`
    }

  }

  render() {
    const { guess, feedback, feedbackRespnse } = this.props;
      

    return (
      <div className="guess-card">
        <div className="guess-card-part-1" style={this.partOneAndTwoStyle()}>
          <p className="guess-card-num guess-card-num-1" style={this.codeNumStyle(0, guess[0])}>
            {guess[0]}
          </p>
          <p className="guess-card-num guess-card-num-2" style={this.codeNumStyle(1, guess[1])}>
            {guess[1]}
          </p>
          <p className="guess-card-num guess-card-num-3" style={this.codeNumStyle(2, guess[2])}>
            {guess[2]}
          </p>
          <p className="guess-card-num guess-card-num-4" style={this.codeNumStyle(3, guess[3])}>
            {guess[3]}
          </p>
        </div>
        {feedbackRespnse === "all" && (
          <div className="guess-card-part-2" style={this.partOneAndTwoStyle()}>
            <p className="guess-card-part-2-msg" style={this.msgStyle()}>{feedback.feedback}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ShowGuess;
