const express = require('express');
const portfolioRoutes = express.Router();
const portfolioController = require('../controllers/portfolioControllers');
const authenticate = require("../middleware/auth");

// CREATE

portfolioRoutes.post('/contactInfo', authenticate, portfolioController.contactInfo);

portfolioRoutes.post('/tokenIsValid', portfolioController.tokenIsValid);

//
module.exports = portfolioRoutes;