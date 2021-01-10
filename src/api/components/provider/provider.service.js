
const ProviderModel = require('./provider.model');
const userService = require('../user/user.service');
const {createJWT, decodeJWT} = require('../../../services/jwt.util');

/**
 * Used to fetch all provides data from the DB
 * 
 * @resolve user provide
 */
module.exports.getProviders = () => ProviderModel.find();

/**
 * Used to fetch a specific provide from the DB.
 * 
 * @param {string} providerId 
 * @resolve requested provide data
 */
module.exports.getSpecificProvider = providerId => ProviderModel.findById(providerId);

/**
 * Used to updated an existing provider
 * 
 * @param {string} providerId 
 * @param {object} change 
 * @resolve user before the provider
 */
module.exports.updateSpecificProvider = async (providerId, change) => UserModel.findByIdAndUpdate(providerId, { $set:change });

/**
 * Used to push to a provider array
 * 
 * @param {string} orderId 
 * @param {string} whereToPush
 * @param {array} arrayToPush 
 * @resolve provider before the update
 */
module.exports.pushToASpecificProviderArray = async (providerId, whereToPush, arrayToPush) => 
    ProviderModel.findByIdAndUpdate(providerId, { $push: { [whereToPush]: { $each: arrayToPush }} });

/**
 * Used to delete a specific provider from the DB.
 * 
 * @param {string} providerId 
 * @resolve the deleted provider
 */
module.exports.deleteSpecificProvider = providerId => ProviderModel.findByIdAndDelete(providerId);

/**
 * Used to build the sign response with provider information and json web token
 * 
 * @param {object} provider
 * @return object with provider id , user id and role and json web token
 */
module.exports.buildSignResponse = provider => {
    const jwt = createJWT(provider);
    const expiredAt = decodeJWT(jwt).exp;
    const providerInformation = {_id: provider._id, userId: provider.userId, userRole: 'PROVIDER' };
    return {
        information:providerInformation,
        token:jwt,
        expiredAt:expiredAt
    };
};

/**
 * Used to signUp a new provider
 * 
 * @resolve the new provider
 */
module.exports.signUpAProvider = async ({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddress,
    businessName, businessWebsite}) => {
    const newUser = await userService.signUp({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddress});
    const newProvider = new ProviderModel({
        userId: newUser._id,
        businessName,
        businessWebsite: businessWebsite ?? '',
    }).save();
    userService.updateSpecificUser(newUser._id, {providerId: newProvider._id});
    return newProvider;
};