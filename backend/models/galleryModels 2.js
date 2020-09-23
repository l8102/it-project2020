const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema  = new Schema({
  portfolioId: {
    type: Object,
    required: true
  },
}, {
  collection: 'Gallery',
  timestamps: true,
});

mongoose.model('galleries', gallerySchema);