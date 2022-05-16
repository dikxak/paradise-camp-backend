const express = require('express');
const app = express();

app.use(express.json());

require('./database/connection');

app.use('/users', require('./routes/userRoutes'));

app.listen(90);
