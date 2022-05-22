const express = require('express');
const router = new express.Router();
const { userGuard } = require('../auth/auth');
const upload = require('../upload/imageUpload');

const {
  registerUser,
  loginUser,
  getUser,
  uploadLocationImage,
  getLocationImage,
} = require('../controller/userController');

// Customer Register
router.post('/register', registerUser);

// Customer login
router.post('/login', loginUser);

// Get User
router.get('/me', userGuard, getUser);

// img - for postman
router
  .route('/picture/upload')
  .put(userGuard, upload.single('img'), uploadLocationImage);

router.route('/image/:filename.jpg').get(userGuard, getLocationImage);

module.exports = router;
