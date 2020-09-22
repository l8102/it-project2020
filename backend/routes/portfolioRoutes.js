const express = require('express');
const portfolioRoutes = express.Router();
const portfolioController = require('../controllers/portfolioControllers');

// CREATE

// todo should be called when an account is created
portfolioRoutes.post('/contactInfo', portfolioController.contactInfo);

// READ

// todo readByAccountId
portfolioRoutes.get('/readByAccountId', portfolioController.readByAccountId)

// todo readOne
portfolioRoutes.get('/readOne', portfolioController.readOne)

// UPDATE

// todo updateByAccountId
portfolioRoutes.put('/updateByAccountId', portfolioController.updateByAccountId)

// DELETE

// todo should be called when an account is deleted
// todo deleteByAccountId
portfolioRoutes.delete('/deleteByAccountId', portfolioController.deleteByAccountId);

module.exports = portfolioRoutes;