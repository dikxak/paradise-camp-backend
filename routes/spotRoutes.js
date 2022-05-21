const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');
const { addSpot } = require('../controller/spotController');

// Adding Location
router.route('/add').post(userGuard, addSpot);

module.exports = router;
