import axios from "axios";
import GoogleLogin from "react-google-login";

const BASE_URL = "https://eaglesolutions.herokuapp.com";

/*
function init() {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init or some other API
  });
 } 
*/

export function responseGoogle(response) {

     console.log(response);
     // Send to backend
     axios({
      method: "POST",
      url: BASE_URL + "/api/account/googleLogin",
      data: {tokenId: response.tokenId}
	 }).then(response => {
        console.log(response);
	 })
	}

export function responseFailGoogle(response) {

    console.log("Google Login failed")

}

export async function getAccount(account) {
    const accountId = account.accountId;

    var res = await axios({
     method: "GET",
     url: BASE_URL + "/api/account/readAccount",
     data: accountId
	}).then(function (res) {
     console.log(res);
	})
    return res.data;

}

export function deleteAccount(account) {
    const accountId = account.accountId;

    axios({
     method: "delete",
     url: BASE_URL + "/api/account/deleteAccount",
     data: accountId
	})

}

/*
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
*/