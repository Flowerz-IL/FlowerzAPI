
const userRouter = require('express').Router();
const userController = require('./user.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

userRouter
    .route('/')
    .get(userController.getUsers)

userRouter
    .route('/specific/:id')
    .all(validateIdParamMiddleware)
    .get(userController.getSpecificUser)
    .patch(userController.updateSpecificUser)
    .post(userController.addAddresses)
    .delete(userController.deleteSpecificUser);

userRouter.post('/sign-in', userController.signIn);
userRouter.post('/sign-up', userController.signUp);

module.exports = userRouter;