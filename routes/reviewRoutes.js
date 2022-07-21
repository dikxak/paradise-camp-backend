const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');

const {
  getReviewUser,
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require('../controller/reviewController');

router.get('/get/all/:id', getAllReviews);
router.route('/add').post(userGuard, addReview);
router.route('/get/user').get(userGuard, getReviewUser);
router.route('/update/:id').put(userGuard, updateReview);
router.route('/delete/:id').delete(userGuard, deleteReview);

module.exports = router;
