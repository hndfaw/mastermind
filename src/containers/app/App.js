import React, { Component } from 'react';
import './App.css';
import { fetchCode } from '../../api/apiCalls';
import GuessingForm from '../guessingForm/GuessingForm';
import ShowGuesses from '../showGuesses/ShowGuesses';
import CodeKeeper from '../codeKeeper/CodeKeeper';


class App extends Component {
  state = {
    code: [],
    currentGuesses: [],
    round: 1,
    successfulRounds: 0,
    roundFinished: false,
  }

  componentDidMount() {
    this.generateNewCode()
  }
  
  generateNewCode = () => {
      let newCode = []
      fetchCode()
        .then(data => data.split(''))
            .then(data => data.map(d => !isNaN(parseInt(d)) && newCode.push(parseInt(d))))
                .then(() =>
                    this.setState({code: newCode})
      )
  }

  submitAGuess = guess => {
    let updatedAllGuesses = this.state.currentGuesses;
    if(updatedAllGuesses.length < 10) {
      this.analyzingCode(guess)
    }

    if(updatedAllGuesses.length === 10) {
        this.endOfRound();
    }

    console.log('code: ', this.state.code)
  }

  analyzingCode = guess => {
    const { code } = this.state
    let analyzedGuess = {
      correctNumbers: 0,
      correctLocations: 0,
      feedbackNum: 0,
    }

     let direction1 = code.filter(codeNum => 
      guess.includes(codeNum)
      ).length

      let direction2 = guess.filter(guessNum => 
        code.includes(guessNum)
    ).length

    analyzedGuess.correctLocations = guess.filter((guessedNum, i) => 
        guessedNum === code[i]
      ).length

      analyzedGuess.correctNumbers = Math.min(direction1, direction2)

      let CN = analyzedGuess.correctNumbers;
      let CL = analyzedGuess.correctLocations
      
      if(CN === 0 && CL === 0) {
          analyzedGuess.feedbackNum = 0;
      } else if (CN === 1 && CL === 0) {
          analyzedGuess.feedbackNum = 1;
      } else if (CN === 1 && CL === 1) {
          analyzedGuess.feedbackNum = 2;
      } else if (CN > 1 && CL !== 4) {
          analyzedGuess.feedbackNum = 3;
      } else if (CN === 4 && CL === 4) {
          analyzedGuess.feedbackNum = 4;

     
        this.endOfRound('success')
      }
    
      let updatedGuess = {
          guess,
          analyzedGuess
      }

      let getCurrentGuesses = this.state.currentGuesses
      getCurrentGuesses.push(updatedGuess)
 
      this.setState({currentGuesses: getCurrentGuesses })

  }

  endOfRound = result => {
        this.setState({roundFinished: true})
        if(result === 'success') {
            let updateSuccessfulRounds = this.state.successfulRounds
            this.setState({successfulRounds: updateSuccessfulRounds + 1})
        }
    }

    restartRound = () => {
        let numOfRounds = this.state.round
        this.setState({currentGuesses: [], roundFinished: false, round: numOfRounds + 1})
        this.generateNewCode()
    }



  render() {
      const { roundFinished, code } = this.state;

    const guess = this.state.currentGuesses.map((g, i) => <ShowGuesses guess={g.guess} key={i} feedback={g.analyzedGuess}/>)

    return (
      <div className="app">
        <div className="game">
            <CodeKeeper roundFinished={roundFinished} code={code}/>
          <div className="guesses-container">
            {guess}
          </div>
          <GuessingForm submitAGuess={this.submitAGuess} roundFinished={roundFinished} restartRound={this.restartRound}/>
        </div>
      </div>
    );
  }
}

export default App;