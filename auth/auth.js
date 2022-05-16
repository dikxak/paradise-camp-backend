const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');

const userGuard = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(401);
      throw new Error('Not Authorized, No Token');
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) return;

    req.user = await User.findById(decodedData.id);

    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { userGuard };
