const express = require('express');
const router = new express.Router();

const upload = require('../upload/imageUpload');

const { userGuard } = require('../auth/auth');
const {
  addSpot,
  updateSpot,
  deleteSpot,
  getSpotUser,
  getSpotSearch,
  getSpotType,
  getAllSpots,
  getSpot,
  getAllCoords,
} = require('../controller/spotController');

// Adding Location
router.route('/all').get(getAllSpots);
router.route('/all/coords').get(getAllCoords);
router.route('/type=:type').get(getSpotType);
router.route('/get/me').get(userGuard, getSpotUser);
router.route('/:id').get(userGuard, getSpot);
router.route('/add').post(userGuard, upload.single('img'), addSpot);
router.route('/update/:id').put(userGuard, upload.single('img'), updateSpot);
router.route('/delete/:id').delete(userGuard, deleteSpot);
router.get('/search/:name', getSpotSearch);

module.exports = router;
