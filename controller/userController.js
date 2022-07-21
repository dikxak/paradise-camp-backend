const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Spot = require('../models/spotModel');
const Blog = require('../models/blogModel');
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
        statusCode: 200,
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
      res.status(200);
      res.json({
        userId: user._id,
        token: generateToken(user._id),
        userName: `${user.firstName} ${user.lastName}`,
      });
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all user information except password
    const userData = await User.findById(userId).select('-password');

    if (userData) {
      res.status(200);
      res.json({ userData: userData });
    } else {
      throw new Error("User doesn't exists.");
    }
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) throw new Error("User doesn't exists.");

    const updatedUserData = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json({ updatedUserData: updatedUserData });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const uploadLocationImage = async (req, res) => {
  try {
    if (!req.file) throw new Error('File type not supported');

    const spotData = await Spot.find({ userId: req.user._id });

    await Spot.updateOne(
      { id: spotData._id },
      { imageURL: `http://localhost:90/users/image/${req.file.filename}` }
    );

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) throw new Error('File type not supported');

    const blogData = await Blog.find({ userId: req.user._id });

    await Blog.updateOne(
      { id: blogData._id },
      { imageURL: `http://localhost:90/images/${req.file.filename}` }
    );

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

//Get the image from URL
// const getUploadedImage = (req, res) => {
//   // if (!req.user) return res.json({ message: 'Not authorized.' });

//   const { filename } = req.params;

//   if (!fs.existsSync('./images'))
//     return res.json({ message: 'No directory named images' });

//   if (
//     !fs.existsSync(`./images/${filename}.jpg`) &&
//     !fs.existsSync(`./images/${filename}.png`) &&
//     !fs.existsSync(`./images/${filename}.gif`)
//   )
//     return res.json({ message: 'No such file or directory' });

//   res.sendFile(`${filename}.jpg`, {
//     root: path.join(__dirname, '../images'),
//   });
// };

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  uploadLocationImage,
  uploadBlogImage,
};
