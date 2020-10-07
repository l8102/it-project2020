const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  additionals: {
    type: { title: String, description: String, link: String},
    value: [{ title: String, description: String, link: String}],
  }
}, {
  collection: 'Link',
  timestamps: true,
});

mongoose.model('links', linkSchema);