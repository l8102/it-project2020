// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const {OAuth2Client} = require('google-auth-library');

// todo this isn't working
// const jwt = require('jsonwebtoken');


// Create new account
var createAccount = function(req, res, next) {
  console.log(req.body)
  const accountInfo = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImage: req.body.profileImage,
  };

  const data = new Account(accountInfo);
  data.save();

  res.redirect('/account');
  return true;
};


// Google Login 
const client = new OAuth2Client("897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com");

var googleLogin = function(req, res) {
    const {tokenId} = req.body;

     client.verifyIdToken({idToken: tokenId, audience: "897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"}).then(response => {
        const {email_verified, email, at_hash, given_name, family_name, picture} = response.payload;

        if(email_verified) {
            Account.findOne({ email: email }, function(err, user) {
                 if(err) {
                    return res.status(400).json({
                        error: "Went wrong"           
					})        
				 } else {
                       if(user) {
                        console.log("User exists");
                        res.send(user._id);
                        return true;
 
                        


					   }  else {

                           var password = at_hash;

                            var newAccount = {
                                email: email,
                                password: password,
                                firstName: given_name,
                                lastName: family_name,
                                profileImage: picture
							};
                            const data = new Account(newAccount);
                            data.save();
                            console.log("account created");


					   }   
				 res.redirect('/account');
                 }
			})
		}

        console.log(response.payload);
	})
    console.log()
}

// Login

var login = function (req, res, next) {

    Account.findOne({ email: req.body.email }, function (err, user) {

        if (!user) {
            console.error("Email not found");
            res.json("False");
            return false;
        }
        else {
            if (req.body.password == user.password) {
                console.log("User logged in");
                res.send(user._id);
                return true;
            }
        }
    });

}


// Read Account
var readAccount = function(req, res) {
    var accountId = req.body.accountId;

    Account.findById(accountId, function(err, doc) {
     if (err || doc == undefined) {
      console.error('account not found');
	 } else {
      res.send(doc);
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

    res.redirect('/');
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
