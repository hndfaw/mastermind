import React, { Component } from "react";
import "./App.css";
import { fetchCode } from "../../api/apiCalls";
import GuessingForm from "../guessingForm/GuessingForm";
import Guess from "../guess/Guess";
import CodeKeeper from "../codeKeeper/CodeKeeper";
import Settings from "../settings/Settings";
import SideBar from "../sideBar/SideBar";

class App extends Component {
  state = {
	code: [],
	uniqueCodeNums: [],
    nonExistingNums: [],
    currentGuesses: [],
    round: 1,
    successfulRounds: 0,
    roundFinished: false,
    difficalityLevel: 7,
    openSettings: false,
    feedbackRespnse: "all",
    points: 0,
	guessContainerHeight: 0,
	hints: []
  };

  _element = React.createRef();

  componentDidMount() {
    let { difficalityLevel } = this.state;
    this.generateNewCode(difficalityLevel);
    this.setState({ guessContainerHeight: this._element.current.clientHeight });
  }

  generateNewCode = level => {
    let newCode = [];
    fetchCode(level)
      .then(data => data.split(/\r|\n/))
      .then(data => data.map(d => d !== "" && newCode.push(parseInt(d))))
      .then(() => this.setState({ code: newCode }))
      .then(() => this.findNonExistingNumbers());
  };

  findNonExistingNumbers = () => {
    const { difficalityLevel, code } = this.state;
    const uniqueCodeNums = code.filter((codeNum, index, self) => {
      return index === self.indexOf(codeNum);
    });
    let emptyArray = Array(difficalityLevel + 1).fill(0);
    const nonExistingNums = [];
    emptyArray.forEach((zero, i) => {
      if (!uniqueCodeNums.includes(i)) {
        nonExistingNums.push(i);
      }
    });

	// this.setState({ nonExistingNums, uniqueCodeNums });
	this.generateHints(nonExistingNums, uniqueCodeNums)
  };

  generateHints = (nonExistingNums, uniqueCodeNums) => {
    const { difficalityLevel } = this.props;
    let hints = [];
    uniqueCodeNums.forEach(codeNum => {
      hints.push(`Number ${codeNum} exsit in the combination of the code!`);
    });

    nonExistingNums.forEach(num => {
      hints.push(
        `Number ${num} does NOT exsit in the combination of the code!`
      );
    });

    if (uniqueCodeNums.length === 4) {
      hints.push("There are no duplicate numbers!");
    } else {
      hints.push("There is at least one duplicate number");
    }

    if (uniqueCodeNums.length <= 2) {
      hints.push(
        `I don/'t know how to tell you this! too many similar numbers are there!`
      );
    }

    if (uniqueCodeNums.length === 1) {
      hints.push(
        `Ok here is the best hint ever! all the numbers are similar! Good Luck!!`
      );
    }

    let maxCodeNum = Math.max(...uniqueCodeNums);
    let minCodeNum = Math.min(...uniqueCodeNums);
    maxCodeNum !== difficalityLevel &&
      hints.push(`All the numbers are less than ${maxCodeNum + 1}`);
    minCodeNum !== 0 &&
      hints.push(`All the numbers are greater than ${minCodeNum - 1}`);

        this.setState({ hints });

  };

  submitAGuess = guess => {
    let updatedAllGuesses = this.state.currentGuesses;
    if (updatedAllGuesses.length < 10) {
      this.analyzingCode(guess);
    }

    let lastGuessAnalyze = this.returnLastAnalayzedGuess();

    if (
      updatedAllGuesses.length === 10 &&
      lastGuessAnalyze.correctNumbers < 4 &&
      lastGuessAnalyze.correctLocations < 4
    ) {
      this.endOfRound();
    }
  };

  analyzingCode = guess => {
    const { code } = this.state;

    let analyzedGuess = {
      correctNumbers: 0,
      correctLocations: 0,
      feedbackNum: 0,
      feedback: ""
    };

    let direction1 = this.getCorrectNumbers(code, guess, "codeToGuess");
    let direction2 = this.getCorrectNumbers(code, guess, "guessToCode");

    analyzedGuess.correctNumbers = Math.min(direction1, direction2);

    analyzedGuess.correctLocations = guess.filter(
      (guessedNum, i) => guessedNum === code[i]
    ).length;

    let CN = analyzedGuess.correctNumbers;
    let CL = analyzedGuess.correctLocations;

    analyzedGuess.feedbackNum = this.getFeedbackNumber(CN, CL);

    analyzedGuess.feedback = this.convertFeedbackNumberToFeedback(
      analyzedGuess
    );

    let updatedGuess = {
      guess,
      analyzedGuess
    };

    let getCurrentGuesses = this.state.currentGuesses;
    getCurrentGuesses.push(updatedGuess);
    this.setState({ currentGuesses: getCurrentGuesses });
  };

