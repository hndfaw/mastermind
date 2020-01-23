import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./GuessingForm.css";

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
    this.numBorderStyle();
  };

  numBorderStyle = num => {
    let currentState = this.state[num];

    let colors = {
      numOne: "#dc3545",
      numTwo: "#007bfe",
      numThree: "#ffc108",
      numFour: "#26a243"
    };

    if (currentState !== "" && !isNaN(currentState)) {
      return {
        borderColor: colors[num]
      };
    } else {
      return {
        borderColor: "#495057"
      };
    }
  };

  clearValues = () => {
    this.setState({ numOne: "", numTwo: "", numThree: "", numFour: "" });
  };

  checkEmptyFields = () => {
    const { numOne, numTwo, numThree, numFour } = this.state;
    return numOne === "" || numTwo === "" || numThree === "" || numFour === "";
  };

  render() {
    const { roundFinished } = this.props;
    const { numOne, numTwo, numThree, numFour } = this.state;
    let buttonValue = roundFinished ? "Play again!" : "Go!";

    return (
      <Form onSubmit={this.restartOrSubmit} className="guessing-form">
        <div className="guss-num-input-container">
          <Form.Control
            disabled={roundFinished}
            value={numOne}
            style={this.numBorderStyle("numOne")}
            name="numOne"
            onChange={this.handleOnChange}
            className="guess-num-input guess-num-input-1"
            maxLength="2"
          />
          <Form.Control
            disabled={roundFinished}
            value={numTwo}
            style={this.numBorderStyle("numTwo")}
            name="numTwo"
            onChange={this.handleOnChange}
            className="guess-num-input guess-num-input-2"
            maxLength="2"
          />
          <Form.Control
            disabled={roundFinished}
            value={numThree}
            style={this.numBorderStyle("numThree")}
            name="numThree"
            onChange={this.handleOnChange}
            className="guess-num-input guess-num-input-3"
            maxLength="2"
          />
          <Form.Control
            disabled={roundFinished}
            value={numFour}
            style={this.numBorderStyle("numFour")}
            name="numFour"
            onChange={this.handleOnChange}
            className="guess-num-input guess-num-input-4"
            maxLength="2"
          />
        </div>

        <Button
          disabled={this.checkEmptyFields() && !roundFinished}
          variant="primary"
          type="submit"
          className="submit-guess-btn"
        >
          {buttonValue}
        </Button>
      </Form>
    );
  }
}

export default GussingForm;
