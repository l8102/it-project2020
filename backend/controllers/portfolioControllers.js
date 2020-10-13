// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const Portfolio = mongoose.model('portfolios');
const {cloudinary} = require('../utils/cloudinary');

// todo fix this
// const jwt = require("jsonwebtoken");

const { UserRefreshClient } = require('google-auth-library');

// CREATE

const create = function (accountId, email) {

  let portfolio = {
      accountId: accountId,
      email: email
  };

  // creates a new portfolio using the account id
  const data = new Portfolio(portfolio);

  // saves entry to the database
  data.save();
  console.log("portfolio created")
};


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


// READ

const readByAccountId = function (req, res, next) {

    Portfolio.findOne({ "accountId": req.query.accountId }, function (err, portfolio) {

        if (err || portfolio === undefined) {
            console.error("Portfolio not found");
            res.send("false");
            return false;
        } else {
            console.log("Portfolio found");
            res.json(portfolio);
            return true;
        }
    });
};


// UPDATE 
const updateByAccountId = function (req, res, next) {

    Portfolio.findOne({ "accountId": req.body.accountId }, function (err, portfolio) {

        if (err || portfolio === undefined) {
            console.error("Portfolio not found");
            res.send("false");
            return false;
        } else {
            portfolio.isPrivate = req.body.isPrivate;
            portfolio.telephone = req.body.telephone;
            portfolio.email = req.body.email;
            portfolio.save();

            console.log("Portfolio updated");
            res.json(portfolio);
            return true;
        }
    });
};

// todo implement this | Not working properly
const deleteByAccountId = function(req, res, next) {

    //find account by id and deletes
    Portfolio.remove({ "accountId": req.body.accountId });
    console.log("Portfolio removed");

    // todo in future will need to call each of the portfolio components and delete them
};

const uploadProfilePicture = function (req, res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
        upload_preset: 'FileUpload',
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
}

const getProfilePicture = function(req, res) {
  Portfolio.find({accountId: req.body.accountId}, function(err, doc) {
    if(err || doc == undefined) {
      console.error("Image not found")
    } else {
      res.send(doc);
    }
  })
}

// useful link
// https://stackoverflow.com/questions/8737082/mongoose-schema-within-schema

module.exports = {
    create,
    contactInfo,
    readByAccountId,
    updateByAccountId,
    deleteByAccountId,
    tokenIsValid
}