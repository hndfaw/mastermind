import React, { Component } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "./Settings.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Settings extends Component {
  state = {
    restartWindowOpen: false,
    restartType: ""
  };

  handleChangeDifficulty = value => {
    this.props.updateDifficultyLevel(value);
  };

  handleChangeFeedbackType = feedbackType => {
    this.props.updateFeedbackRespnse(feedbackType);
  };

  handleRestart = (closeOpen, type) => {
    this.setState({ restartWindowOpen: closeOpen, restartType: type });
  };

  restartHeaderStyle = () => {
    const { restartType } = this.state;

    return restartType === "Game"
      ? {
          backgroundColor: "#DC3545",
          color: "#fff"
        }
      : {
          backgroundColor: "#FFC108",
          color: "#000"
        };
  };

  render() {
    const {
      difficultyLevel,
      currentGuesses,
      openSettings,
      feedbackRespnse,
      round
    } = this.props;
    const { restartWindowOpen, restartType } = this.state;

    return (
      <div>
        <Modal
          size="md"
          show={openSettings}
          onHide={() => this.props.updateOpenSettings(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          animation={false}
        >
          <Modal.Header className="settings-header">
            <Modal.Title>Game Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body className="settings-modal-body">
            <div>
              <h6 className="settings-title">Game Difficulty Level</h6>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={difficultyLevel}
                size="sm"
                onChange={this.handleChangeDifficulty}
              >
                <ToggleButton disabled={currentGuesses.length !== 0} value={7}>
                  Easy (0 - 7)
                </ToggleButton>
                <ToggleButton disabled={currentGuesses.length !== 0} value={14}>
                  Medium (0 - 14)
                </ToggleButton>
                <ToggleButton disabled={currentGuesses.length !== 0} value={28}>
                  Hard (0 - 28)
                </ToggleButton>
                <ToggleButton disabled={currentGuesses.length !== 0} value={56}>
                  Harder (0 - 56)
                </ToggleButton>
              </ToggleButtonGroup>
              {currentGuesses.length !== 0 ? (
                <p className="settings-note">
                  You already started this round; you can not change the level
                  of difficulty during the match. Once you finished this round,
                  you can change this setting.
                </p>
              ) : (
                <p className="settings-note">
                  This setting will change the difficulty of the game. For the
                  easy game, you will need to guess the numbers between 0 to 7,
                  the medium will be between 0 to 14, hard will be between 0 to
                  28, and harder will be between 0 to 56.
                </p>
              )}
            </div>
            <div>
              <h6 className="settings-title">Showing Feedback</h6>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={feedbackRespnse}
                size="sm"
                onChange={this.handleChangeFeedbackType}
              >
                <ToggleButton value={"single"}>Only Last Response</ToggleButton>
                <ToggleButton value={"all"}>All Responses</ToggleButton>
              </ToggleButtonGroup>
              {feedbackRespnse === "single" ? (
                <p className="settings-note">
                  This setting will only show the feedback of your last guess.
                </p>
              ) : (
                <p className="settings-note">
                  This setting will show all the feedbacks on all your guesses..
                </p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={round === 1 && currentGuesses.length === 0}
              variant="warning"
              onClick={() => {
                this.props.updateOpenSettings(false);
                this.handleRestart(true, "Round");
              }}
            >
              Restart Round
            </Button>
            <Button
              disabled={round === 1 && currentGuesses.length === 0}
              variant="danger"
              onClick={() => {
                this.props.updateOpenSettings(false);
                this.handleRestart(true, "Game");
              }}
            >
              Restart Game
            </Button>
            <Button
              variant="dark"
              onClick={() => this.props.updateOpenSettings(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="md"
          show={restartWindowOpen}
          onHide={() => this.handleRestart(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          animation={false}
        >
          <Modal.Header
            style={this.restartHeaderStyle()}
            className="restart-header"
          >
            <Modal.Title>Restarting {restartType}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="settings-modal-body-restart">
            Are you sure you want to restart this {restartType}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.props.restart(restartType);
                this.handleRestart(false);
              }}
              variant={restartType === "Round" ? "warning" : "danger"}
            >
              Yes, Restart {restartType}
            </Button>
            <Button variant="dark" onClick={() => this.handleRestart(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Settings;
