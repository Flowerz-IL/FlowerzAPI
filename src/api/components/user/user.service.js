
const UserModel = require('./user.model');
const providerService = require('../provider/provider.service');
const {encryptText, compareStringToHash} = require('../../../services/encrypt.util');
const {createJWT, decodeJWT} = require('../../../services/jwt.util');

const getUserByEmail = email => UserModel.findOne({userEmail: email}).lean();
const censoredUser = ({_id, userEmail, userRole, userFirstName, userLastName,
    userPhoneNumber, userAddresses, userOrders, providerId}) =>  ({
        _id, userEmail, userRole, userFirstName, userLastName, userPhoneNumber,
        userAddresses, userOrders, providerId: providerId ?? '-'
    });

/**
 * Used to fetch all users data from the DB
 * 
 * @resolve user data
 */
module.exports.getItems = () => UserModel.find().then(items => items.map(censoredUser));

/**
 * Used to fetch a specific user from the DB.
 * 
 * @param {string} userId 
 * @resolve requested user data
 */
module.exports.getSpecificItem = userId => UserModel.findById(userId).then(censoredUser);

/**
 * Used to updated an existing user
 * 
 * @param {string} userId 
 * @param {object} change 
 * @resolve user before the update
 */
module.exports.updateSpecificItem = async (userId, change) => {
    let changes = {...change};
    if('userPassword' in change){
        const encryptedPassword = await encryptText(change.userPassword);
        changes.userPassword = encryptedPassword;
    }
    return UserModel.findByIdAndUpdate(userId, {$set:changes}, {new:true})
        .then(censoredUser);
};

/**
 * Used to push to a user array
 * 
 * @param {string} orderId 
 * @param {string} whereToPush
 * @param {array} arrayToPush 
 * @resolve user after the update
 */
module.exports.pushToASpecificUserArray = async (userId, whereToPush, arrayToPush) => 
    UserModel.findByIdAndUpdate(userId, {$push:{[whereToPush]:{$each:arrayToPush}}}, {new:true})
        .then(censoredUser);

/**
 * Used to delete a specific user from the DB.
 * 
 * @param {string} userId 
 * @resolve the deleted user
 */
module.exports.deleteSpecificItem = async (userId, deleteProvider=true) => {
    const currentUser = await module.exports.getSpecificItem(userId);
    if(currentUser.providerId !== '-' && deleteProvider) {
        await providerService.deleteSpecificItem(currentUser.providerId, false);
    }
    return UserModel.findByIdAndDelete(userId).then(censoredUser);
};

/**
 * Used to build the sign response with user information and json web token
 * 
 * @param {object} user
 * @return object with user id and role and json web token
 */
module.exports.buildSignResponse = user => {
    const jwt = createJWT(user);
    const expiredAt = decodeJWT(jwt).exp;
    const userInformation = {_id: user._id, userRole: user.userRole, userName: `${user.userFirstName} ${user.userLastName}`,
        providerId : user.providerId ?? '-' };
    return {
        information:userInformation,
        token:jwt,
        expiredAt:expiredAt
    };
};

/**
 * Used to signIn to an existing user
 * 
 * @resolve the corresponding user
 */
module.exports.signIn = async ({userEmail, userPassword}) => {
    const fixedEmail = userEmail.toLowerCase();
    const currentUser = await getUserByEmail(fixedEmail);
    if(!currentUser) throw new Error('Wrong email or password.');
    const comparePasswordsResult = await compareStringToHash(userPassword, currentUser.userPassword);
    if(!comparePasswordsResult) throw new Error('Wrong email or password.');
    return currentUser;
};

/**
 * Used to signUp a new user
 * 
 * @resolve the new user
 */
module.exports.signUp = async ({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddresses}, role='user') => {
    const fixedEmail = userEmail.toLowerCase();
    const encryptedPassword = await encryptText(userPassword);
    const isExisted = await getUserByEmail(fixedEmail);
    if(isExisted) throw new Error('Email already exists');
    return new UserModel({
        userEmail: fixedEmail,
        userPassword: encryptedPassword,
        userFirstName,
        userLastName,
        userPhoneNumber,
        userAddresses,
        userRole: role.toUpperCase(),
    }).save();
};