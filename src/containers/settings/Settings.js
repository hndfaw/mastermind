import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './Settings.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


 class Settings extends Component {

  
  handleChangeDifficulty = value => {
    const { updateDifficultyLevel } = this.props;
    updateDifficultyLevel(value)
  }

  render() {
    const { difficalityLevel, currentGuesses, openSettings } = this.props;


    console.log('heyy', currentGuesses.length !== 0)
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
                <Modal.Body>

      
      <div>
        <h6>Game Difficulity Level</h6>
        <ToggleButtonGroup type="radio" name="options" defaultValue={difficalityLevel} size="sm" onChange={this.handleChangeDifficulty} >
            <ToggleButton disabled={currentGuesses.length !== 0} value={7}>Eassy (0 - 7)</ToggleButton>
            <ToggleButton disabled={currentGuesses.length !== 0} value={14}>Medium (0 - 14)</ToggleButton>
            <ToggleButton disabled={currentGuesses.length !== 0} value={28}>Hard (0 - 28)</ToggleButton>
            <ToggleButton disabled={currentGuesses.length !== 0} value={56}>Harder (0 - 56)</ToggleButton>
        </ToggleButtonGroup>
        {currentGuesses.length !== 0 && <p className="difficulity-level-note">You already started this round; you can not change the level of difficulty during the match. Once you finished this round, you can change this setting.</p>}
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
