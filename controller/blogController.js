const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const getBlog = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogData = await Blog.find({ userId: userId });

    res.send({ blogData: blogData });
  } catch (err) {
    res.send({ errorMessage: err.message, stack: err.stack });
  }
};

const addBlog = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(400);
      throw new Error('User not authorized.');
    }

    const { title, description, writtenDate, subtitle } = req.body;

    if (!title || !description || !writtenDate) {
      res.status(400);
      throw new Error('Please fill the required fields.');
    }

    const blogData = await Blog.create({
      title,
      description,
      writtenDate,
      subtitle,
      userId: req.user.id,
    });

    if (blogData) {
      res.status(200);
      res.json({
        title: blogData.title,
        description: blogData.description,
        writtenDate: blogData.writtenDate,
        userId: blogData.userId,
      });
    } else {
      res.status(400);
      throw new Error('Invalid blog data.');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

module.exports = { getBlog, addBlog };
