
const GenericModelController = require('../../../services/genericModelController.util');
const orderService = require('./order.service');

const MODEL_NAME = 'Order';
const mustProperties = ['userId', 'orderAddress', 'orderFrequency', 'isOrderActive', 'orderFlowerBouquetIds',
    'orderTotalSum', 'providerId'];
const orderController = GenericModelController(MODEL_NAME, orderService, mustProperties, mustProperties); 

module.exports = orderController;