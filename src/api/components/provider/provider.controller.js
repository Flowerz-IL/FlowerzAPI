
const providerService = require('./provider.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Provider';

/**
 * Used to receive all providers from the DB
 * 
 * @respond providers array
 */
module.exports.getProviders = async (req, res) => {
    try {
        const providers = await providerService.getProviders();
        res.json(providers);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to receive a specific provider from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested provider 
 */
module.exports.getSpecificProvider = async (req, res) => {
    try{
        const requestedProvider = await providerService.getSpecificProvider(req.params.id);
        res.json(requestedProvider);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add an delivery city to a provider
 * 
 * @respond provider before the update
 */
module.exports.addDeliveryCity = async (req, res) => {
    validateObjectKeys(['deliveryCities'], req.body);
    const providerBeforeUpdate = await providerService.pushToASpecificProviderArray(req.params.id, 'deliveryCities', req.body.deliveryCities);
    res.json(providerBeforeUpdate);
};

/**
 * Used to delete a specific provider from the DB.
 * Request has to contain an id param.
 * 
 * @respond deleted provider
 */
module.exports.deleteSpecificProvider = async (req, res) => {
    try{
        const deletedProvider = await providerService.deleteSpecificProvider(req.params.id);
        res.status(200).json({ deletedProvider, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to signUp a new provider
 * 
 * @respond user id and role, json web token and expiration date
 */
module.exports.signUpAProvider = async (req, res) => {
    try{
        const keys = ['userEmail', 'userPassword', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddress',
            'businessName', 'businessWebsite'];
        validateKeysInObject(keys, req.body);
        const newProvider = await providerService.signUpAProvider(req.body);
        res.json(providerService.buildSignResponse(newProvider));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_UP, error: error['message'] }); }
};

