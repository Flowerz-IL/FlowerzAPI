
let userRouter = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');
const userController = require('./user.controller');

userRouter
    .route('/specific/:id')
    .all(validateIdParamMiddleware)
    .post(userController.addAddresses)

userRouter
    .route('/sign-in')
    .post(userController.signIn);

userRouter
    .route('/sign-up')
    .post(userController.signUp);

userRouter = genericModelRouter(userController, userRouter, '/specific/');

module.exports = userRouter;