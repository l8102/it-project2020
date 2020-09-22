const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  accountId: {
    type: Object,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  collection: 'Portfolio',
  timestamps: true,
});

mongoose.model('portfolios', portfolioSchema);