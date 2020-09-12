import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/ColourScheme.css"

// todo maybe add custom colours to switch

class PrivacyToggle extends Component {
  constructor(props) {
    super(props);
    // todo retrieve toggled status from database
    this.state = {
      isToggleOn: true
    }

    // This binding is necessary to make 'this' work in the callback
    // todo learn about bindings
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return(
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.isToggleOn}
              onChange={this.handleChange}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Private Mode"
          labelPlacement="end"
        />
      </div>
    )
  }
}

export default PrivacyToggle;