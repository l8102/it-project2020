const express = require('express');
const accountRoutes = express.Router();
const accountControllers = require("../controllers/accountControllers");

// CREATE
accountRoutes.post('/create', accountControllers.createAccount);



// GOOGLE SIGN IN
accountRoutes.post('/googlelogin', accountControllers.googleLogin);


// LOGIN
accountRoutes.post('/login', accountControllers.login);


// READ

accountRoutes.get('/read', function(req, res) {
	accountControllers.readAccount
});


// UPDATE

accountRoutes.put('/updateName', function(req, res) {
	accountControllers.updateName
});


accountRoutes.put('/updateProfileImage', function (req, res) {
	accountControllers.updateProfileImage
});


// DELETE

accountRoutes.delete('/delete', function(req, res) {
	accountControllers.deleteAccount
});


// Export Routes
module.exports = accountRoutes;