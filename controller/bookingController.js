const Booking = require('../models/bookingModel');
const Spot = require('../models/spotModel');

const bookSpot = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingDate, spotId } = req.body;

    if (!userId) throw new Error('User is not authorized.');
    if (!spotId || !bookingDate)
      throw new Error('No any spot chosen for booking.');

    const spotData = await Spot.find({ _id: spotId });

    await Spot.updateOne(
      { _id: spotId },
      { availableSpotNo: spotData[0].availableSpotNo - 1 },
      { new: true }
    );

    const bookingData = await Booking.create({
      userId,
      spotId,
      date: bookingDate,
      spotData: spotData[0],
    });

    if (bookingData) return res.json({ bookingData: bookingData });
    else throw new Error('Problem while creating booking data.');
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) throw new Error('User not authorized.');

    const bookingData = await Booking.find({ userId: userId });

    if (!bookingData) throw new Error('Error while getting bookings data.');

    res.json({ bookingData });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

module.exports = { bookSpot, getBookings };
