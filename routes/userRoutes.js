const express = require('express');
const router = new express.Router();
const { userGuard } = require('../auth/auth');
const upload = require('../upload/imageUpload');

const {
  registerUser,
  loginUser,
  uploadLocationImage,
  getLocationImage,
} = require('../controller/userController');

// Customer Register
router.post('/register', registerUser);

// Customer login
router.post('/login', loginUser);

// img - for postman
router
  .route('/picture/upload')
  .put(userGuard, upload.single('img'), uploadLocationImage);

router.route('/image/:filename.jpg').get(userGuard, getLocationImage);

module.exports = router;
