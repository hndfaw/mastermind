import React, { Component } from "react";
import "./WelcomePage.css";
import redLogo from "../../assets/images/mastermind-logo.png";
import { NavLink } from "react-router-dom";

class WelcomePage extends Component {
  render() {
    return (
      <section className="welcome-page">
        <div className="welcome-page-header">
          <h2 className="welcome-header">Welcome to</h2>
          <img className="welcome-red-logo" src={redLogo} alt="logo" />
        </div>
        <p className="welcome-body">
          Is this your first time here? Do you need some instruction to learn
          the rules of the game? If so, click on "Instructions" button,
          otherwise, click on the "Start Game" button to start the game! Have
          fun!
        </p>
        <p className="welcome-page-small-screen-msg">
        Mastermind is built for the devices with a bigger screen like <span className="bold-font">laptops</span>. You are currently using a smaller screen please switch to a <span className="bold-font">computer</span>.
        </p>

        <div className="welcome-page-btns-container">
          <NavLink to="/game" className="welcome-btn welcome-btn-game">
            Start Game
          </NavLink>
          <NavLink
            to="/instructions"
            className="welcome-btn welcome-btn-instructions"
          >
            Instructions
          </NavLink>
        </div>
      </section>
    );
  }
}

export default WelcomePage;
