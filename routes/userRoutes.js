const express = require('express');
const router = new express.Router();
const { userGuard } = require('../auth/auth');
const upload = require('../upload/imageUpload');

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  uploadLocationImage,
  uploadBlogImage,
  getUploadedImage,
} = require('../controller/userController');

// Get User
router.get('/me', userGuard, getUser);

// Customer Register
router.post('/register', registerUser);

// Customer login
router.post('/login', loginUser);

// Update User
router.route('/update').put(userGuard, updateUser);

// img - for postman
// upload location image
router
  .route('/picture/upload/location')
  .put(userGuard, upload.single('img'), uploadLocationImage);

// upload blog image
router
  .route('/picture/upload/blog')
  .put(userGuard, upload.single('img'), uploadBlogImage);

router.route('/image/:filename.jpg').get(userGuard, getUploadedImage);

module.exports = router;
