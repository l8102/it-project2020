import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/ColourScheme.css"
import { getPortfolioIsPrivate, setPortfolioIsPrivate } from "../Api.js"

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

// todo clean this up
// todo is being called twice, how to prevent this? (preventDefault???) - maybe not an issue

class PrivateToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
      isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    // todo learn about bindings
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {

    console.log("running");
    let res;

    try {
      res = await getPortfolioIsPrivate(sessionStorage.getItem("accountId"));
    } catch (error) {
      console.error(error);
    }

    // todo VERY IMPORTANT ! ! !
    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      isToggleOn: res.data.isPrivate,
      isLoaded: true
    })
  }

  handleChange() {

    // update the isPrivate field in the database
    setPortfolioIsPrivate(!this.state.isToggleOn);

    this.setState(state => ({
      // update the state of the component
      isToggleOn: !state.isToggleOn
    }));


  }

  render() {
    if (!this.state.isLoaded) {
      return(
        <div>
          Loading...
        </div>
      )
    } else {
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
}

export default PrivateToggle;