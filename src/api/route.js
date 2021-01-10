
const mainRouter = require('express').Router();
const {ROUTES} = require('../config/global.constant');
const flowerRouter = require('./components/flower/flower.route');
const flowerBouquetRouter = require('./components/flowerBouquet/flowerBouquet.route');
const orderRouter = require('./components/order/order.route');
const userRouter = require('./components/user/user.route');
const providerRouter = require('./components/provider/provider.route');

mainRouter.use(ROUTES.FLOWER, flowerRouter);
mainRouter.use(ROUTES.FLOWER_BOUQUET, flowerBouquetRouter);
mainRouter.use(ROUTES.ORDER, orderRouter);
mainRouter.use(ROUTES.USER, userRouter);
mainRouter.use(ROUTES.PROVIDER, providerRouter);

module.exports = mainRouter;