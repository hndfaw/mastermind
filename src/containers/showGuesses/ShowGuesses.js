import React, { Component } from 'react';
import './ShowGuesses.css';
import { connect } from 'react-redux';

 class ShowGuesses extends Component {
   state = {
     renderThisCompnent: true
   }

   renderGueses = () => {
     this.setState({renderThisCompnent: true})
   }
   
  render() {
    const { guess } = this.props;

    return (
        <div className="guess-card">
            <p className="guess-card-num">{guess[0]}</p>
            <p className="guess-card-num">{guess[1]}</p>
            <p className="guess-card-num">{guess[2]}</p>
            <p className="guess-card-num">{guess[3]}</p>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  currentGuess: state.currentGuess,
})

export default connect(mapStateToProps, null)(ShowGuesses);

