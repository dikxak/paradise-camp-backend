const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/paradise_camp_db', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
