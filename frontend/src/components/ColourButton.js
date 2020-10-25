import React, {Component} from 'react';
import "../css/ColourSelector.css"
import {setPortfolioColour} from "../Api";

class ColourButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedColour
    }

    // todo bindings
  }

  async componentDidMount() {

  }

  async handleClick() {
    try {
      // update the isPrivate field in the database
      await setPortfolioColour(this.props.colour);

      // todo update global 'colourChecked'

    } catch (error) {
      console.error(error)
    }
  }

  render() {
    console.log(this.props.colour);

    return (
      <div className="colour-item">
        <label>
          <input
            type="radio"
            name="colour"
            value={this.props.colour}
            checked={this.props.checked}
            onClick={this.handleClick}
          />
          <div
            className="colour-display"
            id={this.props.colour}
          />
        </label>
      </div>
    )
  }
}

export default ColourButton;

