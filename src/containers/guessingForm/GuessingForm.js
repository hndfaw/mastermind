import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./GuessingForm.css";
import GuessCounter from "../../component/guessCounter/GuessCounter";

class GussingForm extends Component {
  state = {
    numOne: "",
    numTwo: "",
    numThree: "",
    numFour: ""
  };

  restartOrSubmit = e => {
    e.preventDefault();
    const { roundFinished } = this.props;
    if (!roundFinished) {
      this.onSubmit();
    } else {
      this.props.restart("Round-Finished");
    }
  };

  onSubmit = () => {
    const { roundFinished } = this.props;
    const { numOne, numTwo, numThree, numFour } = this.state;

    if (roundFinished !== true && !this.checkEmptyFields()) {
      this.props.submitAGuess([numOne, numTwo, numThree, numFour]);
      this.clearValues();
    }

    document.querySelector('.guess-num-input-1').focus()
  };

  handleOnChange = e => {
    const { difficultyLevel } = this.props;

    const parsedValue = parseInt(e.target.value);
    const value = isNaN(parsedValue) ? "" : parsedValue;
    this.setState({ [e.target.name]: value });
    
    if(difficultyLevel === 7) {
      this.autoFocus(e.target.name, e.target.value, 'oneDigit')
    } else {
      this.autoFocus(e.target.name, e.target.value, 'twoDigits')
    }
  };

  autoFocus = (name, value, type) => {

    if(type === 'oneDigit') {
        if(name === 'numOne') {
          document.querySelector('.guess-num-input-2').focus()
        } else if (name === 'numTwo') {
          document.querySelector('.guess-num-input-3').focus()
        } else if (name === 'numThree') {
          document.querySelector('.guess-num-input-4').focus()
        }
    } else {
        if(name === 'numOne' && value.length === 2) {
          document.querySelector('.guess-num-input-2').focus()
        } else if (name === 'numTwo' && value.length === 2) {
          document.querySelector('.guess-num-input-3').focus()
        } else if (name === 'numThree' && value.length === 2) {
          document.querySelector('.guess-num-input-4').focus()
        }
    }
    
  }

  clearValues = () => {
    this.setState({ numOne: "", numTwo: "", numThree: "", numFour: "" });
  };

  checkEmptyFields = () => {
    const { numOne, numTwo, numThree, numFour } = this.state;
    return numOne === "" || numTwo === "" || numThree === "" || numFour === "";
  };

  render() {
    const {
      roundFinished,
      feedbackRespnse,
      returnLastAnalayzedGuess,
      currentGuesses
    } = this.props;
    const { numOne, numTwo, numThree, numFour } = this.state;
    let buttonValue = roundFinished ? "Next Round" : "Go!";

    return (
      <section className="gussing-form-container">
        {feedbackRespnse === "single" && (
          <p className="single-feedback">
            {returnLastAnalayzedGuess().feedback ||
              "Your feedback will be here"}
          </p>
        )}
        <GuessCounter currentGuesses={currentGuesses} />

        <Form onSubmit={this.restartOrSubmit} className="guessing-form">
          <div className="guss-num-input-container">
            <Form.Control
              disabled={roundFinished}
              value={numOne}
              name="numOne"
              onChange={this.handleOnChange}
              className="guess-num-input guess-num-input-1"
              maxLength="2"
              type="number"
            />
            <Form.Control
              disabled={roundFinished}
              value={numTwo}
              name="numTwo"
              onChange={this.handleOnChange}
              className="guess-num-input guess-num-input-2"
              maxLength="2"
              type="number"
            />
            <Form.Control
              disabled={roundFinished}
              value={numThree}
              name="numThree"
              onChange={this.handleOnChange}
              className="guess-num-input guess-num-input-3"
              maxLength="2"
              type="number"
            />
            <Form.Control
              disabled={roundFinished}
              value={numFour}
              name="numFour"
              onChange={this.handleOnChange}
              className="guess-num-input guess-num-input-4"
              maxLength="2"
              type="number"
            />
          </div>

          <Button
            disabled={this.checkEmptyFields() && !roundFinished}
            variant="dark"
            type="submit"
            className="submit-guess-btn"
          >
            {buttonValue}
          </Button>
        </Form>
      </section>
    );
  }
}

export default GussingForm;
