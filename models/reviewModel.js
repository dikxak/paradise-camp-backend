const mongoose = require('mongoose');

const reviewModel = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  spotId: {
    type: mongoose.Types.ObjectId,
    ref: 'Spot',
  },
  text: {
    type: String,
    required: true,
  },
  reviewedDate: {
    type: Date,
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewModel);
