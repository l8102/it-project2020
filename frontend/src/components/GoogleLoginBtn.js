import React, {Component} from 'react';
import {googleLoginSuccess, googleLoginFailure} from "../Api.js"
import {withRouter} from 'react-router-dom';
import GoogleLogin from "react-google-login";

class GoogleLoginBtn extends Component {
  constructor(props) {
    super(props);

    // very important bindings, this makes the router work
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
  }

  // Handles a successful google login
  async handleGoogleSuccess(req) {

    // Wait for the successful google login to be retrieved from the database
    let res;

    res = await googleLoginSuccess(req);

    const accountId = res.data;

    // Store the account id that the user can edit
    sessionStorage.setItem("accountIdForEdit", accountId);

    // Navigate to the portfolio page
    this.props.history.push("/editPortfolio");
  }

  handleGoogleFailure(req) {
    googleLoginFailure(req);
  }

  render() {
    return (
      <GoogleLogin className="google-button"
                   clientId="897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
                   buttonText="Login with Google"
                   onSuccess={this.handleGoogleSuccess}
                   onFailure={this.handleGoogleFailure}
                   cookiePolicy={'single_host_origin'}
      />
    );
  }
}

// export class
export default withRouter(GoogleLoginBtn);