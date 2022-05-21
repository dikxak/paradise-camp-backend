const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserModel);
