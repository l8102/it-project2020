const express = require('express');
const accountRoutes = express.Router();
const accountController = require("../controllers/accountControllers");

// CREATE

accountRoutes.post('/create', function(req, res) {
	accountController.createAccount
});



// GOOGLE SIGN IN
accountRoutes.post('/googlelogin', accountController.googleLogin);


// LOGIN

accountRoutes.get('/login', function (req, res) {
	accountController.login
});


// READ

accountRoutes.get('/read', function(req, res) {
	accountController.readAccount
});


// UPDATE

accountRoutes.put('/updateName', function(req, res) {
	accountController.updateName
});


accountRoutes.put('/updateProfileImage', function (req, res) {
	accountController.updateProfileImage
});


// DELETE

accountRoutes.delete('/delete', function(req, res) {
	accountController.deleteAccount
});



// Export Routes
module.exports = accountRoutes;