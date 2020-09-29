const express = require('express');
const galleryRoutes = express.Router();
const galleryControllers = require('../controllers/galleryControllers');


// CREATE
galleryRoutes.post('/upload', galleryControllers.uploadImage);

// READ

// UPDATE

// DELETE

module.exports = galleryRoutes;