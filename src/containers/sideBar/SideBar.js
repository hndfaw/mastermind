import React, { Component } from "react";
import "./SideBar.css";
import logo from "../../assets/images/mastermind-logo-3.png";
import Button from "react-bootstrap/Button";
import Hint from "../hint/Hint";
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import newTabIcon from '../../assets/images/icons8-external-link-dark.svg'
import newTabIconDarker from '../../assets/images/icons8-external-link-darker.svg'


class SideBar extends Component {
  render() {
	const {
	  code,
	  currentGuesses,
	  difficultyLevel,
	  hintIsReady,
	  hints,
	  hintsBalance,
	  nonExistingNums,
	  points,
	  round,
	  roundFinished,
	  successfulRounds,
	  uniqueCodeNums,
	  updateHintReady,
	} = this.props;

	return (
	  <section className="app-side-bar">
		<img src={logo} className="logo" alt="logo" />
		<div className="side-bar-info-container">
		  <p className="">Round: {round}</p>
		  <p className="">Points: {points}</p>
		  <p className="">Successful Rounds: {successfulRounds}</p>
		  <p>
			Difficulty Level: <span>{this.props.getDifficultyLevel('withLabel')}</span>
		  </p>
		</div>
		<Hint
		  code={code}
		  currentGuesses={currentGuesses}
		  difficultyLevel={difficultyLevel}
		  hintIsReady={hintIsReady}
		  hints={hints}
		  hintsBalance={hintsBalance}
		  nonExistingNums={nonExistingNums}
		  roundFinished={roundFinished}
		  uniqueCodeNums={uniqueCodeNums}
		  updateHintReady={updateHintReady}
		/>
		<div className="side-bar-btns-container">
		<Button
			className="settings-btn"
			onClick={() => this.props.updateOpenSettings(true)}
			variant="dark"
		  >
			Settings
		  </Button>
		  <NavLink to="/instructions" className="side-bar-instructions-link">Instructions</NavLink>

		  <div className="side-bar-instructions-link" >
			  <a href="https://github.com/hndfaw/mastermind" className="side-bar-instructions-inner-link" target="blank" >GitHub</a>
			  <img className="new-tab-icon-single" src={newTabIcon} alt="new tab icon" />
		  </div>

		  <DropdownButton id="dropdown-basic-button" title="Developer" drop={'up'}>
			  <Dropdown.Item className="dropdown-item" target="blank" href="https://www.hindreen.net/">Portfolio <img className="new-tab-icon" src={newTabIconDarker} alt="new tab icon" /></Dropdown.Item>
			  <Dropdown.Item className="dropdown-item"  target="blank" href="https://www.linkedin.com/in/hndfaw/">LinkedIn <img className="new-tab-icon" src={newTabIconDarker} alt="new tab icon" /></Dropdown.Item>
			  <Dropdown.Item className="dropdown-item"  target="blank" href="https://github.com/hndfaw/">GitHub <img className="new-tab-icon" src={newTabIconDarker} alt="new tab icon" /></Dropdown.Item>
		  </DropdownButton>          

		</div>
	  </section>
	);
  }
}

export default SideBar;
