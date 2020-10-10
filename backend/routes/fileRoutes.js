const express = require('express');
const fileRoutes = express.Router();
const fileControllers = require('../controllers/fileControllers');

// CREATE
// // handled by create account
fileRoutes.post('/uploadFile', fileControllers.uploadFile);

// READ

// UPDATE

// DELETE
// // handled by delete account

module.exports = fileRoutes;