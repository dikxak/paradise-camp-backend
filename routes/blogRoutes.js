const express = require('express');
const router = new express.Router();

const { userGuard } = require('../auth/auth');
const { addBlog } = require('../controller/blogController');

router.route('/add').post(userGuard, addBlog);

module.exports = router;
