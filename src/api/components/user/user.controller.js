
const GenericModelController = require('../../../services/genericModelController.util');
const userService = require('./user.service');
const {ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');

const MODEL_NAME = 'User';
const mustProperties = ['userEmail', 'userRole', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddresses'];
const userController = GenericModelController(MODEL_NAME, userService, mustProperties, mustProperties); 

/**
 * Used to add an address to a user
 * 
 * @respond updated user
 */
userController.addAddresses = async (req, res) => {
    validateObjectKeys(['userAddresses'], req.body);
    const updatedUser = await userService.pushToASpecificUserArray(req.params.id, 'userAddresses', req.body.userAddresses);
    res.status(200).json(updatedUser);
};

/**
 * Used to signIn to a current user
 * 
 * @respond user id and role, json web token and expiration date
 */
userController.signIn = async (req, res) => {
    try{
        validateKeysInObject(['userEmail', 'userPassword'], req.body);
        const currentUser = await userService.signIn(req.body);
        res.status(200).json(userService.buildSignResponse(currentUser));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_IN, error: error['message'] }); }
};

/**
 * Used to signUp a new user
 * 
 * @respond user id and role, json web token and expiration date
 */
userController.signUp = async (req, res) => {
    try{
        const keys = ['userEmail', 'userPassword', 'userFirstName', 'userLastName', 'userPhoneNumber', 'userAddresses'];
        validateKeysInObject(keys, req.body);
        const newUser = await userService.signUp(req.body);
        res.status(200).json(userService.buildSignResponse(newUser));

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.SIGN_UP, error: error['message'] }); }
};

module.exports = userController;
