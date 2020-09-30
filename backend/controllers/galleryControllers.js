// import libraries
const mongoose = require('mongoose');
const Gallery = mongoose.model('galleries');


// CREATE
const create = function (accountId) {

  let gallery = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new Gallery(gallery);

  // saves entry to the database
  data.save();
  console.log("gallery created")
};

// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
  create
}