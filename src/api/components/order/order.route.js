
const orderRouter = require('express').Router();
const orderController = require('./order.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

orderRouter
    .route('/')
    .get(orderController.getOrders)
    .post(orderController.addOrder);

orderRouter
    .route('/:id')
    .all(validateIdParamMiddleware)
    .get(orderController.getSpecificOrder)
    .patch(orderController.updateSpecificOrder)
    .delete(orderController.deleteSpecificOrder);

module.exports = orderRouter;