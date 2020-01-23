import React, { Component } from "react";
import "./App.css";
import { fetchCode } from "../../api/apiCalls";
import GuessingForm from "../guessingForm/GuessingForm";
import ShowGuesses from "../showGuesses/ShowGuesses";
import CodeKeeper from "../codeKeeper/CodeKeeper";
import Settings from "../settings/Settings";
import SideBar from "../sideBar/SideBar";

class App extends Component {
  state = {
	code: [],
	currentGuesses: [],
	round: 1,
	successfulRounds: 0,
	roundFinished: false,
	difficalityLevel: 7,
	openSettings: false,
	feedbackRespnse: "single"
  };

  componentDidMount() {
	let { difficalityLevel } = this.state;
	this.generateNewCode(difficalityLevel);
  }

  generateNewCode = level => {
	let newCode = [];
	fetchCode(level)
	  .then(data => data.split(/\r|\n/))
	  .then(data => data.map(d => d !== "" && newCode.push(parseInt(d))))
	  .then(() => this.setState({ code: newCode }));
  };

  submitAGuess = guess => {
	let updatedAllGuesses = this.state.currentGuesses;
	if (updatedAllGuesses.length < 10) {
	  this.analyzingCode(guess);
	}

	if (updatedAllGuesses.length === 10) {
	  this.endOfRound();
	}
  };

  analyzingCode = guess => {
	const { code } = this.state;
	let analyzedGuess = {
	  correctNumbers: 0,
	  correctLocations: 0,
	  feedbackNum: 0
	};

	let direction1 = code.filter(codeNum => guess.includes(codeNum)).length;

	let direction2 = guess.filter(guessNum => code.includes(guessNum)).length;

	analyzedGuess.correctLocations = guess.filter(
	  (guessedNum, i) => guessedNum === code[i]
	).length;

	analyzedGuess.correctNumbers = Math.min(direction1, direction2);

	let CN = analyzedGuess.correctNumbers;
	let CL = analyzedGuess.correctLocations;

	if (CN === 0 && CL === 0) {
	  analyzedGuess.feedbackNum = 0;
	} else if (CN === 1 && CL === 0) {
	  analyzedGuess.feedbackNum = 1;
	} else if (CN === 1 && CL === 1) {
	  analyzedGuess.feedbackNum = 2;
	} else if (CN > 1 && CL !== 4) {
	  analyzedGuess.feedbackNum = 3;
	} else if (CN === 4 && CL === 4) {
	  analyzedGuess.feedbackNum = 4;

	  this.endOfRound("success");
	}

	let updatedGuess = {
	  guess,
	  analyzedGuess
	};

	let getCurrentGuesses = this.state.currentGuesses;
	getCurrentGuesses.push(updatedGuess);

	this.setState({ currentGuesses: getCurrentGuesses });

	console.log(this.state.code);
  };

  endOfRound = result => {
	this.setState({ roundFinished: true });
	if (result === "success") {
	  let updateSuccessfulRounds = this.state.successfulRounds;
	  this.setState({ successfulRounds: updateSuccessfulRounds + 1 });
	}
  };

  restartRound = () => {
	let numOfRounds = this.state.round;
	let { difficalityLevel } = this.state;
	this.setState({
	  currentGuesses: [],
	  roundFinished: false,
	  round: numOfRounds + 1
	});
	this.generateNewCode(difficalityLevel);
  };

  getDifficultyLevel = () => {
	const { difficalityLevel } = this.state;
	const diffLev = {
	  7: "Eeasy",
	  14: "Medium",
	  28: "Hard",
	  56: "Harder"
	};
	return `${diffLev[difficalityLevel]} (0 - ${difficalityLevel})`;
  };

  updateDifficultyLevel = level => {
	this.setState({ difficalityLevel: level });
	this.generateNewCode(level);
  };

  updateOpenSettings = boolean => {
	this.setState({ openSettings: boolean });
  };

  updateFeedbackRespnse = feedbackType => {
	this.setState({ feedbackRespnse: feedbackType });
  };

  restart = type => {
	let { difficalityLevel } = this.state;
	this.generateNewCode(difficalityLevel);
	this.setState({ currentGuesses: [], roundFinished: false });

	if (type === "Game") {
	  this.setState({ round: 1, successfulRounds: 0 });
	}
  };

  render() {
	const {
	  roundFinished,
	  code,
	  currentGuesses,
	  round,
	  successfulRounds,
	  openSettings,
	  difficalityLevel,
	  feedbackRespnse
	} = this.state;

	const lastFeedback =
	  currentGuesses.length !== 0
		? currentGuesses[currentGuesses.length - 1].analyzedGuess
		: "";

	let feedbackResponse = {
	  0: "Your guess was incorrect",
	  1: "You had a correct number",
	  2: "You had guessed a correct number and its correct location",
	  3: `You had ${lastFeedback.correctNumbers} correct numbers and ${lastFeedback.correctLocations} crrect location/s`,
	  4: "You found the CORRECT code!"
	};

	const guess = this.state.currentGuesses.map((g, i) => (
	  <ShowGuesses
		guess={g.guess}
		key={i}
		feedback={g.analyzedGuess}
		feedbackRespnse={feedbackRespnse}
	  />
	));

	return (
	  <div className="app">
		<SideBar
		  currentGuesses={currentGuesses}
		  round={round}
		  successfulRounds={successfulRounds}
		  getDifficultyLevel={this.getDifficultyLevel}
		  updateOpenSettings={this.updateOpenSettings}
		/>
		<div className="game-container">
		  <div className="game">
			<CodeKeeper roundFinished={roundFinished} code={code} />
			<div className="guesses-container">{guess}</div>
			{feedbackRespnse === "single" && (
			  <p className="single-feedback">
				{feedbackResponse[lastFeedback.feedbackNum]}
			  </p>
			)}
			<GuessingForm
			  submitAGuess={this.submitAGuess}
			  roundFinished={roundFinished}
			  restartRound={this.restartRound}
			/>
		  </div>
		</div>
		<div className="app-sidebar-right"></div>
		<Settings
		  updateDifficultyLevel={this.updateDifficultyLevel}
		  difficalityLevel={difficalityLevel}
		  currentGuesses={currentGuesses}
		  openSettings={openSettings}
		  updateOpenSettings={this.updateOpenSettings}
		  updateFeedbackRespnse={this.updateFeedbackRespnse}
		  feedbackRespnse={feedbackRespnse}
		  restart={this.restart}
		  round={round}
		/>
	  </div>
	);
  }
}

export default App;
