import React, { Component } from 'react';
import './App.css';
import { fetchRanomNumbers } from '../../api/apiCalls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setCode } from '../../actions';
import { connect } from 'react-redux';



class App extends Component {
  state = {
    welcomeWindoOpen: true,
    instructionsWindoOpen: false,
    playerName: "",
    code: [],
    currentRound: 1,
    winningRounds: 0,
    guessesPerRound: [],
    currentGuessNumber: 1,
    guessesRemainded: 9,
    currentRoundGuesses: [],
    currentRoundResults: [],
    currentGuess: []
  }


  componentDidMount() {
    this.generateNewCode()
  }

  generateNewCode = () => {
    let generatedCode = []
    fetchRanomNumbers().then(data => {
      data.split('').map(number =>
        !isNaN(parseInt(number))  &&  generatedCode.push(parseInt(number))
        )
    }).then(() => this.props.handleSetCode(generatedCode))
  }


  render() {
    return (
      <div className="app">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  handleSetCode: code => dispatch(setCode(code))
})

export default connect(null, mapDispatchToProps)(App);

