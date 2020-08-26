// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

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

// Export controllers
module.exports = {
  createAccount
}

