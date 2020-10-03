const express = require('express');
const portfolioRoutes = express.Router();
const portfolioControllers = require('../controllers/portfolioControllers');
const authenticate = require("../middleware/auth");

// CREATE
// handled by create account

portfolioRoutes.post('/contactInfo', authenticate, portfolioControllers.contactInfo);

portfolioRoutes.post('/tokenIsValid', portfolioControllers.tokenIsValid);

// READ

portfolioRoutes.get('/readByAccountId', portfolioControllers.readByAccountId);

// UPDATE

portfolioRoutes.put('/updateByAccountId', portfolioControllers.updateByAccountId);

// DELETE
// handled by delete account

module.exports = portfolioRoutes;