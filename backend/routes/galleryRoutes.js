const express = require('express');
const galleryRoutes = express.Router();
const galleryControllers = require('../controllers/galleryControllers');


// CREATE
galleryRoutes.post('/upload', galleryControllers.uploadImage);

// READ
//galleryRoutes.get('/images', galleryControllers.images);
galleryRoutes.post('/getImages', galleryControllers.getImages);


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