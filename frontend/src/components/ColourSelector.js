import React, {Component} from 'react';
import "../css/ColourSelector.css"
import {setPortfolioColour} from "../Api.js"
import ColourButton from "./ColourButton"

class ColourSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      colour: "",
      isLoaded: false
    }

    // This binding is necessary to make 'this' work in the callback
    this.setColour = this.setColour.bind(this);
  }

  // When the component mounts read in the selected colour
  async componentDidMount() {

    this.setState({
      colour: this.props.colour,
      isLoaded: true
    })
  }

  // When any of the colours are selected, store this in the database
  // Also render the new portfolio colours
  async setColour(colour) {
    console.log(colour);

    try {
      // Store the selected colour in the database
      await setPortfolioColour(colour);
    } catch (error) {
      console.error(error)
    }

    // Render the colour
    this.props.renderPortfolioColours(colour)
  }

  render() {

    if (this.state.isLoaded) {
      return (
        <div>
          <h2 className="colour-title">Colour</h2>
          <div className="colour-container">
            <ColourButton
              btnColour="blue"
              colour={this.props.colour}
              setColour={this.setColour}
            />
            <ColourButton
              btnColour="green"
              colour={this.props.colour}
              setColour={this.setColour}
            />
            <ColourButton
              btnColour="yellow"
              colour={this.props.colour}
              setColour={this.setColour}
            />
            <ColourButton
              btnColour="orange"
              colour={this.props.colour}
              setColour={this.setColour}
            />
            <ColourButton
              btnColour="red"
              colour={this.props.colour}
              setColour={this.setColour}
            />
            <ColourButton
              btnColour="purple"
              colour={this.props.colour}
              setColour={this.setColour}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default ColourSelector;