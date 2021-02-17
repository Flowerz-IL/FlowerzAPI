
let orderRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const orderController = require('./order.controller');

orderRouter.get('/getTotal', orderController.getTotals);
orderRouter = genericModelRouter(orderController, orderRouter);

module.exports = orderRouter;