// import libraries
const mongoose = require('mongoose');
const Link = mongoose.model('links');


// CREATE

// Create a new link record in the database using the account id
const create = function (accountId) {

  let link = {
    accountId: accountId,
  };

  // creates a new link using the account id
  const data = new Link(link);

  // saves entry to the database
  data.save();
  console.log("link created")
};

// READ
// Returns the links for a specified account id
const readLink = function (req, res) {
  Link.findOne({"accountId": req.query.accountId}, function (err, links) {
    if (err || links === undefined) {
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

// Updates the links for a specified account id
const updateByAccountId = function (req, res, next) {
  Link.findOne({"accountId": req.body.accountId}, function (err, link) {
    if (err || link === undefined) {
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