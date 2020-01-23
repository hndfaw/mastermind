import React, { Component } from "react";
import "./SuccessfulRoundsWidget.css";

class SuccessfulRoundsWidget extends Component {


  barStyle = () => {
    const { successfulRounds, round, roundFinished } = this.props;
    let successRoundPer;

    if (roundFinished === true) {
      successRoundPer = Math.round((successfulRounds / round) * 100);
      return {
        width: `${successRoundPer}%`
      };
    } else {
      successRoundPer = Math.round((successfulRounds / round - 1) * 100);
      return {
        width: `${successRoundPer}%`
      };
    }
  };

  render() {
    const { successfulRounds } = this.props;

    return (
      <section className="successful-rounds-widget">
        <article className="success-round-percentage">
          <p>Successful Rounds</p>
          <p>
            {successfulRounds}
          </p>
        </article>
        <article className="success-round-percentage-bar-container">
          <div
            className="success-round-percentage-bar"
            style={this.barStyle()}
          ></div>
        </article>
      </section>
    );
  }
}

export default SuccessfulRoundsWidget;
