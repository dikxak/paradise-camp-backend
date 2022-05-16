const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(`${process.env.MONGO_URI}/paradise_camp_db`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
