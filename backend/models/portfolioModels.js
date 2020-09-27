const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  accountId: {
    type: Object,
    required: true,
    unique: true
  },
  isPrivate: {
    type: Boolean,
    default: false,
    required: true
  },
  email: {
    type: String,
  },
  telephone: {
    type: String,
  }
}, {
  collection: 'Portfolio',
  timestamps: true,
});

mongoose.model('portfolios', portfolioSchema);