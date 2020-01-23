import React, { Component } from 'react';
import './ShowGuesses.css';



 class ShowGuesses extends Component {
 
   
  render() {
    const { guess, feedback, feedbackRespnse} = this.props;
    const partOneStyle = feedbackRespnse === 'single' ? {height: '100%'} : {height: null};
    const codeNumStyle = feedbackRespnse === 'single' ? {fontSize: '24px'} : {fontSize: null};


    let feedbackResponse = {
      0: 'Your guess was incorrect',
      1: 'You had a correct number',
      2: 'You had guessed a correct number and its correct location',
      3: `You had ${feedback.correctNumbers} correct numbers and ${feedback.correctLocations} crrect location/s`,
      4: 'You found the CORRECT code!'
    }

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
          {feedbackRespnse === 'all' && <div className="guess-card-part-2">
              <p className="guess-card-part-2-msg">{feedbackResponse[feedback.feedbackNum]}</p>
          </div>}
        </div>
    )
  }
}



export default ShowGuesses;

