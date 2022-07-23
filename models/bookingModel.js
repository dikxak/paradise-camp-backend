const mongoose = require('mongoose');

const BookingModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  spotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot',
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Booking', BookingModel);
