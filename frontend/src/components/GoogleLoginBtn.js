import React, { Component } from 'react';
import { googleLoginSuccess, googleLoginFailure} from "../Api.js"
import { withRouter } from 'react-router-dom';
import GoogleLogin from "react-google-login";

// todo handle permission to edit (security)
class GoogleLoginBtn extends Component {
  constructor(props) {
    super(props);

    // very important, this makes the router work
    // todo understand this better
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
  }

  async handleGoogleSuccess(req) {

    // wait for the successful google login to be retrieved from the database
    let res;

    res = await googleLoginSuccess(req);

    // store the account id in session storage, which is returned as a response from the api call
    sessionStorage.setItem("accountId", res.data);

    // navigate to the portfolio page
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