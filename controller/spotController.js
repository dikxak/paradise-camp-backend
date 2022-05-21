const Spot = require('../models/spotModel');
const spotModel = require('../models/spotModel');

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

    const spotPresent = await spotModel.findOne({ name });

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

module.exports = { addSpot };
