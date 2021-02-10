
let providerRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');
const providerController = require('./provider.controller');

providerRouter
    .route('/specific/:id')
    .all(validateIdParamMiddleware)
    .post(providerController.addDeliveryCity)

providerRouter
    .route('/sign-up')
    .post(providerController.signUpAProvider);

providerRouter = genericModelRouter(providerController, providerRouter, '/specific/');

module.exports = providerRouter;