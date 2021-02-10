
const GenericModelController = require('../../../services/genericModelController.util');
const providerService = require('./provider.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');

const MODEL_NAME = 'Provider';
const mustProperties = ['userId', 'businessName', 'businessWebsite'];
const allowedPropertiesToUpdate = ['userId', 'businessName', 'businessWebsite', 'deliveryCities'];
const providerController = GenericModelController(MODEL_NAME, providerService, mustProperties, allowedPropertiesToUpdate); 

/**
 * Used to add an delivery city to a provider
 * 
 * @respond updatedProvider
 */
providerController.addDeliveryCity = async (req, res) => {
    try{
        validateObjectKeys(['deliveryCities'], req.body);
        const updatedItem = await providerService.pushToASpecificProviderArray(req.params.id, 'deliveryCities', req.body.deliveryCities);
        res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.PATCH(modelName)});
        
    }catch (err) {res.status(400).json({ message: ERROR_MESSAGES.PATCH(modelName), error: err.message });}
};

/**
 * Used to signUp a new provider
 * 
 * @respond user id and role, json web token and expiration date
 */
providerController.signUpAProvider = async (req, res) => {
    try{
        const keys = ['userEmail', 'userPassword', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddresses',
            'businessName', 'businessWebsite'];
        validateKeysInObject(keys, req.body);
        const newProvider = await providerService.signUpAProvider(req.body);
        res.status(200).json(providerService.buildSignResponse(newProvider));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_UP, error: error['message'] }); }
};

module.exports = providerController;
