// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const {OAuth2Client} = require('google-auth-library');

// Create new account
const createAccount = function(req, res, next) {
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
};


// Google Login 
const client = new OAuth2Client("897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com");

var googleLogin = function(req, res) {
    const {tokenId} = req.body;

     client.verifyIdToken({idToken: tokenId, audience: "897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"}).then(response => {
        const {email_verified, email, given_name, family_name, picture} = response.payload;

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

                            // WHAT TO SET PASSWORD??
                            var password = email;


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



// Read Account

// todo 




/*
// Update Name
var updateName = function(req, res, next) {
    var id = req.body.id;

    //finds account by an id and updates name
    Accounts.findById(id, function(err, doc) {
        if (err || doc == undefined) {
            console.error('error, no account found');
        } else {
            doc.firstName = req.body.firstName;
            doc.lastName = req.body.lastName;
            //console.log('name updated');

            doc.save();
            res.redirect('/');
        }
    });
};
*/

/*

// Delete account
var deleteAccount = function(req, res, next) {
    var id = req.body.id;

    //find account by id and deletes
    Accounts.findByIdAndRemove(id).exec();
    //console.log("account removed");

    res.redirect('/');
};
*/

// Export controllers
module.exports = {
  googleLogin

}
