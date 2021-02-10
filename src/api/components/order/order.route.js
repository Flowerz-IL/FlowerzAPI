
let orderRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const orderController = require('./order.controller');

orderRouter = genericModelRouter(orderController, orderRouter);

module.exports = orderRouter;