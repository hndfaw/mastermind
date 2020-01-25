import React, { Component } from "react";
import "./Hint.css";

class Hint extends Component {
  state = {
    randomCodeIndex: 0,
    randomCodeNum: 0,
    hint: ''
  };

//   generateHints = () => {
//     const { uniqueCodeNums, nonExistingNums, difficalityLevel } = this.props;
//     let hints = [];
//     uniqueCodeNums.forEach(codeNum => {
//       hints.push(`Number ${codeNum} exsit in the combination of the code!`);
//     });

//     nonExistingNums.forEach(num => {
//       hints.push(
//         `Number ${num} does NOT exsit in the combination of the code!`
//       );
//     });

//     if (uniqueCodeNums.length === 4) {
//       hints.push("There are no duplicate numbers!");
//     } else {
//       hints.push("There is at least one duplicate number");
//     }

//     if (uniqueCodeNums.length <= 2) {
//       hints.push(
//         `I don/'t know how to tell you this! too many similar numbers are there!`
//       );
//     }

//     if (uniqueCodeNums.length === 1) {
//       hints.push(
//         `Ok here is the best hint ever! all the numbers are similar! Good Luck!!`
//       );
//     }

//     let maxCodeNum = Math.max(...uniqueCodeNums);
//     let minCodeNum = Math.min(...uniqueCodeNums);
//     maxCodeNum !== difficalityLevel &&
//       hints.push(`All the numbers are smaller than ${maxCodeNum + 1}`);
//     minCodeNum !== 0 &&
//       hints.push(`All the numbers are greater than ${minCodeNum - 1}`);

//     let randomNumber = this.selectRandomCodeNumber(hints.length - 1);

//         this.setState({ hint: hints[randomNumber] });

//   };

  selectRandomCodeNumber = maxNum => {
    const min = 0;
    const max = parseInt(maxNum);
    const minFixed = min;
    const maxFixed = max - min + 1;
    const randomNumber = Math.floor(Math.random() * maxFixed) + minFixed;
    return randomNumber;
  };

  render() {
    // const { difficalityLevel, code, currentGuesses} = this.props;
    const { hint } = this.state;
    return (
      <section className="hint">
        <button onClick={this.generateHints}>Generate Hint</button>
        <p>{hint}</p>
      </section>
    );
  }
}

export default Hint;
