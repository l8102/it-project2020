import React, {Component} from 'react';
import "../css/Portfolio.css"

export default class ViewEditButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
    };

    // This binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState(state => ({
      // update the state of the component
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    if (this.state.isToggleOn) {
    return (
      <div className="view-edit-container">
        <input
        className="save-btn view-edit-btn"
        type="submit"
        value="View"
        onClick={ this.handleChange }
        />
        {this.props.alternatePage}
      </div>
    )
  } else{
    return (
      <div className="view-edit-container">
        <input
        className="save-btn view-edit-btn"
        type="submit"
        value="Edit"
        onClick={ this.handleChange }
        />
        {this.props.defaultPage}
      </div>
    )
  }


  }
}
