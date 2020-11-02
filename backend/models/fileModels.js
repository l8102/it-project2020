const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  fileVersion: {
    type: String,
    required: false
  },
  filePublicId: {
    type: String,
    required: false
  },
  filePages: {
    type: Number,
    required: false
  }
}, {
  collection: 'File',
  timestamps: true,
});

mongoose.model('files', fileSchema);