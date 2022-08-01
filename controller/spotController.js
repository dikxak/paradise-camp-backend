const Spot = require('../models/spotModel');
const User = require('../models/userModel');

// utility function to capitalize first letter.
const getCapitalizedString = str => {
  if (str.includes(' ')) {
    return str
      .split(' ')
      .map(s => {
        return s[0].toUpperCase() + s.substring(1);
      })
      .join(' ');
  }
  return str.split('')[0].toUpperCase() + str.substring(1);
};

const getSpotSearch = async (req, res) => {
  try {
    const spotName = req.params.name;

    if (!spotName) {
      res.status(400);
      throw new Error('No spot name provided');
    }

    const spotData = await Spot.find({
      $or: [{ name: { $regex: getCapitalizedString(spotName) } }],
    }).select('-userId');

    res.json({ spotData: spotData });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getSpot = async (req, res) => {
  try {
    const id = req.params.id;

    const spotData = await Spot.findById(id);
    const { firstName, lastName } = await User.findById(spotData.userId);

    const data = {
      ...spotData._doc,
      authorName: `${firstName} ${lastName}`,
    };

    res.json({ spotData: data });
  } catch (err) {
    res.send({ errorMessage: err.message });
  }
};

// Get data of spot for user who posted it.
const getSpotUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const spotData = await Spot.find({ userId: userId });

    res.send({ data: spotData });
  } catch (err) {
    res.send({ errorMessage: err.message });
  }
};

const getSpotType = async (req, res) => {
  try {
    const { type } = req.params;

    const typeWiseData = await Spot.find({ type: type });

    if (!typeWiseData) {
      throw new Error(`No any spot found for type ${type}`);
    } else {
      res.json({ data: typeWiseData });
    }
  } catch (err) {
    res.send({ errorMessage: err.message });
  }
};

const getAllSpots = async (req, res) => {
  try {
    const allSpots = await Spot.find({});

    res.json({ data: allSpots });
  } catch (err) {
    res.send({ errorMessage: err.message });
  }
};

const getAllCoords = async (req, res) => {
  try {
    const allCoords = await Spot.find({}, 'latitude longitude name');

    if (!allCoords) throw new Error('Error while fetching data!');

    if (allCoords) res.send({ allCoords: allCoords });
  } catch (err) {
    res.send({ errorMessage: err.message });
  }
};

const addSpot = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(400);
      throw new Error('User not authorized.');
    }

    const {
      name,
      address,
      availableSpotNo,
      type,
      latitude,
      longitude,
      email,
      phoneNo,
      price,
      description,
    } = req.body;

    const spotPresent = await Spot.findOne({ name });

    if (spotPresent) {
      res.status(400);
      throw new Error('Spot name already exists.');
    }

    const imgFile = req.file;

    if (
      !name ||
      !address ||
      !availableSpotNo ||
      !type ||
      !latitude ||
      !longitude ||
      !email ||
      !phoneNo ||
      !price ||
      !description
    ) {
      res.status(400);
      throw new Error('Please fill all the fields.');
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

    const spotData = await Spot.create({
      name,
      address,
      availableSpotNo,
      type: getCapitalizedString(type),
      latitude,
      longitude,
      phoneNo,
      email,
      price,
      description,
      imageURL,
      userId: user._id,
    });

    if (spotData) {
      res.status(200);
      res.json({
        message: 'Spot created successfully.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid spot data.');
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const updateSpot = async (req, res) => {
  try {
    const spotId = req.params.id;

    // Check for spot
    const spotData = await Spot.findById(spotId);
    if (!spotData) {
      res.status(400);
      throw new Error('No Spot Found');
    }

    // Check for user
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error('User Not Found');
    }

    // Make sure the logged in user matches the user with spot user
    if (spotData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    const imgFile = req.file;
    let imageURL;

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

    const updatedSpot = await Spot.findByIdAndUpdate(
      spotId,
      {
        ...req.body,
        imageURL,
      },
      {
        new: true,
      }
    );
    // res.json(updatedSpot);
    res.status(200).json(updatedSpot);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteSpot = async (req, res) => {
  try {
    const spotId = req.params.id;

    // Check for spot
    const spotData = await Spot.findById(spotId);
    if (!spotData) {
      res.status(400);
      throw new Error('No Spot Found');
    }

    // Check for user
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error('User Not Found');
    }

    // Make sure the logged in user matches the user with spot user
    if (spotData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    await Spot.deleteOne({ _id: spotId });
    res.status(200).json({ spotId: spotId });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addSpot,
  updateSpot,
  deleteSpot,
  getSpotUser,
  getSpotSearch,
  getSpotType,
  getAllSpots,
  getSpot,
  getAllCoords,
};
