import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GuessingForm.css';


class GussingForm extends Component {
  state = {
    numOne: '',
    numTwo: '',
    numThree: '',
    numFour: ''
  }

  onSubmit = e => {
    const { numOne, numTwo, numThree, numFour } = this.state;
    e.preventDefault();
    // if(numOne !== '' && numTwo !== '' && numThree !== '' && numFour !== '') {
      this.props.submitAGuess([numOne, numTwo, numThree, numFour]);
      this.clearValues()
    // }
  }

  handleOnChange = e => {
    const parsedValue = parseInt(e.target.value);
    const value = isNaN(parsedValue) ? '' : parsedValue
    this.setState({[e.target.name]: value})
    this.numBorderStyle();
  }

  numBorderStyle = (num) => {
    let currentState = this.state[num];

    let colors = {
      numOne: '#dc3545',
      numTwo: '#007bfe',
      numThree: '#ffc108',
      numFour: '#26a243'
    }

    if (currentState !== '' && !isNaN(currentState)) {
      return {
        borderColor: colors[num]
      }
    } else {
      return {
        borderColor: '#bbc3ce'
      }
    }
  }

  clearValues = () => {
    this.setState({numOne: '', numTwo: '', numThree: '', numFour: ''})
  }

  render() {
    const { numOne, numTwo, numThree, numFour } = this.state;
    return (
        <Form
        onSubmit={this.onSubmit}
        className="guessing-form"
        >
           <div className="guss-num-input-container">
                <Form.Control value={numOne} style={this.numBorderStyle('numOne')} name="numOne" onChange={this.handleOnChange} className="guess-num-input guess-num-input-1" maxLength="2"/>
                <Form.Control value={numTwo} style={this.numBorderStyle('numTwo')} name="numTwo" onChange={this.handleOnChange} className="guess-num-input guess-num-input-2" maxLength="2"/>
                <Form.Control value={numThree} style={this.numBorderStyle('numThree')} name="numThree" onChange={this.handleOnChange}  className="guess-num-input guess-num-input-3" maxLength="2"/>
                <Form.Control value={numFour} style={this.numBorderStyle('numFour')} name="numFour" onChange={this.handleOnChange} className="guess-num-input guess-num-input-4" maxLength="2"/>
           </div>
                  
                <Button variant="outline-dark" type="submit" className="submit-guess-btn">
                    Go
                </Button>
            
        </Form>
    )
  }
}

export default GussingForm;
