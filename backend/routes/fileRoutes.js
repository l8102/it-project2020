const express = require('express');
const fileRoutes = express.Router();
const fileControllers = require('../controllers/fileControllers');

// CREATE
fileRoutes.post('/uploadFile', fileControllers.uploadFile);

// READ
fileRoutes.post('/getFiles', fileControllers.getFiles);

// UPDATE

// DELETE
// handled by delete account

module.exports = fileRoutes;