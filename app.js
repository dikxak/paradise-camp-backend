const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

require('./database/connection');

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/users', require('./routes/userRoutes'));

app.use('/spots', require('./routes/spotRoutes'));

app.use('/bookings', require('./routes/bookingRoutes'));

app.use('/blogs', require('./routes/blogRoutes'));

app.use('/reviews', require('./routes/reviewRoutes'));

app.listen(process.env.PORT || 90);
