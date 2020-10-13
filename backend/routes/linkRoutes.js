const express = require('express');
const linkRoutes = express.Router();
const linkControllers = require('../controllers/linkControllers');

// CREATE
// // handled by create account

// READ
linkRoutes.get('/readLinks', linkControllers.readLink);

// UPDATE
linkRoutes.put('/updateLinks', linkControllers.updateByAccountId);

// DELETE
// // handled by delete account

module.exports = linkRoutes;