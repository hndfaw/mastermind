import React, { Component } from "react";
import "./SideBar.css";
import logo from "../../assets/images/mastermind-logo-3.png";
import Button from "react-bootstrap/Button";
import Hint from "../hint/Hint";
import { NavLink } from 'react-router-dom';


class SideBar extends Component {
  render() {
    const {
      round,
      successfulRounds,
      points,
      difficultyLevel,
      code,
      currentGuesses,
      nonExistingNums,
      uniqueCodeNums,
      hints,
      hintIsReady,
      updateHintReady,
      hintsBalance
    } = this.props;

    return (
      <section className="app-side-bar">
        <img src={logo} className="logo" alt="logo" />
        <p className="x">Hozan, awa Hindreen drusti krdya!</p>
        <div className="side-bar-info-container">
          <p className="">Round: {round}</p>
          <p className="">Points: {points}</p>
          <p className="">Successful Rounds: {successfulRounds}</p>
          <p>
            Difficulty Level: <span>{this.props.getDifficultyLevel()}</span>
          </p>
        </div>
        <Hint
          difficultyLevel={difficultyLevel}
          code={code}
          currentGuesses={currentGuesses}
          nonExistingNums={nonExistingNums}
          uniqueCodeNums={uniqueCodeNums}
          hints={hints}
          hintIsReady={hintIsReady}
          updateHintReady={updateHintReady}
          hintsBalance={hintsBalance}
        />
        <div className="side-bar-btns-container">
          <Button
            variant="dark"
            className="settings-btn"
            onClick={() => this.props.updateOpenSettings(true)}
          >
            Settings
          </Button>
          <NavLink to="/instructions" className="side-bar-instructions-link">Instructions</NavLink>
        </div>
      </section>
    );
  }
}

export default SideBar;
