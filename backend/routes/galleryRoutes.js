const express = require('express');
const galleryRoutes = express.Router();
const galleryControllers = require('../controllers/galleryControllers');

// CREATE
galleryRoutes.post('/addGallery', galleryControllers.createGallery);

// READ
galleryRoutes.get('/readGallery', galleryControllers.readGallery);

// UPDATE
galleryRoutes.put('/updateGallery', galleryControllers.updateGallery);

// DELETE
galleryRoutes.delete('/deleteGallery', galleryControllers.deleteGallery);

module.exports = galleryRoutes;