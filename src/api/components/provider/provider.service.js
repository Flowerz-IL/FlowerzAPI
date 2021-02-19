
const GenericModelService = require('../../../services/genericModelService.util');
const ProviderModel = require('./provider.model');
const userService = require('../user/user.service');
const {createJWT, decodeJWT} = require('../../../services/jwt.util');

const providerService = GenericModelService(ProviderModel);

/**
 * Used to insert a provider to the DB
 * 
 * @param {object} newProvider 
 * @resolve the created provider
 */
providerService.addItem = async ({userId, businessName, businessWebsite}) => {
    const newProvider = await new ProviderModel({userId, businessName, businessWebsite}).save();
    userService.updateSpecificItem(userId, {providerId: newProvider._id, userRole:'PROVIDER'});
    return newProvider;
};

/**
 * Used to push to a provider array
 * 
 * @param {string} orderId 
 * @param {string} whereToPush
 * @param {array} arrayToPush 
 * @resolve provider before the update
 */
providerService.pushToASpecificProviderArray = async (providerId, whereToPush, arrayToPush) => 
    ProviderModel.findByIdAndUpdate(providerId, {$push:{[whereToPush]:{$each: arrayToPush}}}, {new:true});

/**
 * Used to delete a specific provider from the DB.
 * 
 * @param {string} providerId 
 * @resolve the deleted provider
 */
providerService.deleteSpecificItem = async (providerId, deleteUsers=true) => {
    const provider = await ProviderModel.findByIdAndDelete(providerId);
    if(deleteUsers){
        await userService.deleteSpecificItem(provider.userId, false);
    } 
    return provider;
}; 

/**
 * Used to build the sign response with provider information and json web token
 * 
 * @param {object} provider
 * @return object with provider id , user id and role and json web token
 */
providerService.buildSignResponse = provider => {
    const jwt = createJWT(provider);
    const expiredAt = decodeJWT(jwt).exp;
    const providerInformation = {_id: provider.userId, providerId: provider._id, userRole: 'PROVIDER', userName: provider.businessName};
    const response = {
        information:providerInformation,
        token:jwt,
        expiredAt:expiredAt
    };
    return response;
};

/**
 * Used to signUp a new provider
 * 
 * @resolve the new provider
 */
providerService.signUpAProvider = async ({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddresses,
    businessName, businessWebsite}) => {
    const newUser = await userService.signUp({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddresses}, 'provider');
    const newProvider = await new ProviderModel({
        userId: newUser._id,
        businessName,
        businessWebsite: businessWebsite ?? '',
    }).save();
    await userService.updateSpecificItem(newUser._id, {providerId: newProvider._id});
    return newProvider;
};

module.exports = providerService;
