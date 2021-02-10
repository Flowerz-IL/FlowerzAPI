
let flowerRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const flowerController = require('./flower.controller');

flowerRouter = genericModelRouter(flowerController, flowerRouter);

module.exports = flowerRouter;