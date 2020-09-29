// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const Portfolio = mongoose.model('portfolios');

// todo fix this
// const jwt = require("jsonwebtoken");

const { UserRefreshClient } = require('google-auth-library');

// CREATE

// todo implement this
const create = function (req, res, next) {

    // todo in future will need to call each of the portfolio components and create them
}


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

// todo review this

const readByAccountId = function (req, res, next) {

    Portfolio.findOne({ accountID: req.accountID }, function (err, portfolio) {

        if (!portfolio) {
            console.error("Portfolio not found");
            res.json("false");
            return false;
        } else {
            res.send(portfolio._id);
            return true;
        }

    });

};

// todo might not be necessary
const readOne = function (req, res, next) {

    var id = req._id;

    Portfolio.findById(id, function (err, doc) {
        if (err || doc == undefined) {
            console.error('Portfolio not found');
        } else {
            res.send(doc);
        }
    });

}

// todo review this
const updateByAccountId = function (req, res, next) {

    Portfolio.findOne({ accountID: req.accountID }, function (err, doc) {

        if (!doc) {
            console.error("Portfolio not found");
            res.json("false");
            return false;
        } else {
            doc.isPrivate = req.isPrivate;
            doc.telephone = req.telephone;
            doc.email = req.email;
            console.log("Portfolio updated");

            doc.save();
            res.redirect('/');
        }
    });

};

// todo review this
const deleteByAccountId = function(req, res, next) {
    var id = req._id

    //find account by id and deletes
    Portfolio.findByIdAndRemove(id).exec();
    console.log("Portfolio removed");

    // todo in future will need to call each of the portfolio components and delete them

    res.redirect('/');
};

// useful link
// https://stackoverflow.com/questions/8737082/mongoose-schema-within-schema

module.exports = {
    create,
    contactInfo,
    readByAccountId,
    readOne,
    updateByAccountId,
    deleteByAccountId,
    tokenIsValid
}