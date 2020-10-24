const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  accountId: {
    type: String,
    required: true,
    unique: true
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  accessCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  telephone: {
    type: String,
  },
}, {
  collection: 'Portfolio',
  timestamps: true,
});

mongoose.model('portfolios', portfolioSchema);