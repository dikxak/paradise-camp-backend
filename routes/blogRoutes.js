const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');
const {
  addBlog,
  getBlog,
  updateBlog,
} = require('../controller/blogController');

router.route('/').get(userGuard, getBlog);
router.route('/add').post(userGuard, addBlog);
router.route('/update/:id').put(userGuard, updateBlog);

module.exports = router;
