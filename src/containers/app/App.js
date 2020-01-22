import React, { Component } from 'react';
import './App.css';
import { setCode } from '../../actions';
import { fetchCode } from '../../api/apiCalls';
import { connect } from 'react-redux';
import GuessingForm from '../guessingForm/GuessingForm';


class App extends Component {
  componentDidMount() {
    this.generateNewCode()
  }
  
  generateNewCode = () => {
    let newCode = []
    fetchCode()
    .then(data => data.split(''))
    .then(data => data.map(d => !isNaN(parseInt(d)) && newCode.push(parseInt(d))))
    .then(() => this.props.handleSetCode(newCode))
  }

  submitAGuess = guess => {
    console.log(guess);
  }



  render() {
    return (
      <div className="app">
        <div className="game">
          <div></div>
          <GuessingForm submitAGuess={this.submitAGuess}/>
        </div>
        
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  handleSetCode: code => dispatch(setCode(code)),
})

export default connect(null, mapDispatchToProps)(App);