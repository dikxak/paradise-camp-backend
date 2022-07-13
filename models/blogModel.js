const mongoose = require('mongoose');

const BlogModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  writtenDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  authorName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Blog', BlogModel);
