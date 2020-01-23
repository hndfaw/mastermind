import React, { Component } from "react";
import "./ShowGuesses.css";

class ShowGuesses extends Component {
  render() {
    const { guess, feedback, feedbackRespnse } = this.props;
    const partOneStyle =
      feedbackRespnse === "single" ? { height: "100%" } : { height: null };
    const codeNumStyle =
      feedbackRespnse === "single" ? { fontSize: "24px" } : { fontSize: null };

    return (
      <div className="guess-card">
        <div className="guess-card-part-1" style={partOneStyle}>
          <p className="guess-card-num" style={codeNumStyle}>
            {guess[0]}
          </p>
          <p className="guess-card-num" style={codeNumStyle}>
            {guess[1]}
          </p>
          <p className="guess-card-num" style={codeNumStyle}>
            {guess[2]}
          </p>
          <p className="guess-card-num" style={codeNumStyle}>
            {guess[3]}
          </p>
        </div>
        {feedbackRespnse === "all" && (
          <div className="guess-card-part-2">
            <p className="guess-card-part-2-msg">{feedback.feedback}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ShowGuesses;
