const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema  = new Schema({
  accountId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
}, {
  collection: 'Gallery',
  timestamps: true,
});

mongoose.model('galleries', gallerySchema);