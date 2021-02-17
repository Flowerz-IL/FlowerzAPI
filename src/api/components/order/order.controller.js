
const GenericModelController = require('../../../services/genericModelController.util');
const orderService = require('./order.service');

const MODEL_NAME = 'Order';
const mustProperties = ['userId', 'orderAddress', 'orderFrequency', 'isOrderActive', 'orderFlowerBouquetIds',
    'orderTotalSum', 'providerId'];
const orderController = GenericModelController(MODEL_NAME, orderService, mustProperties, mustProperties); 

orderController.getTotals = (req, res) => 
    orderService.getTotals()
        .then(({results}) => res.status(200).json({results}))
        .catch(err => res.status(400).json({message: 'something went wrong, please try again'}));

module.exports = orderController;