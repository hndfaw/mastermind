import React, { Component } from "react";
import "./App.css";
import { fetchCode } from "../../api/apiCalls";
import GuessingForm from "../guessingForm/GuessingForm";
import Guess from "../../component/guess/Guess";
import CodeKeeper from "../../component/codeKeeper/CodeKeeper";
import Settings from "../settings/Settings";
import SideBar from "../sideBar/SideBar";
import { Route, Switch, NavLink } from "react-router-dom";
import WelcomePage from "../../component/welcomePage/WelcomePage";
import Instruction from "../../component/instruction/Instruction";
import EndOfRoundMsg from "../../component/endOfRoundMsg/EndOfRoundMsg";

class App extends Component {
  state = {
    code: [],
    currentGuesses: [],
    currentRoundPoints: 0,
    difficultyLevel: 7,
    feedbackRespnse: "all",
    hintIsReady: false,
    hints: [],
    hintsBalance: 3,
    nonExistingNums: [],
    openEndOfRoundMsg: false,
    openSettings: false,
    points: 0,
    round: 1,
    roundFinished: false,
    successfulRounds: 0
  };

  componentDidMount() {
    let { difficultyLevel } = this.state;
    this.generateNewCode(difficultyLevel);
  }

  generateNewCode = level => {
    let generatedCode = [];
    fetchCode(level)
      .then(data => data.split(/\r|\n/))
      .then(data => data.map(d => d !== "" && generatedCode.push(parseInt(d))))
      .then(() => this.setState({ code: generatedCode }))
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
      hints.push(`Number ${codeNum} exist in the combination of the code!`);
    });

    nonExistingNums.forEach(num => {
      hints.push(
        `Number ${num} does NOT exist in the combination of the code!`
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

    let lastGuessAnalyze = this.returnLastAnalyzedGuess();

    if (updatedAllGuesses.length === 10) {
      if (
        lastGuessAnalyze.correctNumbers < 4 ||
        lastGuessAnalyze.correctLocations < 4
      ) {
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

  createUniqueObject = combination => {
    return combination.reduce((acc, number) => {
      let total = combination.filter(num => num === number).length;
      acc[number] = total;
      return acc;
    }, {});
  };

  compareCodeAndGuess = (code, guess) => {
    return Object.entries(this.createUniqueObject(guess)).reduce(
      (acc, guessEntry) => {
        Object.entries(this.createUniqueObject(code)).forEach(codeEntry => {
          if (!acc.hasOwnProperty(codeEntry[0])) {
            acc[codeEntry[0]] = codeEntry[1];
          }
        });

        if (acc.hasOwnProperty(guessEntry[0])) {
          acc[guessEntry[0]] = acc[guessEntry[0]] - guessEntry[1];
        }

        return acc;
      },
      {}
    );
  };

  getCorrectNumbers = (code, guess) => {
    const obj = this.compareCodeAndGuess(code, guess);

    let finalNumber = Object.entries(obj)
      .filter(el => el[1] > 0)
      .reduce((total, curr) => {
        total += curr[1];
        return total;
      }, 0);

    return 4 - finalNumber;
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
      2: "You had guessed one correct number and its correct location",
      3: `You had ${correctNumbers} correct numbers and ${correctLocations} correct location/s`,
      4: "You found the CORRECT code!"
    };
    return feedbackResponse[feedbackNum];
  };

  calculatePoints = () => {
    const { points, currentGuesses } = this.state;
    let guessBalance = 10 - currentGuesses.length;
    let updatedPoints = points + guessBalance * 10;
    this.setState({
      points: updatedPoints,
      currentRoundPoints: guessBalance * 10
    });
  };

  getDifficultyLevel = type => {
    // options of type
    // 1. withLabel
    // 2. else >> noLabel
    const { difficultyLevel } = this.state;
    const diffLev = {
      7: "Easy",
      14: "Medium",
      28: "Hard",
      56: "Harder"
    };

    return type === "withLabel"
      ? `${diffLev[difficultyLevel]} (0 - ${difficultyLevel})`
      : diffLev[difficultyLevel];
  };

  updateDifficultyLevel = level => {
    this.setState({ difficultyLevel: level });
    this.generateNewCode(level);
  };

  updateOpenSettings = boolean => {
    this.setState({ openSettings: boolean });
  };

  updateOpenEndOfRoundMsg = type => {
    this.setState({ openEndOfRoundMsg: type });
  };

  updateFeedbackRespnse = feedbackType => {
    this.setState({ feedbackRespnse: feedbackType });
  };

  endOfRound = result => {
    this.calculatePoints();
    this.setState({
      roundFinished: true,
      openEndOfRoundMsg: true,
      hintIsReady: false,
      hintsBalance: 0
    });
    if (result === "success") {
      let updateSuccessfulRounds = this.state.successfulRounds;
      this.setState({
        successfulRounds: updateSuccessfulRounds + 1,
        hintsBalance: 0,
        hintIsReady: false
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

  returnLastAnalyzedGuess = () => {
    const { currentGuesses } = this.state;
    const lastAnalyzedGuess =
      currentGuesses.length !== 0
        ? currentGuesses[currentGuesses.length - 1].analyzedGuess
        : "";
    return lastAnalyzedGuess;
  };

  returnGuess = () => {
    const { feedbackRespnse, currentGuesses, roundFinished, code } = this.state;

    const guess = this.state.currentGuesses.map((g, i) => {
      return (
        <Guess
          guess={g.guess}
          key={i}
          feedback={g.analyzedGuess}
          feedbackRespnse={feedbackRespnse}
          index={i}
          currentGuesses={currentGuesses}
          roundFinished={roundFinished}
          code={code}
        />
      );
    });

    return guess;
  };

  render() {
    const {
      code,
      currentGuesses,
      currentRoundPoints,
      difficultyLevel,
      feedbackRespnse,
      hintIsReady,
      hints,
      hintsBalance,
      nonExistingNums,
      openEndOfRoundMsg,
      openSettings,
      points,
      round,
      roundFinished,
      successfulRounds,
      uniqueCodeNums,
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
                  code={code}
                  currentGuesses={currentGuesses}
                  difficultyLevel={difficultyLevel}
                  getDifficultyLevel={this.getDifficultyLevel}
                  hintIsReady={hintIsReady}
                  hints={hints}
                  hintsBalance={hintsBalance}
                  nonExistingNums={nonExistingNums}
                  points={points}
                  round={round}
                  roundFinished={roundFinished}
                  successfulRounds={successfulRounds}
                  uniqueCodeNums={uniqueCodeNums}
                  updateHintReady={this.updateHintReady}
                  updateOpenSettings={this.updateOpenSettings}
                />
                <div className="game">
                  <CodeKeeper
                    roundFinished={roundFinished}
                    code={code}
                    currentGuesses={currentGuesses}
                    openEndOfRoundMsg={openEndOfRoundMsg}
                  />

                  <div className="guesses-container" ref={this._element}>
                    {currentGuesses.length > 0 ? (
                      this.returnGuess()
                    ) : (
                      <div className="diff-level-note-container">
                        <p className="diff-level-note-text">
                          Difficulty level of this game is
                          <span className="diff-level-note-status">
                            {this.getDifficultyLevel("noLabel")}
                          </span>
                        </p>
                        <p className="diff-level-note-text">
                          The code you need to guess is between
                        </p>
                        <p className="diff-level-note-text">
                          <span className="diff-level-note-num">0</span>and
                          <span className="diff-level-note-num">
                            {difficultyLevel}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <GuessingForm
                    currentGuesses={currentGuesses}
                    difficultyLevel={difficultyLevel}
                    feedbackRespnse={feedbackRespnse}
                    restart={this.restart}
                    returnLastAnalyzedGuess={this.returnLastAnalyzedGuess}
                    roundFinished={roundFinished}
                    submitAGuess={this.submitAGuess}
                  />
                </div>
                <Settings
                  currentGuesses={currentGuesses}
                  difficultyLevel={difficultyLevel}
                  feedbackRespnse={feedbackRespnse}
                  openSettings={openSettings}
                  restart={this.restart}
                  round={round}
                  updateDifficultyLevel={this.updateDifficultyLevel}
                  updateFeedbackRespnse={this.updateFeedbackRespnse}
                  updateOpenSettings={this.updateOpenSettings}
                />
                <EndOfRoundMsg
                  code={code}
                  currentRoundPoints={currentRoundPoints}
                  openEndOfRoundMsg={openEndOfRoundMsg}
                  points={points}
                  returnLastAnalyzedGuess={this.returnLastAnalyzedGuess}
                  updateOpenEndOfRoundMsg={this.updateOpenEndOfRoundMsg}
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
