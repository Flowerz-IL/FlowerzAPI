
const flowerBouquetRouter = require('express').Router();
const flowerBouquetController = require('./flowerBouquet.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

flowerBouquetRouter
    .route('/')
    .get(flowerBouquetController.getFlowerBouquets)
    .post(flowerBouquetController.addFlowerBouquet);

flowerBouquetRouter
    .route('/:id')
    .all(validateIdParamMiddleware)
    .get(flowerBouquetController.getSpecificFlowerBouquet)
    .patch(flowerBouquetController.updateSpecificFlowerBouquet)
    .delete(flowerBouquetController.deleteSpecificFlowerBouquet);

module.exports = flowerBouquetRouter;