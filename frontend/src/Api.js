import axios from "axios";

// todo change this depending on environment
//const BASE_URL = "https://eaglesolutions.herokuapp.com";
const BASE_URL = "http://localhost:5000";


export function googleLoginSuccess(req) {

  // Send to backend
  // todo understand this better
  return new Promise( function (resolve) {
    axios({
      method: "POST",
      url: BASE_URL + "/api/account/googleLogin",
      data: {
        tokenId: req.tokenId
      }
    })
      .then(function (response) {
        resolve(response);
      });
  });


    // .then( function (response) {
    //   console.log(response);
    //   return(response);
    // })
    // .catch( function (error) {
    //   console.error(error);
    // })
}

export function googleLoginFailure(req) {

    console.log("Google Login failed")

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


export async function getAccount() {

    return await new Promise(function (resolve) {
        axios({
            method: "get",
            url: BASE_URL + "/api/account/read",
            params: {
                accountId: sessionStorage.getItem("accountId"),
            }
        })
            .then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.error(error);
            });
    });
}




/** sends the encoded image to the backend function upload */
export function uploadAPI(base64EncodedImage) {
    return fetch(BASE_URL + "/api/gallery/upload", {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
    })
}

// retrieves all recorded images associated with a specified portfolio id
export function getImages(searchId) {
    const data = { accountId: searchId }
    return axios({
        method: "post",
        url: BASE_URL + "/api/gallery/getImages",
        data: data
    }).then(res => {
        return res.data;
    })
}


// ----- getPortfolioByAccountId -----
export async function getPortfolioIsPrivate() {

  // make request for portfolio
  return new Promise( function (resolve) {
    axios({
      method: "get",
      url: BASE_URL + "/api/portfolio/readByAccountId",
      params: {
        accountId: sessionStorage.getItem("accountId"),
      }
    })
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
      console.error(error);
    });
  });
}

// todo implement this

export function setPortfolioIsPrivate(isPrivate) {

  // make request for portfolio

  return new Promise( function (resolve) {
    axios({
      method: "put",
      url: BASE_URL + "/api/portfolio/updateByAccountId",
      data: {
        accountId: sessionStorage.getItem("accountId"),
        isPrivate: isPrivate
      }
    })
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
        console.error(error);
      });
  });
}


// Update about Me
export function updateAboutMe(state) {

    return new Promise(function (resolve) {
        axios({
            method: "put",
            url: BASE_URL + "/api/about/updateAboutMe",
            data: {
                accountId: sessionStorage.getItem("accountId"),
                state: state
            }
        })
            .then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.error(error);
            });
    });
}


// ----- get AboutMe by Account ID -----
export async function getAboutMe() {

    // make request for portfolio
    return new Promise(function (resolve) {
        axios({
            method: "get",
            url: BASE_URL + "/api/about/readAbout",
            params: {
                accountId: sessionStorage.getItem("accountId"),
            }
        })
            .then(function (response) {
                resolve(response);
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
    });
}

