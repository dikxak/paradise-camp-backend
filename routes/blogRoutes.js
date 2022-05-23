const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');
const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogController');

router.route('/').get(userGuard, getBlog);
router.route('/add').post(userGuard, addBlog);
router.route('/update/:id').put(userGuard, updateBlog);
router.route('/delete/:id').delete(userGuard, deleteBlog);

module.exports = router;
