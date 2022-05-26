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

router.route('/add').post(userGuard, addReview);
router.route('/get/user').get(userGuard, getReviewUser);
router.get('/get/all', getAllReviews);
router.route('/update/:id').put(userGuard, updateReview);
router.route('/delete/:id').delete(userGuard, deleteReview);

module.exports = router;
