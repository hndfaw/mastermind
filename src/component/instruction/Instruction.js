import React, { Component } from 'react';
import './Instruction.css';
import redLogo from  '../../assets/images/mastermind-logo.png';
import { NavLink } from 'react-router-dom';


class Instruction extends Component {
    render() {
        return (
            <section className="instructions-page">
                <div className="instructions-page-header">
                    <img className="instructions-red-logo" src={redLogo} alt="logo"/>
                    <h2>Instructions</h2>
                </div>
                <p className="instructions-body">Is this your first time here? Do you need some instruction to learn the rules of the game? If so, click on instructions, otherwise, click on the game to start the game! Have fun!</p>

                <div className="instructions-page-btns-container">
                    <NavLink to="/game" className="instructions-btn instructions-btn-game">Start Game</NavLink>
                </div>
            </section>
        )
    }
}

export default  Instruction;