
const userService = require('./user.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'User';

/**
 * Used to receive all users from the DB
 * 
 * @respond users array
 */
module.exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to receive a specific user from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested user 
 */
module.exports.getSpecificUser = async (req, res) => {
    try{
        const requestedUser = await userService.getSpecificUser(req.params.id);
        res.json(requestedUser);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add an address to a user
 * 
 * @respond user before the update
 */
module.exports.addAddresses = async (req, res) => {
    validateObjectKeys(['userAddresses'], req.body);
    const userBeforeUpdate = await userService.pushToASpecificUserArray(req.params.id, 'userAddresses', req.body.userAddresses);
    res.json(userBeforeUpdate);
};

/**
 * Used to delete a specific user from the DB.
 * Request has to contain an id param.
 * 
 * @respond deleted user
 */
module.exports.deleteSpecificUser = async (req, res) => {
    try{
        const deletedUser = await userService.deleteSpecificUser(req.params.id);
        res.status(200).json({ deletedUser, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to signIn to a current user
 * 
 * @respond user id and role, json web token and expiration date
 */
module.exports.signIn = async (req, res) => {
    try{
        validateKeysInObject(['userEmail', 'userPassword'], req.body);
        const currentUser = await userService.signIn(req.body);
        res.json(userService.buildSignResponse(currentUser));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_IN, error: error['message'] }); }
};

/**
 * Used to signUp a new user
 * 
 * @respond user id and role, json web token and expiration date
 */
module.exports.signUp = async (req, res) => {
    try{
        const keys = ['userEmail', 'userPassword', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddress'];
        validateKeysInObject(keys, req.body);
        const newUser = await userService.signUp(req.body);
        res.json(userService.buildSignResponse(newUser));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_UP, error: error['message'] }); }
};


