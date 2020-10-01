// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcrypt');

// import controllers to create the portfolio and its components
const portfolioControllers = require('../controllers/portfolioControllers');
const aboutControllers = require('../controllers/aboutControllers');
const galleryControllers = require('../controllers/galleryControllers');
const fileControllers = require('../controllers/fileControllers');
const linkControllers = require('../controllers/linkControllers');


// todo this isn't working
// const jwt = require('jsonwebtoken');

// Create new account
var createAccount = function(req, res, next) {
  console.log(req.body)
  
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const accountInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            profileImage: req.body.profileImage,
        };

        const data = new Account(accountInfo);
        
        data.save((function(err, doc) {
            if (err || doc == undefined) {
                res.json(err);
            } else {
                res.json(doc);
            }
        }));
    })

  console.log("account created");

  // create a portfolio and its components
  createPortfolio(data._id.toString());

  return true;
};

// Helper function that creates a portfolio and its components for an account
const createPortfolio = function(accountId) {
    portfolioControllers.create(accountId);
    aboutControllers.create(accountId);
    galleryControllers.create(accountId);
    fileControllers.create(accountId);
    linkControllers.create(accountId);
}

// Google Login 
const client = new OAuth2Client("897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com");

// todo maybe add helper method
var googleLogin = function(req, res) {
    const {tokenId} = req.body;

    // Confirms with the google developer console that the google user login is logging into the correct domain
    client.verifyIdToken({idToken: tokenId, audience: "897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"}).then(response => {
        const {email_verified, email, at_hash, given_name, family_name, picture} = response.payload;

        // If the email is verified try to retrieve the account email
        if(email_verified) {
            Account.findOne({ email: email }, function(err, user) {

                // Handle any errors
                if(err) {
                    return res.status(400).json({
                        error: "Went wrong"
					          })

                } else {
                    // If the user already exists, send the user as the response
                    if(user) {
                        console.log("google user exists");
                        res.send(user._id.toString());
                        return true;

                    // If the user doesn't exist, create one
					          } else {
                        const password = at_hash;

                        const newAccount = {
                            firstName: given_name,
                            lastName: family_name,
                            email: email,
                            password: password,
                            profileImage: picture
							          };
                        const data = new Account(newAccount);
                        data.save();
                        console.log("google account created");

                        // send the new user as the response
                        res.send(data._id.toString());

                        // create a portfolio and its components
                        createPortfolio(data._id.toString());

                        return true;
                    }
                }
            })
        }
	  })
}

// Login
var login = function (req, res, next) {

    Account.findOne({ email: req.body.email }, function (err, user) {

        if (!user) {
            console.error("Email not found");
            return false;
        }
        else {

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result == true) {
                    console.log("User logged in");
                    res.send(user._id);
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


// Read Account
var readAccount = function(req, res) {
    var accountId = req.query.accountId;

    Account.findById(accountId, function(err, account) {
        if (err || account == undefined) {
            console.error('account not found');

        } else {
            console.log("account found");

            const data = {
                firstName: account.firstName,
                lastname: account.lastName,
                email: account.email,
                profileImage: account.profileImage
            }

            res.json(data);
            return true;
	    }
	});
} 





// Update Name
var updateName = function(req, res, next) {
    var id = req.body.id;

    //finds account by an id and updates name
    Account.findById(id, function(err, doc) {
        if (err || doc == undefined) {
            console.error('error, no account found');
        } else {
            doc.firstName = req.body.firstName;
            doc.lastName = req.body.lastName;
            console.log('name updated');

            doc.save();
            res.redirect('/');
        }
    });
};


// Update Profile Image
var updateProfileImage = function (req, res, next) {
    var id = req.body.id;

    //finds account by an id and updates name
    Account.findById(id, function (err, doc) {
        if (err || doc == undefined) {
            console.error('error, no account found');
        } else {
            doc.profileImage = req.body.profileImage;
            console.log('profile Image updated');

            doc.save();
            res.redirect('/');
        }
    });
};




// Delete account
var deleteAccount = function(req, res, next) {
    var id = req.body.id;

    //find account by id and deletes
    Account.findByIdAndRemove(id).exec();
    console.log("account removed");

    // todo add in portfolio delete as well (by account id)

};


// Export controllers
module.exports = {
    createAccount,
    googleLogin,
    login,
    deleteAccount,
    updateName,
    updateProfileImage,
    readAccount
}
