// import libraries
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

const contactInfo = function(req, res, next) {
    console.log(req.body)
  };

module.exports = {
    contactInfo
}