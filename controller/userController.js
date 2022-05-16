import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

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

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, 'dikxak', {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser };
