// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcrypt');
const {cloudinary} = require('../utils/cloudinary');

// import controllers to create the portfolio and its components
const portfolioControllers = require('../controllers/portfolioControllers');
const aboutControllers = require('../controllers/aboutControllers');
const galleryControllers = require('../controllers/galleryControllers');
const fileControllers = require('../controllers/fileControllers');
const linkControllers = require('../controllers/linkControllers');

// Creates a new account
var createAccount = function (req, res, next) {
  console.log(req.body)

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    const accountInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: (req.body.firstName + " " + req.body.lastName).toLowerCase(),
      email: req.body.email,
      password: hash,
      profilePicture: req.body.profilePicture,
    };

    const data = new Account(accountInfo);

    data.save((function (err, doc) {
      if (err || doc == undefined) {
        res.json(err);
      } else {
        res.json(doc);
      }
    }));

    // create a portfolio and its components
    createPortfolio(data._id.toString(), accountInfo.email);

  })

  console.log("account created");

  return true;
};

// Helper function that creates a portfolio and its components for an account
const createPortfolio = function (accountId, email) {
  portfolioControllers.create(accountId, email);
  aboutControllers.create(accountId);
  galleryControllers.create(accountId);
  fileControllers.create(accountId);
  linkControllers.create(accountId);
}

// Google Login 
const client = new OAuth2Client("897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com");

// Handle the google login APIs
var googleLogin = function (req, res) {
  const {tokenId} = req.body;

  // Confirms with the google developer console that the google user login is logging into the correct domain
  client.verifyIdToken({
    idToken: tokenId,
    audience: "897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
  }).then(response => {
    const {email_verified, email, at_hash, given_name, family_name, picture} = response.payload;

    // If the email is verified try to retrieve the account email
    if (email_verified) {
      Account.findOne({email: email}, function (err, user) {

        // Handle any errors
        if (err) {
          return res.status(400).json({
            error: "Went wrong"
          })

        } else {
          // If the user already exists, send the user as the response
          if (user) {
            console.log("google user exists");
            res.send(user._id.toString());
            return true;

            // If the user doesn't exist, create one
          } else {
            const password = at_hash;

            const newAccount = {
              firstName: given_name,
              lastName: family_name,
              fullName: (given_name + " " + family_name).toLowerCase(),
              email: email,
              password: password,
              profilePicture: picture
            };
            const data = new Account(newAccount);
            data.save();
            console.log("google account created");

            // send the new user as the response
            res.send(data._id.toString());

            // create a portfolio and its components
            createPortfolio(data._id.toString(), newAccount.email);

            return true;
          }
        }
      })
    }
  })
}

// Handles normal user login
var login = function (req, res, next) {

  Account.findOne({email: req.body.email}, function (err, user) {

    if (!user) {
      console.error("Email not found");
      return false;
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          console.log("User logged in");
          res.send(user._id.toString());
          return true;
        } else {
          res.send("False");
        }
      });
    }
    user.save();
  });
  return false;
}


// Finds an account based on its id
var readAccount = function (req, res) {
  var accountId = req.query.accountId;

  Account.findById(accountId, function (err, account) {
    if (err || account == undefined) {
      console.error('account not found');

    } else {
      console.log("account found");

      const data = {
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        profilePicture: account.profilePicture
      }

      res.json(data);
      return true;
    }
  });
}

// Finds all accounts by their full name
const readAllByFullName = function (req, res) {

  // Search for the full name, transforming it to lower case
  Account.find(
    {"fullName": {$regex: ".*" + req.query.fullName.toLowerCase() + "*."}},
    {password: 0, createdAt: 0, updatedAt: 0},
    function (err, accounts) {

      if (err) {
        console.error(err);
        res.send("false");
        return false;
      } else {
        console.log("Getting accounts with matching full name");
        res.send(accounts);
        return true;
      }
    });
}

// Get all account id's
const readAll = function (req, res) {

  Account.find({}, {password: 0, createdAt: 0, updatedAt: 0}, function (err, accounts) {

    if (err) {
      console.error(err);
    } else {
      console.log("Getting all accounts");

      res.send(accounts);

    }
  });

}

// Updates the name of an account, currently not used
var updateName = function (req, res, next) {
  var id = req.body.id;

  //finds account by an id and updates name
  Account.findById(id, function (err, doc) {
    if (err || doc == undefined) {
      console.error('error, no account found');
    } else {
      doc.firstName = req.body.firstName;
      doc.lastName = req.body.lastName;
      doc.fullName = req.body.firstName + " " + req.body.lastName;
      console.log('name updated');

      doc.save();
      res.redirect('/');
    }
  });
};

// Updates the cloudinary url to the profile picture stored in the database
const updateProfilePicture = async function (req, res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'ProfilePicture',
    });

    console.log(uploadResponse);
    console.log(uploadResponse.url);

    Account.findById(req.body.accountId, function (err, account) {

      if (err || account === undefined) {
        console.error("Account not found");
        res.send("false");
        return false;
      } else {
        account.profilePicture = uploadResponse.url;
        account.save();

        console.log("Account updated");
        res.json(account);
        return true;
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({err: 'Something went wrong'});
  }
}

// Delete account
var deleteAccount = function (req, res, next) {
  var id = req.body.id;

  //find account by id and deletes
  Account.findByIdAndRemove(id).exec();
  console.log("account removed");
};

// Export controllers
module.exports = {
  createAccount,
  googleLogin,
  login,
  deleteAccount,
  updateName,
  updateProfilePicture,
  readAccount,
  readAllByFullName,
  readAll
}