  getCorrectNumbers = (code, guess, direction) => {
    let first, second;
    if (direction === "codeToGuess") {
      first = code;
      second = guess;
    } else {
      first = guess;
      second = code;
    }
    return first.filter(num => second.includes(num)).length;
  };

  getFeedbackNumber = (correctNumbers, correctLocations) => {
    let feedbackNum;

    if (correctNumbers === 0 && correctLocations === 0) {
      feedbackNum = 0;
    } else if (correctNumbers === 1 && correctLocations === 0) {
      feedbackNum = 1;
    } else if (correctNumbers === 1 && correctLocations === 1) {
      feedbackNum = 2;
    } else if (correctNumbers > 1 && correctLocations !== 4) {
      feedbackNum = 3;
    } else if (correctNumbers === 4 && correctLocations === 4) {
      feedbackNum = 4;

      this.endOfRound("success");
    }

    return feedbackNum;
  };

  convertFeedbackNumberToFeedback = guess => {
    let { correctNumbers, correctLocations, feedbackNum } = guess;
    let feedbackResponse = {
      0: "Your guess was incorrect",
      1: "You had a correct number",
      2: "You had guessed a correct number and its correct location",
      3: `You had ${correctNumbers} correct numbers and ${correctLocations} correct location/s`,
      4: "You found the CORRECT code!"
    };
    return feedbackResponse[feedbackNum];
  };

  endOfRound = result => {
    this.calculatePoints();
    this.setState({ roundFinished: true });
    if (result === "success") {
      let updateSuccessfulRounds = this.state.successfulRounds;
      this.setState({ successfulRounds: updateSuccessfulRounds + 1 });
    }
  };

  calculatePoints = () => {
    const { points, currentGuesses } = this.state;
    let guessBalance = 10 - currentGuesses.length;
    let updatedPoints = points + guessBalance * 10;
    this.setState({ points: updatedPoints });
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
      7: "Easy",
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
      this.setState({ round: 1, successfulRounds: 0, points: 0 });
    }
  };

  returnLastAnalayzedGuess = () => {
    const { currentGuesses } = this.state;
    const lastAnalyzedGuess =
      currentGuesses.length !== 0
        ? currentGuesses[currentGuesses.length - 1].analyzedGuess
        : "";
    return lastAnalyzedGuess;
  };

  returnGuess = () => {
    const {
      feedbackRespnse,
      currentGuesses,
      guessContainerHeight
    } = this.state;

    const guess = this.state.currentGuesses.map((g, i) => {
      return (
        <Guess
          guess={g.guess}
          key={i}
          feedback={g.analyzedGuess}
          feedbackRespnse={feedbackRespnse}
          index={i}
          currentGuesses={currentGuesses}
          guessContainerHeight={guessContainerHeight}
        />
      );
    });

    return guess;
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
      feedbackRespnse,
      points,
	  nonExistingNums,
	  uniqueCodeNums
    } = this.state;

    return (
      <div className="app">
        <SideBar
          currentGuesses={currentGuesses}
          round={round}
          successfulRounds={successfulRounds}
          getDifficultyLevel={this.getDifficultyLevel}
          updateOpenSettings={this.updateOpenSettings}
          points={points}
          roundFinished={roundFinished}
          code={code}
          difficalityLevel={difficalityLevel}
		  nonExistingNums={nonExistingNums}
		  uniqueCodeNums={uniqueCodeNums}
        />
        <div className="game">
          <CodeKeeper
            roundFinished={roundFinished}
            code={code}
            currentGuesses={currentGuesses}
          />

          <div className="guesses-container" ref={this._element}>
            {this.returnGuess()}
          </div>
          <GuessingForm
            submitAGuess={this.submitAGuess}
            roundFinished={roundFinished}
            restartRound={this.restartRound}
            returnLastAnalayzedGuess={this.returnLastAnalayzedGuess}
            feedbackRespnse={feedbackRespnse}
            currentGuesses={currentGuesses}
          />
        </div>
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
