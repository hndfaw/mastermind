import React, { Component } from 'react';
import './ShowGuesses.css';

 class ShowGuesses extends Component {
   state = {
     renderThisCompnent: true
   }

   renderGueses = () => {
     this.setState({renderThisCompnent: true})
   }
   
  render() {
    const { guess, feedback } = this.props;

    let feedbackResponse = {
      0: 'Your guess was incorrect',
      1: 'You had a correct number',
      2: 'You had guessed a correct number and its correct location',
      3: `You had ${feedback.correctNumbers} correct numbers and ${feedback.correctLocations} crrect location/s`,
      4: 'You found the CORRECT code!'
    }

    return (
        <div className="guess-card">
          <div className="guess-card-part-1">
            <p className="guess-card-num">{guess[0]}</p>
            <p className="guess-card-num">{guess[1]}</p>
            <p className="guess-card-num">{guess[2]}</p>
            <p className="guess-card-num">{guess[3]}</p>
          </div>
          <div className="guess-card-part-2">
    <p className="guess-card-part-2-msg">{feedbackResponse[feedback.feedbackNum]}</p>
          </div>
        </div>
    )
  }
}



export default ShowGuesses;

