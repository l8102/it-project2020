const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String, 
    required: false
  }
}, {
  collection: 'File',
  timestamps: true,
});

mongoose.model('files', fileSchema);