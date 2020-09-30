const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  portfolioId: {
    type: String,
    required: true
  },
}, {
  collection: 'About',
  timestamps: true,
});

mongoose.model('abouts', aboutSchema);