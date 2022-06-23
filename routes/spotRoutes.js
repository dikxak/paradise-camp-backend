const express = require('express');
const router = new express.Router();

const upload = require('../upload/imageUpload');

const { userGuard } = require('../auth/auth');
const {
  addSpot,
  updateSpot,
  deleteSpot,
  getSpot,
  getSpotSearch,
} = require('../controller/spotController');

// Adding Location
router.route('/').get(userGuard, getSpot);
router.route('/add').post(userGuard, upload.single('img'), addSpot);
router.route('/update/:id').put(userGuard, updateSpot);
router.route('/delete/:id').delete(userGuard, deleteSpot);
router.get('/search/:name', getSpotSearch);

module.exports = router;
