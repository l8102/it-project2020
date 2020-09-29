import React, {Component} from 'react';
import PrivateToggle from "./PrivateToggle";

// import css


// define class

class PrivateAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo need help implementing api and backend
    }
  }

  handleAccessCode() {
    // todo implement
  }

  render() {
    return(
      <div>
        <h1 className="private-access-title" >
          This portfolio is private. Please enter the access code below.
        </h1>
        <form onSubmit={this.handleAccessCode}>
          <input
            type="password"
            name="accessCode"
            value={accessCode}
            onChange={
              // todo setAccessCode
            }
          />
          <button type="submit" className="access-code-btn">
            Enter
          </button>
        </form>
      </div>
    )
  }
}

// export class
export default PrivateAccess;