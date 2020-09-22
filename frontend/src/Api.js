import axios from "axios";
import GoogleLogin from "react-google-login";

// todo change this depending on environment
const BASE_URL = "https://eaglesolutions.herokuapp.com";
// const BASE_URL = "http://localhost:5000";

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

export function login(response) {
    const { email, password } = response;

    if (!email || !password) {
        console.log("Must include all fields");
        return null;
    }

    axios({
        method: "get",
        url: BASE_URL + "/api/account/login",
        data: response
    })

}


export function createAccount(response) {
    const { firstName, lastName, email, password } = response;

    if (!firstName || !lastName || !email || !password) {
        console.log("Must include all fields");
        return null;
    }

    axios({
        method: "post",
        url: BASE_URL + "/api/account/create",
        data: response
    })
}

// todo API for getIsPrivate

// todo API for setIsPrivate


