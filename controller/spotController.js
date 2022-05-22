const Spot = require('../models/spotModel');
const User = require('../models/userModel');

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
      latitude,
      longitude,
      email,
      phoneNo,
      price,
      description,
    } = req.body;

    if (
      !name ||
      !address ||
      !availableSpotNo ||
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

    const spotPresent = await Spot.findOne({ name });

    if (spotPresent) {
      res.status(400);
      throw new Error('Spot name already exists.');
    }

    const spotData = await Spot.create({
      name,
      address,
      availableSpotNo,
      latitude,
      longitude,
      phoneNo,
      email,
      price,
      description,
      userId: user._id,
    });

    if (spotData) {
      res.status(200);
      res.json({
        _id: spotData.id,
        name: spotData.name,
        address: spotData.address,
        latitude: spotData.latitude,
        longitude: spotData.longitude,
        email: spotData.email,
        phoneNo: spotData.phoneNo,
        price: spotData.price,
        description: spotData.description,
        userId: spotData.userId,
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
    console.log(user);

    // Make sure the logged in user matches the user with spot user
    if (spotData.userId.toString() !== user.id) {
      res.status(401);
      throw new Error('User Not Authorized');
    }

    const updatedSpot = await Spot.findByIdAndUpdate(spotId, req.body, {
      new: true,
    });
    res.status(200).json(updatedSpot);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { addSpot, updateSpot };
