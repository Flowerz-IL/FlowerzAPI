
// import Packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// import Routes
const userRouter = require('./routes/user.route');
const orderRouter = require('./routes/order.route');
const flowerBouquetRouter = require('./routes/flowerBouquet.route');

// const
PORT = process.env.PORT || 8080;
DB_URL = process.env.ATLAS_DB_URL;

// app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/flowerBouquet', flowerBouquetRouter);

// mongoose connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB db connection successfully established'));

// server listen
app.listen(PORT, () => console.log('Server is running on port: ' + PORT));