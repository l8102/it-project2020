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

module.exports = galleryRoutes;