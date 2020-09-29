import axios from "axios";
import GoogleLogin from "react-google-login";

// todo change this depending on environment
//const BASE_URL = "https://eaglesolutions.herokuapp.com";
const BASE_URL = "http://localhost:5000";

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

export function login(loginDetails) {

    // read in login details
    const { email, password } = loginDetails;

    // validation
    if (!email || !password) {
        console.log("Must include all fields");
        return null;
    }


    // send axios request, await completion, return response
    return (
        axios({
        method: "post",
        url: BASE_URL + "/api/account/login",
        data: loginDetails
      })
    )
}


export function createAccount(account) {

    // read in account details for validation
    // todo this could be done differently
    const { firstName, lastName, email, password } = account;

    // validation to check details exist
    if (!firstName || !lastName || !email || !password) {
        console.log("Must include all fields");
        return null;
    }

    // todo not sure res is working properly
    // send request to backend, return response
    return (
      axios({
        method: "post",
        url: BASE_URL + "/api/account/create",
        data: account
    }));

    // todo remove async / token stuff
    // return new Promise (function (resolve) {
    //         axios({
    //         method: "post",
    //         url: BASE_URL + "/api/account/create",
    //         data: response
    //     }).then(json => {
    //         console.log("Worked!!!")
    //         resolve(json);
    //     });
    // });


  //  return fetch(BASE_URL + "/api/account/create", {
  //   method: "POST",
  //   body: response,
  // }).then((res) => {
  //   window.location.reload();
  //   alert("account succesfully created! You can now log in!");
  // });

}

// todo API for getIsPrivate

// todo API for setIsPrivate

/** sends the encoded image to the backend function upload */
export function uploadAPI(base64EncodedImage) {
    return fetch(BASE_URL + "/api/gallery/upload", {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
    })
}

export function getImages(searchId) {
    const data = { portfolioId: searchId }
    return axios({
        method: "post",
        url: BASE_URL + "/api/gallery/getImages",
        data: data
    }).then(res => {
        return res.data;
    })
}