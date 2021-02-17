
let flowerBouquetRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const flowerBouquetController = require('./flowerBouquet.controller');

flowerBouquetRouter.get('/group-by-size', flowerBouquetController.groupBySize);

flowerBouquetRouter = genericModelRouter(flowerBouquetController, flowerBouquetRouter);

module.exports = flowerBouquetRouter;