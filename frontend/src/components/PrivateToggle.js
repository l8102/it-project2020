import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/DefaultStyles.css"
import "../css/Portfolio.css"
import { getPortfolio, setPortfolioIsPrivate } from "../Api.js"
import {setPortfolioContactInfo} from "../Api";

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

  componentDidMount() {

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      isToggleOn: this.props.isPrivate,
      accessCode: this.props.accessCode,
      isLoaded: true
    })
  }

  async handleChange() {

    try {
      // update the isPrivate field in the database
      await setPortfolioIsPrivate(!this.state.isToggleOn);
    } catch (error) {
      console.error(error)
    }

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
    // import the colours from the css
    let style = getComputedStyle(document.getElementById('root'));
    let midPortfolio = style.getPropertyValue('--mid-portfolio');

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