const express = require('express');
const app = express();

app.use(express.json());

require('./database/connection');

const customerBookRoute = require('./routers/customerSignUpRoute');
app.use(customerBookRoute);

app.listen(90);
