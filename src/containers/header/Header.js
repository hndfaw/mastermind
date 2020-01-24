import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/images/mastermind-logo.png";
import Button from "react-bootstrap/Button";


class Header extends Component {
  render() {
    const { round, successfulRounds, points } = this.props;

    return (
      <section className="app-header">
        <div className="app-header-logo-setting-cont">
          <img src={logo} className="logo" alt="logo" />

          <Button
            variant="light"
            className="settings-btn"
            onClick={() => this.props.updateOpenSettings(true)}
           >
           Settings
          </Button>

        </div>
        <div className="header-info-container">
            <p className="">ROUND: {round}</p>
            <p className="">POINTS: {points}</p>
            <p className="">SUCCESSFUL ROUNDS: {successfulRounds}</p>
        </div>
          <article className="header-difficulty-level">
            <p>
              Difficulty Level: <span>{this.props.getDifficultyLevel()}</span>
            </p>
          </article>
        
      </section>
    );
  }
}

export default Header;
