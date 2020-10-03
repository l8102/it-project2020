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

accountRoutes.get('/read', accountControllers.readAccount);



// UPDATE

accountRoutes.put('/updateName', accountControllers.updateName);


accountRoutes.put('/updateProfileImage', accountControllers.updateProfileImage);


// DELETE

accountRoutes.delete('/delete', accountControllers.deleteAccount);


// Export Routes
module.exports = accountRoutes;