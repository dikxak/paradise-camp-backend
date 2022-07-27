const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');

const {
  bookSpot,
  getBookings,
  getBookingsSpot,
} = require('../controller/bookingController');

router.route('/').post(userGuard, bookSpot);
router.route('/get').get(userGuard, getBookings);
router.route('/get/spot').get(userGuard, getBookingsSpot);

module.exports = router;
