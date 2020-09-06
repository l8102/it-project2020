import React from "react";
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from 'axios';

export default function Login() {
    
    const responseGoogle = response => {
     console.log(response);
     axios({
      method: "POST",
      url: "http://localhost:3001/account/googleLogin",
      data: {tokenId: response.tokenId}
	 }).then(response => {
        console.log(response);
	 })
	}

    const responseFailGoogle = response => {
    
	}
    
    return (
        <GoogleLogin
            clientId="897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
            buttonText="Sign in"
            onSuccess={responseGoogle}
            onFailure={responseFailGoogle}
            cookiePolicy={'single_host_origin'}
         />
    );
}