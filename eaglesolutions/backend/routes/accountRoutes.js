const express = require('express');
const accountRoutes = express.Router();
const accountController = require('../controllers/accountControllers');

// CREATE

accountRoutes.post('/create', accountController.createAccount);

//
module.exports = accountRoutes;

// Michael's previous code

// // If it is a GET request
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
//
//
// // If it is a POST request
// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//
//   const newUser = new User({username});
//
//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });