const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  portfolioId: {
    type: String,
    required: true
  },
}, {
  collection: 'Link',
  timestamps: true,
});

mongoose.model('links', linkSchema);