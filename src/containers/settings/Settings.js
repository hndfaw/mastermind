import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

 class Settings extends Component {
  state = {
    value: 7
  }

  handleChangeDifficulty = value => {
    const { updateDifficultyLevel } = this.props;
    updateDifficultyLevel(value)
  }

  render() {
    return (
      <div>
        <ToggleButtonGroup type="radio" name="options" defaultValue={7} size="sm" onChange={this.handleChangeDifficulty}>
            <ToggleButton value={7}>Eassy</ToggleButton>
            <ToggleButton value={14}>Medium</ToggleButton>
            <ToggleButton value={28}>Hard</ToggleButton>
            <ToggleButton value={56}>Harder</ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

export default Settings;
