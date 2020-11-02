import React, {Component} from 'react';
import "../css/ColourSelector.css"

class ColourButton extends Component {

  constructor(props) {
    super(props);

    // bindings
    this.handleChange = this.handleChange.bind(this);
  }

  // wrapper function needed to handle the event callback
  handleChange() {
    this.props.setColour(this.props.btnColour);
  }

  render() {
    return (
      <div className="colour-item">
        <label>
          <input
            type="radio"
            name="colour"
            value={this.props.btnColour}
            {/* Checks the colour button if it is the selected colour */}
            defaultChecked={this.props.btnColour === this.props.colour}
            onChange={this.handleChange}
          />
          <div
            className="colour-display"
            id={this.props.btnColour}
          />
        </label>
      </div>
    )
  }
}

export default ColourButton;

