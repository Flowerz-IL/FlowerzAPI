
const providerService = require('./provider.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Provider';
const ALLOWED_KEYS = ['userId', 'businessName', 'businessWebsite'];

/**
 * Used to receive all providers from the DB
 * 
 * @respond providers array
 */
module.exports.getProviders = async (req, res) => {
    try {
        const providers = await providerService.getProviders();
        res.status(200).json(providers);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add a new provider to the DB.
 * 
 * @respond added provider
 */
module.exports.addProvider = async (req, res) => {
    try {
        validateKeysInObject(ALLOWED_KEYS, req.body);
        const newProvider = await providerService.addProvider(req.body);
        res.status(200).json({ newProviderId: newProvider._id, newProvider ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error: error['message'] }); }
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
        res.status(200).json(requestedProvider);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to update a specific provider
 * 
 * @respond updated provider
 */
module.exports.updateSpecificProvider = async (req, res) => {
    try{
        validateObjectKeys([...ALLOWED_KEYS, 'deliveryCities'], req.body);
        const updatedProvider = await providerService.updateSpecificProvider(req.params.id, req.body);
        res.status(200).json({ updatedProvider, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add an delivery city to a provider
 * 
 * @respond updatedProvider
 */
module.exports.addDeliveryCity = async (req, res) => {
    validateObjectKeys(['deliveryCities'], req.body);
    const updatedProvider = await providerService.pushToASpecificProviderArray(req.params.id, 'deliveryCities', req.body.deliveryCities);
    res.status(200).json(updatedProvider);
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
        const keys = ['userEmail', 'userPassword', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddresses',
            'businessName', 'businessWebsite'];
        validateKeysInObject(keys, req.body);
        const newProvider = await providerService.signUpAProvider(req.body);
        res.status(200).json(providerService.buildSignResponse(newProvider));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_UP, error: error['message'] }); }
};

