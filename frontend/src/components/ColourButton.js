import React, {Component} from 'react';
import "../css/ColourSelector.css"

class ColourButton extends Component {

  constructor(props) {
    super(props);

    // binding
    this.handleChange = this.handleChange.bind(this);
  }

  // wrapper function needed to handle the event callback
  handleChange(e) {
    e.preventDefault();
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

