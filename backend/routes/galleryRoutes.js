const express = require('express');
const galleryRoutes = express.Router();
const galleryControllers = require('../controllers/galleryControllers');


// CREATE
galleryRoutes.post('/upload', galleryControllers.uploadImage);

// READ
//galleryRoutes.get('/images', galleryControllers.images);
galleryRoutes.post('/getImages', galleryControllers.getImages);

// UPDATE

// DELETE
// handled by delete account
galleryRoutes.delete('deleteAll', galleryControllers.deleteAllImages);

module.exports = galleryRoutes;