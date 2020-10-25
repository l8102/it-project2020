import React, {Component} from 'react';
import "../css/ColourSelector.css"
import { getPortfolio } from "../Api.js"
import ColourButton from "./ColourButton"

class ColourSelector extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

  }

  handleClick() {

  }

  render() {
    // todo this.props.currentColour
    //
    return(
      <div>
        <h2 className="colour-title">Colour</h2>
        <div className="colour-container">
          <ColourButton colour="blue" />
          <ColourButton colour="green" />
          <ColourButton colour="yellow" />
          <ColourButton colour="orange" />
          <ColourButton colour="red" />
          <ColourButton colour="purple" />
        </div>
      </div>
    )
  }
}

export default ColourSelector;