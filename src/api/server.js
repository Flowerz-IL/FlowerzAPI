
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./route');
const {ROUTES} = require('../config/global.constant');

const app = express();
app.use(express.json());
app.use(cors());
app.use(ROUTES.API, mainRouter);

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB db connection successfully established'));
connection.once('close', () => console.log('MongoDB db connection successfully terminated'))

const connectToMongoose = dbUrl => {mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });};
const closeMongooseConnection = () => {if(connection.readyState === 2) connection.close();};

/**
 * Used to lunch an express sever with it's DB
 * 
 * @param {String} dbUrl mongoDb database url
 * @param {Number} port server listen port number
 * @return http server
 */
module.exports.startServer = (dbUrl, port) => {
    connectToMongoose(dbUrl);
    return app.listen(port, () => console.log('Server is running on port: ' + port));
};

/**
 * Used to close an http server and it's DB
 * 
 * @param {object} server 
 */
module.exports.closeServer = server => {
    closeMongooseConnection();
    server.close();
};