const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
}, {
  collection: 'File',
  timestamps: true,
});

mongoose.model('files', fileSchema);