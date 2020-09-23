const express = require('express');
const portfolioRoutes = express.Router();
const portfolioControllers = require('../controllers/portfolioControllers');
const authenticate = require("../middleware/auth");

// CREATE

// todo should be called when an account is created
// create
portfolioRoutes.post('/contactInfo', authenticate, portfolioControllers.contactInfo);

portfolioRoutes.post('/tokenIsValid', portfolioControllers.tokenIsValid);

// READ

// todo readByAccountId
portfolioRoutes.get('/readByAccountId', portfolioControllers.readByAccountId)

// todo readOne
portfolioRoutes.get('/readOne', portfolioControllers.readOne)

// UPDATE

// todo updateByAccountId
portfolioRoutes.put('/updateByAccountId', portfolioControllers.updateByAccountId)

// DELETE

// todo should be called when an account is deleted
// todo deleteByAccountId
portfolioRoutes.delete('/deleteByAccountId', portfolioControllers.deleteByAccountId);

module.exports = portfolioRoutes;