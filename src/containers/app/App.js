import React, { Component } from "react";
import "./App.css";
import { fetchCode } from "../../api/apiCalls";
import GuessingForm from "../guessingForm/GuessingForm";
import Guess from "../guess/Guess";
import CodeKeeper from "../codeKeeper/CodeKeeper";
import Settings from "../settings/Settings";
import SideBar from "../sideBar/SideBar";
import { Route, Switch, NavLink } from "react-router-dom";
import WelcomePage from "../../component/welcomePage/WelcomePage";
import Instruction from "../../component/instruction/Instruction";
import EndOfRoundMsg from '../../component/endOfRoundMsg/EndOfRoundMsg';

class App extends Component {
  state = {
    code: [],
    uniqueCodeNums: [],
    nonExistingNums: [],
    currentGuesses: [],
    round: 1,
    successfulRounds: 0,
    roundFinished: false,
    difficultyLevel: 7,
    openSettings: false,
    feedbackRespnse: "all",
    points: 0,
    currentRoundPoints: 0,
    hints: [],
    hintIsReady: false,
    hintsBalance: 3,
    openEndOfRoundMsg: false
  };

  componentDidMount() {
    let { difficultyLevel } = this.state;
    this.generateNewCode(difficultyLevel);
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
    const { difficultyLevel, code } = this.state;
    const uniqueCodeNums = code.filter((codeNum, index, self) => {
      return index === self.indexOf(codeNum);
    });
    let emptyArray = Array(difficultyLevel + 1).fill(0);
    const nonExistingNums = [];
    emptyArray.forEach((zero, i) => {
      if (!uniqueCodeNums.includes(i)) {
        nonExistingNums.push(i);
      }
    });

    this.setState({ nonExistingNums, uniqueCodeNums });
    this.generateHints(nonExistingNums, uniqueCodeNums);
  };

  generateHints = (nonExistingNums, uniqueCodeNums) => {
    const { difficultyLevel } = this.state;
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

    maxCodeNum !== difficultyLevel &&
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

    if ( updatedAllGuesses.length === 10) {

      if (lastGuessAnalyze.correctNumbers < 4 ||
        lastGuessAnalyze.correctLocations < 4) {
          this.endOfRound();
        }
    }

    const { currentGuesses, hintsBalance } = this.state;

    if (currentGuesses.length >= 2 && hintsBalance > 0) {
      this.updateHintReady("auto");
    }
  };

