const Review = require('../models/reviewModel');
const User = require('../models/userModel');

const getReviewUser = async (req, res) => {
  try {
    const user = req.user;
    const { spotId } = req.body;

    if (!user) {
      res.status(400);
      throw new Error('User not authorized.');
    }

    if (!spotId) {
      res.status(400);
      throw new Error('No any spot.');
    }

    const reviewData = await Review.find({ userId: user.id, spotId: spotId });

    res.json({ reviewData: reviewData });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      throw new Error('No any spot.');
    }

    const reviews = await Review.find({ spotId: id });

    if (!reviews) throw new Error('Error while getting reviews!');

    res.send({ reviewData: reviews });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const addReview = async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(400);
    throw new Error('User not authorized.');
  }

  const { text, spotId } = req.body;

  if (!spotId) {
    res.status(400);
    throw new Error('No any spot.');
  }

  if (!text) {
    res.status(400);
    throw new Error('Please fill all the fields.');
  }

  const { firstName, lastName } = await User.findById(user.id);

  const reviewData = await Review.create({
    text,
    reviewedDate: new Date().toISOString(),
    userId: user.id,
    spotId,
    userFullName: `${firstName} ${lastName}`,
  });

  res.json({ reviewData: reviewData });
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const reviewData = await Review.findById(reviewId);

    if (!reviewData) {
      res.status(400);
      throw new Error('No review found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User not found.');
    }

    if (reviewData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });

    res.status(200).json(updatedReview);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const reviewData = await Review.findById(reviewId);

    if (!reviewData) {
      res.status(400);
      throw new Error('No review found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User not found.');
    }

    if (reviewData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json(reviewId);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addReview,
  getReviewUser,
  getAllReviews,
  updateReview,
  deleteReview,
};
