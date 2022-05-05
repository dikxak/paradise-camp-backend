const mongoose = require('mongoose');

const CustomerModel = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bookings: {
    type: Array,
  },
});

module.exports = mongoose.model('Customer', CustomerModel);
