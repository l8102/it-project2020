// import libraries
const mongoose = require('mongoose');
const File = mongoose.model('files');

// CREATE
const create = function (accountId) {

  let file = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new File(file);

  // saves entry to the database
  data.save();
  console.log("file created")
};

// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
  create
}