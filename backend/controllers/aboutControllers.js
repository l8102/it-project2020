// import libraries
const mongoose = require('mongoose');
const About = mongoose.model('abouts');


// CREATE
const create = function (accountId) {

  let about = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new About(about);

  // saves entry to the database
  data.save();
  console.log("about created")
};

// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
  create
}