  updateHintReady = type => {
    const { hintIsReady, hintsBalance } = this.state;
    if (type === "auto") {
      this.setState({ hintIsReady: true });
    } else if (type !== "auto" && hintIsReady) {
      this.setState({ hintIsReady: false });
      this.setState({ hintsBalance: hintsBalance - 1 });
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

    analyzedGuess.correctNumbers = this.getCorrectNumbers(code, guess);

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

  getCorrectNumbers = (code, guess) => {
    const copyCode = code.map(codeNumber => codeNumber)

     guess.forEach(guessNumber => {
      copyCode.forEach((codeNumber, i) => {
        if(guessNumber === codeNumber) {
          copyCode.splice(i, 1)
        }
      })
    })
  
    return  4 - copyCode.length;
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
      1: "You had one correct number in wrong location",
      2: "You had guessed a correct number and its correct location",
      3: `You had ${correctNumbers} correct numbers and ${correctLocations} correct location/s`,
      4: "You found the CORRECT code!"
    };
    return feedbackResponse[feedbackNum];
  };

  calculatePoints = () => {
    const { points, currentGuesses } = this.state;
    let guessBalance = 10 - currentGuesses.length;
    let updatedPoints = points + guessBalance * 10;
    this.setState({ points: updatedPoints, currentRoundPoints:  guessBalance * 10});
  };

  getDifficultyLevel = () => {
    const { difficultyLevel } = this.state;
    const diffLev = {
      7: "Easy",
      14: "Medium",
      28: "Hard",
      56: "Harder"
    };
    return `${diffLev[difficultyLevel]} (0 - ${difficultyLevel})`;
  };

  updateDifficultyLevel = level => {
    this.setState({ difficultyLevel: level });
    this.generateNewCode(level);
  };

  updateOpenSettings = boolean => {
    this.setState({ openSettings: boolean });
  };

  updateOpenEndOfRoundMsg = type => {
    this.setState({ openEndOfRoundMsg:  type});
  };

  updateFeedbackRespnse = feedbackType => {
    this.setState({ feedbackRespnse: feedbackType });
  };

  endOfRound = result => {
    this.calculatePoints();
    this.setState({ roundFinished: true, openEndOfRoundMsg: true, hintIsReady: false, hintsBalance: 0 });
    if (result === "success") {
      let updateSuccessfulRounds = this.state.successfulRounds;
      this.setState({
        successfulRounds: updateSuccessfulRounds + 1,
        hintsBalance: 0,
        hintIsReady: false,
      });
    }
  };

  restart = type => {
    // type 'Game to restart whole game
    // type Round to restart round manually
    // roundFinished to restart round and incrementing rounds number

    let numOfRounds = this.state.round;

    let { difficultyLevel } = this.state;
    this.generateNewCode(difficultyLevel);

    this.setState({
      currentGuesses: [],
      roundFinished: false,
      hintsBalance: 3
    });

    if (type === "Game") {
      this.setState({ round: 1, successfulRounds: 0, points: 0 });
    }

    if (type === "Round-Finished") {
      this.setState({
        round: numOfRounds + 1,
        hintIsReady: false
      });
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
      difficultyLevel,
      feedbackRespnse,
      points,
      nonExistingNums,
      uniqueCodeNums,
      hints,
      hintIsReady,
      hintsBalance,
      openEndOfRoundMsg,
      currentRoundPoints
    } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <WelcomePage />} />

          <Route
            exact
            path="/game"
            render={() => (
              <div className="home-page">
                <SideBar
                  currentGuesses={currentGuesses}
                  round={round}
                  successfulRounds={successfulRounds}
                  getDifficultyLevel={this.getDifficultyLevel}
                  updateOpenSettings={this.updateOpenSettings}
                  points={points}
                  roundFinished={roundFinished}
                  code={code}
                  difficultyLevel={difficultyLevel}
                  nonExistingNums={nonExistingNums}
                  uniqueCodeNums={uniqueCodeNums}
                  hints={hints}
                  hintIsReady={hintIsReady}
                  updateHintReady={this.updateHintReady}
                  hintsBalance={hintsBalance}
                />
                <div className="game">
                  <CodeKeeper
                    roundFinished={roundFinished}
                    code={code}
                    currentGuesses={currentGuesses}
                    openEndOfRoundMsg={openEndOfRoundMsg}
                  />

                  <div className="guesses-container" ref={this._element}>
                    {this.returnGuess()}
                  </div>
                  <GuessingForm
                    submitAGuess={this.submitAGuess}
                    roundFinished={roundFinished}
                    restart={this.restart}
                    returnLastAnalayzedGuess={this.returnLastAnalayzedGuess}
                    feedbackRespnse={feedbackRespnse}
                    currentGuesses={currentGuesses}
                  />
                </div>
                <Settings
                  updateDifficultyLevel={this.updateDifficultyLevel}
                  difficultyLevel={difficultyLevel}
                  currentGuesses={currentGuesses}
                  openSettings={openSettings}
                  updateOpenSettings={this.updateOpenSettings}
                  updateFeedbackRespnse={this.updateFeedbackRespnse}
                  feedbackRespnse={feedbackRespnse}
                  restart={this.restart}
                  round={round}
                />
                <EndOfRoundMsg
                openEndOfRoundMsg={openEndOfRoundMsg}
                updateOpenEndOfRoundMsg={this.updateOpenEndOfRoundMsg}
                returnLastAnalayzedGuess={this.returnLastAnalayzedGuess}
                code={code}
                currentRoundPoints={currentRoundPoints}
                points={points}
                />
              </div>
            )}
          />

          <Route exact path="/instructions" render={() => <Instruction />} />

          <Route
            render={() => (
              <div className="page-404">
                <p className="page-not-exist">
                  The page you’re looking for can’t be found.
                </p>
                <NavLink to="/game" className="back-to-game">
                  {" "}
                  Back to the Game page
                </NavLink>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
