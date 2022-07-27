const express = require('express');
const router = new express.Router();

const upload = require('../upload/imageUpload');
const { userGuard } = require('../auth/auth');
const {
  addBlog,
  getBlogUser,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
} = require('../controller/blogController');

router.route('/all').get(getAllBlogs);
router.route('/:id').get(userGuard, getBlog);
router.route('/get/me').get(userGuard, getBlogUser);
router.route('/add').post(userGuard, upload.single('img'), addBlog);
router.route('/update/:id').put(userGuard, upload.single('img'), updateBlog);
router.route('/delete/:id').delete(userGuard, deleteBlog);

module.exports = router;
