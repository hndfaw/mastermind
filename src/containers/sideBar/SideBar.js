import React, { Component } from 'react';
import './SideBar.js';
import logo from '../../assets/images/mastermind-logo.png';
import Button from 'react-bootstrap/Button';


class SideBar extends Component {
  
  render() {
    const {currentGuesses, round, successfulRounds} = this.props;

    return (
      <div className="app-sidebar">
            <img src={logo} className="logo" alt="logo"/>
            <div>
                <p>Guess Balance: <span>{10 - currentGuesses.length}</span></p>
                <p>Round Number: <span>{round}</span></p>
                <p>Successful Rounds: <span>{successfulRounds}</span></p>
                <p>Difficulity Level: <span>{this.props.getDifficultyLevel()}</span></p>
            </div>
                <Button variant="light" className="settings-btn" onClick={() => this.props.updateOpenSettings(true)}>settings</Button>
            
        </div>
    )
  }
}

export default SideBar;
