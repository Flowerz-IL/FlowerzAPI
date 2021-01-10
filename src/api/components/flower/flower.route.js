
const flowerRouter = require('express').Router();
const flowerController = require('./flower.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

flowerRouter
    .route('/')
    .get(flowerController.getFlowers)
    .post(flowerController.addFlower);

flowerRouter
    .route('/:id')
    .all(validateIdParamMiddleware)
    .get(flowerController.getSpecificFlower)
    .patch(flowerController.updateSpecificFlower)
    .delete(flowerController.deleteSpecificFlower);

module.exports = flowerRouter;