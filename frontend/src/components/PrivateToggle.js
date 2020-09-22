import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/ColourScheme.css"

// import the colours from the css
const blueBorder = getComputedStyle(document.documentElement)
  .getPropertyValue('--blue-border');

// create custom coloured switch
const CustomSwitch = withStyles({
  switchBase: {
    color: blueBorder,
    '&$checked': {
      color: blueBorder,
    },
    '&$checked + $track': {
      backgroundColor: blueBorder,
    },
  },
  checked: {},
  track: {},
})(Switch);

class PrivateToggle extends Component {
  constructor(props) {
    super(props);
    // todo readPrivateMode
    this.state = {
      isToggleOn: false
    };

    // This binding is necessary to make 'this' work in the callback
    // todo learn about bindings
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    // todo updatePrivateMode
  }

  render() {
    return(
      <div>
        <FormControlLabel
          control={
            <CustomSwitch
              checked={this.state.isToggleOn}
              onChange={this.handleChange}
              color="primary"
              name="privateMode"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Private Mode"
          labelPlacement="start"
        />
      </div>
    )
  }
}

export default PrivateToggle;