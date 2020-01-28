import React, { Component } from "react";
import "./EndOfRoundMsg.css";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

class EndOfRoundMsg extends Component {

  msgTheme = () => {
    const { returnLastAnalyzedGuess } = this.props;
    const { correctNumbers = 4, correctLocations = 4 } = returnLastAnalyzedGuess();
    if (correctNumbers === 4 && correctLocations === 4) {
      return {
        background: "#007BFF",
        color: "#fff"
      };
    } else {
      return {
        background: "#9da3ad",
        color: "rgb(64, 64, 64)"
    };
    }
  };

  render() {
    const { openEndOfRoundMsg, returnLastAnalyzedGuess, code, currentRoundPoints, points } = this.props;
    const { correctNumbers, correctLocations } = returnLastAnalyzedGuess();

    return (
      <div>
        <Modal
          size="md"
          show={openEndOfRoundMsg}
          onHide={() => this.props.updateOpenEndOfRoundMsg(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="end-of-round-msg-modal"
        >
          <Modal.Header className="end-of-round-msg-modal-header" style={this.msgTheme()}>
            <Modal.Title>Round Over!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="end-of-round-msg-modal-body">
            {correctNumbers === 4 && correctLocations === 4 ? (
              <h3 className="end-of-round-msg-title">
                Congratulations! You cracked the code!
              </h3>
            ) : (
              <h3 className="end-of-round-msg-title">
                You couldn't crack the code!
              </h3>
            )}

              <div className="end-of-round-msg-the-code">
                <p
                  style={this.msgTheme()}
                  className="end-of-round-msg-the-code-num"
                >
                  {code[0]}
                </p>
                <p
                  style={this.msgTheme()}
                  className="end-of-round-msg-the-code-num"
                >
                  {code[1]}
                </p>
                <p
                  style={this.msgTheme()}
                  className="end-of-round-msg-the-code-num"
                >
                  {code[2]}
                </p>
                <p
                  style={this.msgTheme()}
                  className="end-of-round-msg-the-code-num"
                >
                  {code[3]}
                </p>
              </div>

              {correctNumbers === 4 && correctLocations === 4 ? (
              <div className="end-of-round-msg-title">
                <p className="end-of-round-msg-points-title">Points Earned</p>
                <p className="end-of-round-msg-points-point">{currentRoundPoints}</p>
                <p className="end-of-round-msg-points-title">Total Points</p>
                <p className="end-of-round-msg-points-point">{points}</p>
                <h3 className="end-of-round-msg-title do-it-again-title">
                Do it again!
              </h3>
              </div>
            ) : (
              <h3 className="end-of-round-msg-title">
                Try again!
              </h3>
            )}

            <Button variant="outline-dark" onClick={() => this.props.updateOpenEndOfRoundMsg(false)}>Close</Button>

              
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EndOfRoundMsg;
