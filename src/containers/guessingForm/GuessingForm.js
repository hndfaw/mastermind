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
      this.props.restartRound();
    }
  };

  onSubmit = () => {
    const { roundFinished } = this.props;
    const { numOne, numTwo, numThree, numFour } = this.state;

    if (roundFinished !== true && !this.checkEmptyFields()) {
      this.props.submitAGuess([numOne, numTwo, numThree, numFour]);
      this.clearValues();
    }
  };

  handleOnChange = e => {
    const parsedValue = parseInt(e.target.value);
    const value = isNaN(parsedValue) ? "" : parsedValue;
    this.setState({ [e.target.name]: value });
  };

  clearValues = () => {
    this.setState({ numOne: "", numTwo: "", numThree: "", numFour: "" });
  };

  checkEmptyFields = () => {
    const { numOne, numTwo, numThree, numFour } = this.state;
    return numOne === "" || numTwo === "" || numThree === "" || numFour === "";
  };

  render() {
    const { roundFinished, feedbackRespnse, returnLastAnalayzedGuess, currentGuesses } = this.props;
    const { numOne, numTwo, numThree, numFour } = this.state;
    let buttonValue = roundFinished ? "Play again!" : "Go!";

    return (
      <section className="gussing-form-container">
        {feedbackRespnse === "single" && (
            <p className="single-feedback">
              {returnLastAnalayzedGuess().feedback || "Your feedback will be here"}
            </p>
          )}
         <GuessCounter currentGuesses={currentGuesses}/>

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
