const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());

require('./database/connection');

app.use('/users', require('./routes/userRoutes'));

app.listen(process.env.PORT || 90);
