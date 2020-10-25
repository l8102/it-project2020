const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  accountId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
  },
  telephone: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  accessCode: {
    type: String,
    required: true
  },
  colour: {
    type: String,
    default: "blue"
  }
}, {
  collection: 'Portfolio',
  timestamps: true,
});

mongoose.model('portfolios', portfolioSchema);