
// import Packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// import Routes


// const
PORT = process.env.PORT || 8080;
DB_URL = process.env.ATLAS_DB_URL;

// app
const app = express();

// mongoose connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB db connection successfully established'));

// server listen
app.listen(PORT, () => console.log('Server is running on port: ' + PORT));