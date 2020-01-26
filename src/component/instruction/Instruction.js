import React, { Component } from 'react';
import './Instruction.css';
import redLogo from  '../../assets/images/mastermind-logo.png';
import { NavLink } from 'react-router-dom';
import mainImg from '../../assets/images/01-main.jpg';
import codeImg from '../../assets/images/02-code.jpg';
import formImg from '../../assets/images/03-form.jpg';
import guessesImg from '../../assets/images/04-guesses.jpg';
import infoImg from '../../assets/images/05-info.jpg';
import hintsImg from '../../assets/images/06-hints.jpg';


class Instruction extends Component {
    render() {
        return (
            <section className="instructions-page">
                <div className="instructions-page-header">
                    <img className="instructions-red-logo" src={redLogo} alt="logo"/>
                    <h2 className="instructions-header">Instructions</h2>
                </div>
                <p className="instructions-body">
                     This is a game where you try to guess the number combinations. At the end of each attempt to guess the 4 number combinations, the computer will provide feedback whether you had guess a number correctly, or/and a number and digit correctly. You must guess the right number combinations within 10 attempts to win the game.
                </p>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">
                        Screenshot of the game</h2>
                    <img src={mainImg} alt="main" className="instr-img"/>
                </div>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">The code in the game</h2>
                    <img src={codeImg} alt="code" className="instr-img"/>
                </div>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">The code in the game</h2>
                    <img src={formImg} alt="form" className="instr-img"/>
                </div>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">The code in the game</h2>
                    <img src={guessesImg} alt="guesses" className="instr-img"/>
                </div>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">The code in the game</h2>
                     <img src={infoImg} alt="information" className="instr-img"/>
                </div>

                <div className="instr-img-container">
                    <h2 className="instr-img-title">The code in the game</h2>
                    <img src={hintsImg} alt="hints" className="instr-img"/>
                </div>




                {/* <div className="instructions-page-btns-container">
                    <NavLink to="/game" className="instructions-btn instructions-btn-game">Start Game</NavLink>
                </div> */}
            </section>
        )
    }
}

export default  Instruction;