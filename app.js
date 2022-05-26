const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());

require('./database/connection');

app.use('/users', require('./routes/userRoutes'));

app.use('/spots', require('./routes/spotRoutes'));

app.use('/bookings', require('./routes/bookingRoutes'));

app.use('/blogs', require('./routes/blogRoutes'));

app.use('/reviews', require('./routes/reviewRoutes'));

app.listen(process.env.PORT || 90);
