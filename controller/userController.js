const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Spot = require('../models/spotModel');
const path = require('path');
const fs = require('fs');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, dob, password, email, phoneNo } = req.body;

    if (!firstName || !lastName || !dob || !password || !email || !phoneNo) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const userPresent = await User.findOne({ email });

    if (userPresent) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      phoneNo,
    });

    if (userData) {
      res.status(200);
      res.json({
        _id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        token: generateToken(userData._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data.');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const uploadLocationImage = async (req, res) => {
  try {
    if (!req.file) throw new Error('File type not supported');

    const spotData = await Spot.find({ userId: req.user._id });
    console.log(spotData);

    await Spot.updateOne(
      { id: spotData._id },
      { imageURL: `http://localhost:90/users/image/${req.file.filename}` }
    );

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Get the image from URL
const getLocationImage = (req, res) => {
  if (!req.user) return res.json({ message: 'Not authorized.' });

  const { filename } = req.params;

  if (
    !fs.existsSync('./images') &&
    !fs.existsSync(`./images/${filename}.jpg`) &&
    !fs.existsSync(`./images/${filename}.png`) &&
    !fs.existsSync(`./images/${filename}.gif`)
  )
    return res.json({ message: 'No such file or directory' });

  res.sendFile(`${filename}.jpg`, {
    root: path.join(__dirname, '../images'),
  });
};

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  uploadLocationImage,
  getLocationImage,
};
