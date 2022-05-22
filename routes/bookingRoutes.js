const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');

const { bookSpot, getSpot } = require('../controller/bookingController');

router.route('/').post(userGuard, bookSpot);
router.route('/get').get(userGuard, getSpot);

module.exports = router;
