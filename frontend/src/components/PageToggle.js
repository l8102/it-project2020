import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/DefaultStyles.css"

export default class PageToggle extends Component {

    render() {

      // import the colours from the css
      let styles = getComputedStyle(document.documentElement);
      const midPortfolio = styles.getPropertyValue('--mid-portfolio');

      // create custom coloured switch
      const CustomSwitch = withStyles({
        switchBase: {
          color: midPortfolio,
          '&$checked': {
            color: midPortfolio,
          },
          '&$checked + $track': {
            backgroundColor: midPortfolio,
          },
        },
        checked: {},
        track: {},
      })(Switch);

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
