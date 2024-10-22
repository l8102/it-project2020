const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1
  },
  // This is used for searching
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 8
  },
  profilePicture: {
    type: String,
    required: false,
    unique: false,
    minlength: 1
  }
}, {
  collection: 'Account',
  timestamps: true,
});

mongoose.model('accounts', accountSchema);