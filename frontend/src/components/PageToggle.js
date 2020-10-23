import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/DefaultStyles.css"

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

export default class PageToggle extends Component {

    render() {
        return(
        <div>
            <FormControlLabel
            control={
                <CustomSwitch
                checked={this.props.isToggleOn}
                onChange={this.props.handleButtonChange}
                color="primary"
                name="pageToggle"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
            label="Edit/View Page Toggle"
            labelPlacement="start"
            />
        </div>
        )
    
    }
}
