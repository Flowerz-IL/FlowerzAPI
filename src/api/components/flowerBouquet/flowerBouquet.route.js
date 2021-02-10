
let flowerBouquetRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const flowerBouquetController = require('./flowerBouquet.controller');

flowerBouquetRouter = genericModelRouter(flowerBouquetController, flowerBouquetRouter);

module.exports = flowerBouquetRouter;