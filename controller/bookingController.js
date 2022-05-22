const Booking = require('../models/bookingModel');
const Spot = require('../models/spotModel');

const bookSpot = async (req, res) => {
  try {
    const userId = req.user.id;
    const spotId = req.body.spotId;

    if (!userId) throw new Error('User is not authorized.');
    if (!spotId) throw new Error('No any spot chosen for booking.');

    const bookingData = await Booking.create({
      userId,
      spotId,
    });

    if (bookingData) return res.json({ bookingData: bookingData });
    else throw new Error('Problem while creating booking data.');
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const getSpot = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) throw new Error('User not authorized.');

    const bookingData = await Booking.find({ userId: userId });

    const bookings = [];
    bookingData.forEach(async (booking, i) => {
      const bookedLocation = await Spot.find({ _id: booking.spotId });
      bookings.push(bookedLocation[0]);

      // If last item is also there, then only send the response.
      if (i === bookingData.length - 1) res.json(bookings);
    });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

module.exports = { bookSpot, getSpot };
