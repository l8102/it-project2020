const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema  = new Schema({
  portfolioId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  collection: 'Gallery',
  timestamps: true,
});

mongoose.model('galleries', gallerySchema);