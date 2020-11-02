// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const Portfolio = mongoose.model('portfolios');
const About = mongoose.model('abouts');
const Gallery = mongoose.model('galleries');
const File = mongoose.model('files');
const Link = mongoose.model('links');

// Deletes the entire database if the admin password is entered
const deleteAll = function (req, res, next) {

  // Read in the password
  const password = req.body.password;

  // If the password matches then delete
  if (password === "admin") {
    deleteItems(Account, res);
    deleteItems(Portfolio, res);
    deleteItems(About, res);
    deleteItems(Gallery, res);
    deleteItems(File, res);
    deleteItems(Link, res);
    console.log("Deleted all accounts");
  } else {
    console.log("Incorrect password");
  }
};

// Deletes the items (records) from a specified collection
const deleteItems = function (item, res) {
  item.deleteMany({}, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.end('success');
    }
  });
}

module.exports = {
  deleteAll
}