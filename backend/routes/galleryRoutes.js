const express = require('express');
const galleryRoutes = express.Router();
const galleryControllers = require('../controllers/galleryControllers');

// // CREATE
// // handled by create account
//
// // READ
// galleryRoutes.get('/readGallery', galleryControllers.readGallery);
//
// // UPDATE
// galleryRoutes.put('/updateGallery', galleryControllers.updateGallery);
//
// // DELETE
// // handled by delete account

module.exports = galleryRoutes;