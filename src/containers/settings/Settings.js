import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './Settings.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


 class Settings extends Component {

  
  handleChangeDifficulty = value => {
    this.props.updateDifficultyLevel(value)
  }

  handleChangeFeedbackType = feedbackType => {
    this.props.updateFeedbackRespnse(feedbackType)
  }

  render() {
    const { difficalityLevel, currentGuesses, openSettings, feedbackRespnse } = this.props;

    return (

      <Modal
        size="md"
        show={openSettings}
        onHide={() => this.props.updateOpenSettings(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header >
            <Modal.Title>Game Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="settings-modal-body">
        <div>
          <h6 className="settings-header">Game Difficulity Level</h6>
          <ToggleButtonGroup type="radio" name="options" defaultValue={difficalityLevel} size="sm" onChange={this.handleChangeDifficulty} >
              <ToggleButton disabled={currentGuesses.length !== 0} value={7}>
                Eassy (0 - 7)
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
          {currentGuesses.length !== 0 && <p className="settings-note">You already started this round; you can not change the level of difficulty during the match. Once you finished this round, you can change this setting.</p>}
        </div>

        <div>
          <h6 className="settings-header">Showing Feedback</h6>
            <ToggleButtonGroup type="radio" name="options" defaultValue={feedbackRespnse} size="sm" onChange={this.handleChangeFeedbackType} >
                <ToggleButton value={'single'}>
                  Only Last Response
                </ToggleButton>
                <ToggleButton value={'all'}>
                  All Responses
                </ToggleButton>
            </ToggleButtonGroup>
            {feedbackRespnse === 'single' ? <p className="settings-note">This setting will only show the feedback of your last guess.</p> : <p className="settings-note">This setting will show all the feedbacks on all your guesses..</p>}
        </div>

        </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.updateOpenSettings(false)}>Close</Button>
            <Button variant="warning">Restart Round</Button>
            <Button variant="danger">Restart Game</Button>
            </Modal.Footer>
        </Modal>
    )
  }
}

export default Settings;
