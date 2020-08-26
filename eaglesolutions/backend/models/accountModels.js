const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
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
    trim: false, // todo do we need validation on emails / passwords
    minlength: 8
  },
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
  profileImage: {
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

// todo check if module exports is needed