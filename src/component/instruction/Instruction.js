import React, { Component } from "react";
import "./Instruction.css";
import redLogo from "../../assets/images/mastermind-logo.png";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import mainImg from "../../assets/images/01-main.jpg";
import codeImg from "../../assets/images/02-code-.jpg";
import formImg from "../../assets/images/03-code-.jpg";
import dontWorryImg from "../../assets/images/04-code-.jpg";
import formImg1 from "../../assets/images/05-form-.jpg";
import formImg2 from "../../assets/images/06-form-.jpg";
import formImg3 from "../../assets/images/07-form-.jpg";
import formImg4 from "../../assets/images/08-form-.jpg";
import formImg5 from "../../assets/images/09-form-.jpg";
import formImg6 from "../../assets/images/10-form-.jpg";
import formImg7 from "../../assets/images/11-form-.jpg";
import sideImg from "../../assets/images/12-side-.jpg";
import roundsImg from "../../assets/images/13-rounds-.jpg";
import pointsImg1 from "../../assets/images/14-points-.jpg";
import pointsImg2 from "../../assets/images/15-points-.jpg";
import pointsImg3 from "../../assets/images/16-points-.jpg";
import succRoundsImg from "../../assets/images/17-succ-rounds-.jpg";
import diffLevelImg1 from "../../assets/images/18-diff-level-.jpg";
import diffLevelImg2 from "../../assets/images/19-diff-level-.jpg";
import hintsImg1 from "../../assets/images/20-hints-.jpg";
import hintsImg2 from "../../assets/images/21-hints-.jpg";
import instImg from "../../assets/images/22-instruction-.jpg";



class Instruction extends Component {
  state = {
    currentImg: 1,
    totalImages: 22
  };

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
              <img src={mainImg} alt="main" className="instr-img" style={this.instrImgStyle(1)}/>

              <img src={codeImg} alt="code" className="instr-img" style={this.instrImgStyle(2)}/>

              <img src={formImg} alt="form" className="instr-img" style={this.instrImgStyle(3)}/>

              <img src={dontWorryImg} alt="information" className="instr-img" style={this.instrImgStyle(4)} />

              <img src={formImg1} alt="information" className="instr-img" style={this.instrImgStyle(5)} />

              <img src={formImg2} alt="information" className="instr-img" style={this.instrImgStyle(6)} />

              <img src={formImg3} alt="information" className="instr-img" style={this.instrImgStyle(7)} />

              <img src={formImg4} alt="information" className="instr-img" style={this.instrImgStyle(8)} />

              <img src={formImg5} alt="information" className="instr-img" style={this.instrImgStyle(9)} />

              <img src={formImg6} alt="information" className="instr-img" style={this.instrImgStyle(10)} />

              <img src={formImg7} alt="information" className="instr-img" style={this.instrImgStyle(11)} />

              <img src={sideImg} alt="information" className="instr-img" style={this.instrImgStyle(12)} />

              <img src={roundsImg} alt="information" className="instr-img" style={this.instrImgStyle(13)} />

              <img src={pointsImg1} alt="information" className="instr-img" style={this.instrImgStyle(14)} />

              <img src={pointsImg2} alt="information" className="instr-img" style={this.instrImgStyle(15)} />

              <img src={pointsImg3} alt="information" className="instr-img" style={this.instrImgStyle(16)} />

              <img src={succRoundsImg} alt="information" className="instr-img" style={this.instrImgStyle(17)} />

              <img src={diffLevelImg1} alt="information" className="instr-img" style={this.instrImgStyle(18)} />

              <img src={diffLevelImg2} alt="information" className="instr-img" style={this.instrImgStyle(19)} />

              <img src={hintsImg1} alt="information" className="instr-img" style={this.instrImgStyle(20)} />

              <img src={hintsImg2} alt="information" className="instr-img" style={this.instrImgStyle(21)} />

              <img src={instImg} alt="information" className="instr-img" style={this.instrImgStyle(22)} />


              
              


      
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
