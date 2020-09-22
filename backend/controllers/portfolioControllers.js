// import libraries
const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolios');
const Account = mongoose.model('accounts');

const contactInfo = function(req, res, next) {
    console.log(req.body)
  };

// todo get portfolios with specific account id

const readByAccountId = function(req, res, next) {

};

const readOne = function(req, res, next) {

}

const updateByAccountId = function(req, res, next) {

};

const deleteByAccountId = function(req, res, next) {

};

// useful link
// https://stackoverflow.com/questions/8737082/mongoose-schema-within-schema

module.exports = {
    contactInfo,
    readByAccountId,
    readOne,
    updateByAccountId,
    deleteByAccountId
}