// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const jwt = require("jsonwebtoken");
const { UserRefreshClient } = require('google-auth-library');

const contactInfo = async (req, res) => {
  //should be able to see the logged in user based on the token 
  console.log(req.user)
  const name = user.firstName + user.lastName;
  
};

const tokenIsValid = async (req, res) => {
  try {

    //check token exists 
    const token = req.header("x-auth-token");
    if (!token)
      return res.json(false);

    //check the token has been verified
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.json(false);

    //check the user exists 
    const user = await Account.findById(verified.id);
    if (!user)
      return res.json(false);

    //return true if all checks complete 
    return res.json(true);

  } catch (err) {
    res.status(500).json({ error: err.mesage });
  }
};

module.exports = {
    contactInfo,
    tokenIsValid
}