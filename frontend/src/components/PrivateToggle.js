import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/DefaultStyles.css"
import "../css/Portfolio.css"
import { getPortfolio, setPortfolioIsPrivate } from "../Api.js"

// import the colours from the css
const midBlue = getComputedStyle(document.documentElement)
  .getPropertyValue('--mid-blue');

// create custom coloured switch
const CustomSwitch = withStyles({
  switchBase: {
    color: midBlue,
    '&$checked': {
      color: midBlue,
    },
    '&$checked + $track': {
      backgroundColor: midBlue,
    },
  },
  checked: {},
  track: {},
})(Switch);

class PrivateToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
      accessCode: "",
      isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.displayAccessCode = this.displayAccessCode.bind(this);
  }

  async componentDidMount() {

    console.log("running");
    let portfolio;
    const accountId = sessionStorage.getItem("accountId");

    try {
      portfolio = await getPortfolio(accountId);
    } catch (error) {
      console.error(error);
    }

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      isToggleOn: portfolio.data.isPrivate,
      accessCode: portfolio.data.accessCode,
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

  displayAccessCode() {
    if (this.state.isToggleOn) {
      return (
        <div className="private-toggle-item" >
          Your Access Code Is {this.state.accessCode}
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
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
        <div className="private-toggle-container">
          <FormControlLabel
            control={
              <CustomSwitch
                className="private-toggle-item"
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
          <this.displayAccessCode/>
        </div>
      )
    }
  }
}

export default PrivateToggle;