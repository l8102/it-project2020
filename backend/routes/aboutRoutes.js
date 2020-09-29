const express = require('express');
const aboutRoutes = express.Router();
const aboutControllers = require('../controllers/aboutControllers');

// // CREATE
// aboutRoutes.post('/addAbout', aboutControllers.createAbout);
//
// // READ
// aboutRoutes.get('/readAbout', aboutControllers.readAbout);
//
// // UPDATE
// aboutRoutes.put('/updateAbout', aboutControllers.updateAbout);
//
// // DELETE
// aboutRoutes.delete('/deleteAbout', aboutRoutes.deleteAbout);

module.exports = aboutRoutes;