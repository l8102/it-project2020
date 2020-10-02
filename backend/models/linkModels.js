const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
}, {
  collection: 'Link',
  timestamps: true,
});

mongoose.model('links', linkSchema);