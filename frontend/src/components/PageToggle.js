import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/DefaultStyles.css"

export default class PageToggle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
    };

    // This binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.selectedPage = this.selectedPage.bind(this);
  }

  handleChange() {
    this.setState(state => ({
      // update the state of the component
      isToggleOn: !state.isToggleOn
    }));
  }

  selectedPage() {
    if (this.state.isToggleOn) {
      return (
        <div>
          {this.props.alternatePage}
        </div>
      )
    } else{
      return (
        <div>
          {this.props.defaultPage}
        </div>
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

    return (
      <div className="page-toggle">
        <FormControlLabel
          control={
            <CustomSwitch
              checked={this.state.isToggleOn}
              onChange={this.handleChange}
              color="primary"
              name="pageToggle"
              inputProps={{'aria-label': 'primary checkbox'}}
            />
          }
          label="Edit/View Page Toggle"
          labelPlacement="start"
        />
        <this.selectedPage/>
      </div>
    )

  }
}
