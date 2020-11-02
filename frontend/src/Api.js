import axios from "axios";

// Dynamically changes the base URL
let hostname = window.location.hostname.toString();
let BASE_URL;
if (hostname === "localhost") {
  BASE_URL = "http://localhost:5000";
} else {
  BASE_URL = "https://eaglesolutions.herokuapp.com";
}

/** GOOGLE LOGIN **/

export function googleLoginSuccess(req) {

  // Send to backend
  return new Promise(function (resolve) {
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

/** ACCOUNT **/

export function login(loginDetails) {

  // read in login details
  const {email, password} = loginDetails;

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
  const {firstName, lastName, email, password} = account;

  // validation to check details exist
  if (!firstName || !lastName || !email || !password) {
    console.log("Must include all fields");
    return null;
  }

  // send request to backend, return response
  return (
    axios({
      method: "post",
      url: BASE_URL + "/api/account/create",
      data: account
    }));
}

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

/** BROWSE PAGE **/

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

/** PORTFOLIO **/

// ----- getPortfolioByAccountId -----
export function getPortfolio(accountId) {

  // make request for portfolio
  return new Promise(function (resolve) {
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

  return new Promise(function (resolve) {
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

export function setPortfolioColour(colour) {
  return new Promise(function (resolve) {
    axios({
      method: "put",
      url: BASE_URL + "/api/portfolio/updateByAccountId",
      data: {
        accountId: sessionStorage.getItem("accountId"),
        colour: colour
      }
    })
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
      console.error(error);
    });
  });
}

/** function takes the encoded picture and sends it to the backend function
 * updateProfilePicture based on the current logged in user (accountId)
 */
export function uploadProfilePicture(base64EncodedImage) {

  return fetch(BASE_URL + "/api/account/updateProfilePicture", {
    method: 'PUT',
    body: JSON.stringify({
      data: base64EncodedImage,
      accountId: sessionStorage.getItem("accountId")
    }),
    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(function (error) {
    console.error(error);
  });
}

/** ABOUT ME PAGE **/

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

/** GALLERY PAGE **/

/** function takes the encoded picture and sends it to the backend function
 * upload based on the current logged in user (accountId)
 */
export function uploadAPI(base64EncodedImage) {
  return fetch(BASE_URL + "/api/gallery/upload", {
    method: 'POST',
    body: JSON.stringify({
      data: base64EncodedImage,
      accountId: sessionStorage.getItem("accountId")
    }),
    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    return res.data;
  }).catch(function (error) {
    console.error(error);
  });
}

/** function retrieves all the images stored in the database based on the
 * accountId of the currently logged in user
 */
export function getImages() {
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

/** FILE PAGE **/

/** function takes the encoded file and sends it to the backend function
 * uploadFile based on the current logged in user (accountId)
 */
export function fileUploadAPI(base64EncodedImage) {
  return fetch(BASE_URL + "/api/file/uploadFile", {
    method: 'POST',
    body: JSON.stringify({
      data: base64EncodedImage,
      accountId: sessionStorage.getItem("accountId")
    }),
    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(function (error) {
    console.error(error);
  });
}

/** function retrieves all the files stored in the database based on the
 * accountId of the currently logged in user
 */
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

/** LINKS PAGE **/

export function updateLinks(state) {
  console.log(state);


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
      method: "get",
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