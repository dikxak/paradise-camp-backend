const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');
const { addSpot, updateSpot } = require('../controller/spotController');

// Adding Location
router.route('/add').post(userGuard, addSpot);
router.route('/update/:id').put(userGuard, updateSpot);

module.exports = router;
