import React, {Component} from 'react';
import "../css/ColourSelector.css"
import { getPortfolio, setPortfolioColour } from "../Api.js"
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

  async componentDidMount() {

    this.setState({
      colour: this.props.colour,
      isLoaded: true
    })
  }

  async setColour(colour) {
    console.log(colour);

    try {
      // Store the selected colour in the database
      await setPortfolioColour(colour);
    } catch (error) {
      console.error(error)
    }

    // Update the selected colour
    this.setState({
      colour: colour
    })

    // Render the colour
    this.props.renderPortfolioColours(colour)
  }

  render() {

    if (this.state.isLoaded) {
      return(
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