import React, { Component } from 'react';
import './App.css';
// import { setCode, setCurrentGuess } from '../../actions';
import { fetchCode } from '../../api/apiCalls';
// import { connect } from 'react-redux';
import GuessingForm from '../guessingForm/GuessingForm';
import ShowGuesses from '../showGuesses/ShowGuesses';


class App extends Component {
  state = {
    code: [],
    currentGuesses: [],
    aGuesSubmitted: true
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
    console.log(newCode)
  }

  submitAGuess = guess => {
    let updatedAllGuesses = this.state.currentGuesses;
    if(updatedAllGuesses.length < 10) {
      updatedAllGuesses.push(guess)
      this.setState({currentGuesses: updatedAllGuesses})
    }
  }


  render() {
    const guess = this.state.currentGuesses.map((g, i) => <ShowGuesses guess={g} key={i}/>)

    return (
      <div className="app">
        <div className="game">
          <div className="the-code">
            <p className="the-code-num">*</p>
            <p className="the-code-num">*</p>
            <p className="the-code-num">*</p>
            <p className="the-code-num">*</p>
          </div>
          <div className="guesses-container">
            {guess}
          </div>
          <GuessingForm submitAGuess={this.submitAGuess}/>
        </div>
      </div>
    );
  }
}

export default App;

// export const mapStateToProps = state => ({
//   currentGuess: state.currentGuess,
// })

// export const mapDispatchToProps = dispatch => ({
//   handleSetCode: code => dispatch(setCode(code)),
//   handleSetCurrentGuess: guess => dispatch(setCurrentGuess(guess))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App);