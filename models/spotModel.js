const mongoose = require('mongoose');

const SpotModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  availableSpotNo: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    // required: true,
  },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Spot', SpotModel);
