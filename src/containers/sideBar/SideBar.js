import React, { Component } from "react";
import "./SideBar.css";
import logo from "../../assets/images/mastermind-logo.png";
import Button from "react-bootstrap/Button";
import SuccessfulRoundsWidget from "../../component/successfulRoundsWidget/SuccessfulRoundsWidget";


class SideBar extends Component {
  render() {
    const { round, successfulRounds, points, roundFinished } = this.props;

    return (
      <section className="app-sidebar">
        <img src={logo} className="logo" alt="logo" />
        <div>
          <div className="circle-widget-container">
            <article className="sidebar-widget-circle">
              <p className="sidebar-widget-circle-num">{round}</p>
              <p className="sidebar-widget-circle-label">ROUND</p>
            </article>
            <article className="sidebar-widget-circle">
              <p className="sidebar-widget-circle-num">{points}</p>
              <p className="sidebar-widget-circle-label">POINTS</p>
            </article>
          </div>
          <SuccessfulRoundsWidget
            successfulRounds={successfulRounds}
			round={round}
			roundFinished={roundFinished}
          />
          <article className="sidebar-difficulty-level">
            <p>
              Difficulty Level: <span>{this.props.getDifficultyLevel()}</span>
            </p>
          </article>
        </div>
        <Button
          variant="light"
          className="settings-btn"
          onClick={() => this.props.updateOpenSettings(true)}
        >
          settings
        </Button>
      </section>
    );
  }
}

export default SideBar;
