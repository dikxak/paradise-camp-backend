const mongoose = require('mongoose');

const SpotModel = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
});

module.exports = mongoose.model('CustomerPost', SpotModel);
