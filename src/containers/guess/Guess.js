import React, { Component } from "react";
import "./Guess.css";

class ShowGuess extends Component {

  guessCardStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    let dynamicWidth = (105 - (length - index) * 8) - (((length - index - 1) * index)/1.4);
    let dynamicHeight = 42 - (length - index) * 2 ;
    let dynamicFontSize = 20 - (length - index);
    let dynamicMarginTop = 28 - ((length - index) * 2);

    return {
      width: `${dynamicWidth}%`,
      height: `${dynamicHeight}px`,
      fontSize: `${dynamicFontSize}px`,
      marginTop: `${dynamicMarginTop}px`
    }
  }

  partOneStyle = () => {
    const { feedbackRespnse } = this.props;
    return feedbackRespnse === "single" ? { height: "100%" } : { height: null };
  }

  codeNumStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;

    let dynamicOpacity = 1 - ((length - index) / 20) ;
    return {
      background: `rgba(121, 135, 150, ${dynamicOpacity})`
    }
  }

  msgStyle = () => {
    const { index, currentGuesses } = this.props;
    let length = currentGuesses.length;
    let dynamicFontSize = 13 - ((length - index) / 1.6);
    return {
      fontSize: `${dynamicFontSize}px`
    }

  }

  render() {
    const { guess, feedback, feedbackRespnse } = this.props;
      

    return (
      <div className="guess-card" style={this.guessCardStyle()}>
        <div className="guess-card-part-1" style={this.partOneStyle()}>
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
          <div className="guess-card-part-2">
            <p className="guess-card-part-2-msg" style={this.msgStyle()}>{feedback.feedback}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ShowGuess;
