// import libraries
const mongoose = require('mongoose');
const Link = mongoose.model('links');


// CREATE
const create = function (accountId) {

  let link = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new Link(link);

  // saves entry to the database
  data.save();
  console.log("link created")
};

// READ
const readLink = function(req, res) {
  Link.findOne({ "accountId": req.query.accountId }, function(err, links) {
    if(err || links === undefined) {
      console.error("Links not found");
      res.send("false");
      return false;
    } else {
      console.log("Links found");
      res.json(links);
      return true;
    }
  })  
}

// UPDATE
const updateByAccountId = function(req, res, next) {
  Link.findOne({ "accountId": req.body.accountId }, function(err, link) {
    if(err || link === undefined) {
      console.error("Links not found");
      res.send("false");
      return false;
    } else {
      link.links = req.body.state.linksList;
      link.save();
      console.log("Links updated");
      res.json(link);
      return true;
    }
  })  
}

// DELETE


// export controllers
module.exports = {
  create,
  readLink,
  updateByAccountId
}