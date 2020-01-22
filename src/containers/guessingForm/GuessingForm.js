import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GuessingForm.css';


class GussingForm extends Component {
  state = {
    numOne: -1,
    numTwo: -1,
    numThree: -1,
    numFour: -1
  }

  onSubmit = e => {
    const { numOne, numTwo, numThree, numFour } = this.state;
    e.preventDefault();
    this.props.submitAGuess([numOne, numTwo, numThree, numFour])
  }

  handleOnChange = e => {
    this.setState({[e.target.name]: parseInt(e.target.value)})
    this.numBorderStyle()
  }

  numBorderStyle = (num) => {
    let currentState = this.state[num];

    let colors = {
      numOne: '#dc3545',
      numTwo: '#007bfe',
      numThree: '#ffc108',
      numFour: '#26a243'
    }

    if (currentState !== -1 && !isNaN(currentState)) {
      return {
        borderColor: colors[num]
      }
    } else {
      return {
        borderColor: '#9da6b3'
      }
    }
  }

  render() {
    return (
        <Form
        onSubmit={this.onSubmit}
        className="gussing-form"
        >
           <div className="guss-num-input-container">
                <Form.Control style={this.numBorderStyle('numOne')} name="numOne" onChange={this.handleOnChange} className="guess-num-input guess-num-input-1"/>
                <Form.Control style={this.numBorderStyle('numTwo')} name="numTwo" onChange={this.handleOnChange} className="guess-num-input guess-num-input-2"/>
                <Form.Control style={this.numBorderStyle('numThree')} name="numThree" onChange={this.handleOnChange}  className="guess-num-input guess-num-input-3"/>
                <Form.Control style={this.numBorderStyle('numFour')} name="numFour" onChange={this.handleOnChange} className="guess-num-input guess-num-input-4"/>
           </div>
                  
                <Button variant="outline-dark" type="submit" className="submit-guess-btn">
                    Go
                </Button>
            
        </Form>
    )
  }
}

export default GussingForm;
