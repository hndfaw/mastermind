import React, { Component } from "react";
import "./Guess.css";

class ShowGuess extends Component {

 

  partOneAndTwoStyle = () => {
    const { feedbackRespnse, index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    const dynamicWidth = (103 - (length - index) * 3) - (((length - index) * index) / 2)
    console.log((((length - index) * index) / 2))
    return feedbackRespnse === "single" ? {
      height: "60%",
      width: `${dynamicWidth}%`
    } : {
      height: null,
      width: `${dynamicWidth}%`
    };
  }


  codeNumStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;

    let dynamicOpacity = 1 - ((length - index) / 25) ;
    return {
      background: `rgba(52, 58, 64, ${dynamicOpacity})`,
    }
  }

  msgStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    let dynamicFontSize = 13 - ((length - index) / 5);
    return {
      fontSize: `${dynamicFontSize}px`
    }

  }

  render() {
    const { guess, feedback, feedbackRespnse } = this.props;
      

    return (
      <div className="guess-card">
        <div className="guess-card-part-1" style={this.partOneAndTwoStyle()}>
          <p className="guess-card-num guess-card-num-1" style={this.codeNumStyle()}>
            {guess[0]}
          </p>
          <p className="guess-card-num guess-card-num-2" style={this.codeNumStyle()}>
            {guess[1]}
          </p>
          <p className="guess-card-num guess-card-num-3" style={this.codeNumStyle()}>
            {guess[2]}
          </p>
          <p className="guess-card-num guess-card-num-4" style={this.codeNumStyle()}>
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
