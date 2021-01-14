
const providerRouter = require('express').Router();
const providerController = require('./provider.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

providerRouter
    .route('/')
    .get(providerController.getProviders)
    .post(providerController.addProvider);

providerRouter
    .route('/specific/:id')
    .all(validateIdParamMiddleware)
    .get(providerController.getSpecificProvider)
    .post(providerController.addDeliveryCity)
    .delete(providerController.deleteSpecificProvider);

providerRouter.post('/sign-up', providerController.signUpAProvider);

module.exports = providerRouter;