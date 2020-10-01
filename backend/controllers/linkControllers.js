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

// UPDATE

// DELETE


// export controllers
module.exports = {
  create
}