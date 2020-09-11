import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';

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
        <Switch
          checked={this.state.isToggleOn}
          onChange={this.handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
    )
  }
}

export default PrivacyToggle;