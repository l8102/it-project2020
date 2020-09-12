const express = require('express');
const portfolioRoutes = express.Router();
const portfolioController = require('../controllers/portfolioControllers');

// CREATE

portfolioRoutes.post('/contactInfo', portfolioController.contactInfo);

//
module.exports = portfolioRoutes;