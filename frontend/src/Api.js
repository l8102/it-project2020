import axios from "axios";

// Dynamically changes the base URL
let hostname = window.location.hostname.toString();
let BASE_URL;
if (hostname === "localhost") {
  BASE_URL = "http://localhost:5000";
} else {
  BASE_URL = "https://eaglesolutions.herokuapp.com";
}

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


// todo this needs to be redone, we are not getting account info, we should be getting portfolio contact info
// todo pretty sure we should delete this (unless it has another use)
export async function getAccount(accountId) {

    return await new Promise(function (resolve) {
        axios({
            method: "get",
            url: BASE_URL + "/api/account/read",
            params: {
                accountId: accountId,
            }
        })
            .then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.error(error);
            });
    });
}

// *** Browse Page START ***

// Get all accounts
export function getAllAccounts() {

    return new Promise(function (resolve) {
        axios({
            method: "get",
            url: BASE_URL + "/api/account/readAll",
        })
            .then(function (response) {
                resolve(response);
                console.log(response);
            }).catch(function (error) {
                console.error(error);
            });
    });
}

export function getAllAccountsByFullName(fullName) {
  return new Promise(function (resolve) {
    axios({
      method: "get",
      url: BASE_URL + "/api/account/readAllByFullName",
      params: {
        fullName: fullName,
      }
    })
      .then(function (response) {
        resolve(response);
        console.log(response);
      }).catch(function (error) {
      console.error(error);
    });
  });
}

// *** Browse Page END ***

// todo implement this
export function getPortfolioContactInfo() {

    // make request for portfolio
    return new Promise(function (resolve) {
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
export function setPortfolioContactInfo(newEmail, newTelephone) {

    return new Promise(function (resolve) {
        axios({
            method: "put",
            url: BASE_URL + "/api/portfolio/updateByAccountId",
            data: {
                accountId: sessionStorage.getItem("accountId"),
                email: newEmail,
                telephone: newTelephone
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
        body: JSON.stringify({ 
          data: base64EncodedImage,
          accountId: sessionStorage.getItem("accountId")
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
}

// TODO: This function retrieves based on portfolioId from older schema, need to test and replace with function below 
export function getImages() {
    //const data = { accountId: searchId }
    return axios({
        method: "post",
        url: BASE_URL + "/api/gallery/getImages",
        data: {
          accountId: sessionStorage.getItem("accountId")
        }
    }).then(res => {
        return res.data;
    })
}


// // Retrieves all recorded images associated with a specified account id
// export function getImages() {
//   // Retrieves accountId from session storage
//   const data = { accountId: sessionStorage.getItem("accountId") }
//   //console.log(data.accountId);

//   return axios({
//     method: "post",
//     url: BASE_URL + "/api/gallery/getImages",
//     data: data
//   }).then(res => {
//     return res.data;
//   }).catch(err => {
//     console.error("Error, something went wrong")
//   }) 
// }


// ----- getPortfolioByAccountId -----
export function getPortfolioIsPrivate(accountId) {

  // make request for portfolio
  return new Promise( function (resolve) {
    axios({
      method: "get",
      url: BASE_URL + "/api/portfolio/readByAccountId",
      params: {
        accountId: accountId,
      }
    })
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
      console.error(error);
    });
  });
}

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
            }).catch(function (error) {
                console.error(error);
            });
    });
}

export function updateLinks(state) {

  return new Promise(function (resolve) {
    axios({
      method: "put",
      url: BASE_URL + "/api/link/updateLinks",
      data: {
        accountId: sessionStorage.getItem("accountId"),
        state: state
      }
    })
    .then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  })
}

export function getLinks() {
  return new Promise(function (resolve) {
    axios({
      method:"get",
      url: BASE_URL + "/api/link/readLinks",
      params: {
        accountId: sessionStorage.getItem("accountId"),
      }
    })
    .then(function (response) {
      resolve(response);
    }).catch(function (error) {
      console.error(error);
    })
  })
}

/** sends the encoded image to the backend function upload */
export function fileUploadAPI(base64EncodedImage) {
  return fetch(BASE_URL + "/api/file/uploadFile", {
      method: 'POST',
      body: JSON.stringify({ 
        data: base64EncodedImage,
        accountId: sessionStorage.getItem("accountId")
      }),
      headers: { 'Content-Type': 'application/json' },
  }).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(function (error) {
    console.error(error);
  });
}

export function getFiles() {
  return axios({
      method: "post",
      url: BASE_URL + "/api/file/getFiles",
      data: {
        accountId: sessionStorage.getItem("accountId")
      }
  }).then(res => {
      return res.data;
  })
}

export function uploadProfilePicture(base64EncodedImage) {
  return fetch(BASE_URL + "/api/account/updateProfilePicture", {
    method: 'PUT',
    body: JSON.stringify({ 
      data: base64EncodedImage,
      accountId: sessionStorage.getItem("accountId")
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(function (error) {
    console.error(error);
});
}

// todo can probably remove this
// export function getProfilePicture(accountId) {
//   return new Promise(function (resolve) {
//     axios({
//       method:"get",
//       url: BASE_URL + "/api/portfolio/getProfilePicture",
//       params: {
//         accountId: accountId,
//       }
//     })
//     .then(function (response) {
//       resolve(response);
//     }).catch(function (error) {
//       console.error(error);
//     })
//   })
// }
