const express = require('express');
const aboutRoutes = express.Router();
const aboutControllers = require('../controllers/aboutControllers');

// // CREATE
// // handled by create account
//
// // READ
// aboutRoutes.get('/readAbout', aboutControllers.readAbout);
//
// // UPDATE
// aboutRoutes.put('/updateAbout', aboutControllers.updateAbout);
//
// // DELETE
// // handled by delete account

module.exports = aboutRoutes;