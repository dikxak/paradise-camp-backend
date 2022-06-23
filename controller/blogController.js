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

    const imgFile = req.file;

    if (!title || !description || !writtenDate) {
      res.status(400);
      throw new Error('Please fill the required fields.');
    }

    if (!imgFile) {
      res.send({ message: 'Please upload image.' });
    }

    if (imgFile) {
      let basePath;
      const fileName = imgFile.filename;

      if (req.get('host').includes('10.0.2.2')) {
        basePath = `${req.protocol}://${req
          .get('host')
          .replace('10.0.2.2', 'localhost')}/images/`;
      } else {
        basePath = `${req.protocol}://${req.get('host')}/images/`;
      }

      imageURL = basePath + fileName;
    }

    const blogData = await Blog.create({
      title,
      description,
      writtenDate,
      subtitle,
      imageURL,
      userId: req.user.id,
    });

    if (blogData) {
      res.status(200);
      res.json({
        message: 'Blog added successfully.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid blog data.');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blogData = await Blog.findById(blogId);

    if (!blogData) {
      res.status(400);
      throw new Error('No blog found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User Not Found');
    }

    if (blogData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blogData = await Blog.findById(blogId);

    if (!blogData) {
      res.status(400);
      throw new Error('No blog found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User Not Found');
    }

    if (blogData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json(blogId);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { getBlog, addBlog, updateBlog, deleteBlog };
