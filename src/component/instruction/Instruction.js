import React, { Component } from "react";
import "./Instruction.css";
import redLogo from "../../assets/images/mastermind-logo.png";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import data from "../../assets/data/images";



class Instruction extends Component {
  state = {
    currentImg: 1,
    totalImages: 0
  };

  componentDidMount() {
      this.setState({totalImages: data.length})
  }

  instrImgStyle = imgNum => {
    const { currentImg } = this.state;

    if (currentImg === imgNum) {
      return {
        display: "block"
      };
    } else {
      return {
        display: "none"
      };
    }
  };

  updateImgNumber = type => {
    const { currentImg, totalImages } = this.state;
    if (type === "next" && currentImg < totalImages) {
      this.setState({ currentImg: this.state.currentImg + 1 });
    } else if (type === "prev" && currentImg > 1) {
      this.setState({ currentImg: this.state.currentImg - 1 });
    }
  };

  image = () => {
    return data.map((img, i) => {
        return (
          <img src={img} alt="main" className="instr-img" style={this.instrImgStyle(i + 1)}/>

        )
    })
  }

  render() {
      const { totalImages, currentImg } = this.state;

      return (
      <section className="instructions-page">
        <NavLink to="/game" className="instructions-btn-game">
          Start Game
        </NavLink>
        <div className="instructions-page-header">
          <img className="instructions-red-logo" src={redLogo} alt="logo" />
          <h2 className="instructions-header">Instructions</h2>
        </div>
        <p className="instructions-body">
          This is a game where you try to guess the number combinations. At the
          end of each attempt to guess the 4 number combinations, the computer
          will provide feedback whether you had guess a number correctly, and/or
          a number and digit correctly. You must guess the right number
          combinations within 10 attempts to win the game.
        </p>

        <div className="instructions-imgs-instructions">
            <h3 className="instructions-imgs-title">Here is a quick demo for you!</h3>
          <div>
              {this.image()}
          </div>
          <div className="instructions-buttons">
            <Button
              onClick={() => this.updateImgNumber("prev")}
              className="instructions-prev-next-btn"
              variant="primary"
              disabled={currentImg === 1}
            >
              &#10094;
            </Button>
            <p>{currentImg} / <span>{totalImages}</span></p>
            <Button
              onClick={() => this.updateImgNumber("next")}
              className="instructions-prev-next-btn"
              variant="primary"
              disabled={currentImg === totalImages}
            >
              &#10095;
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default Instruction;
