
const UserModel = require('./user.model');
const {encryptText, compareStringToHash} = require('../../../services/encrypt.util');
const {createJWT, decodeJWT} = require('../../../services/jwt.util');

const getUserByEmail = email => UserModel.findOne({userEmail: email}).lean();

/**
 * Used to fetch all users data from the DB
 * 
 * @resolve user data
 */
module.exports.getUsers = () => UserModel.find();

/**
 * Used to fetch a specific user from the DB.
 * 
 * @param {string} userId 
 * @resolve requested user data
 */
module.exports.getSpecificUser = userId => UserModel.findById(userId);

/**
 * Used to push to a user array
 * 
 * @param {string} orderId 
 * @param {string} whereToPush
 * @param {array} arrayToPush 
 * @resolve user before the update
 */
module.exports.pushToASpecificUserArray = async (userId, whereToPush, arrayToPush) => 
    UserModel.findByIdAndUpdate(userId, { $push: { [whereToPush]: { $each: arrayToPush }} });

/**
 * Used to delete a specific user from the DB.
 * 
 * @param {string} userId 
 * @resolve the deleted user
 */
module.exports.deleteSpecificUser = userId => UserModel.findByIdAndDelete(userId);

/**
 * Used to build the sign response with user information and json web token
 * 
 * @param {object} user
 * @return object with user id and role and json web token
 */
module.exports.buildSignResponse = user => {
    const jwt = createJWT(user);
    const expiredAt = decodeJWT(jwt).exp;
    const userInformation = {_id: user._id, userRole: user.userRole };
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
module.exports.signUp = async ({userEmail, userPassword, userFirstName, userLastName, userPhoneNumber, userAddress}, role='user') => {
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
        userAddresses: [userAddress],
        userRole: role.toUpperCase(),
    }).save();
};