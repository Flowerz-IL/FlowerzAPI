
const orderService = require('./order.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Order';
const ALLOWED_KEYS = ['userId', 'orderAddress', 'orderFrequency', 'isOrderActive', 'orderFlowerBouquetIds'];

/**
 * Used to receive all orders from the DB
 * 
 * @respond orders array
 */
module.exports.getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add a new orders to the DB.
 * Req body must contain orders userId, orderAddress, orderFrequency, isOrderActive, orderFlowerBouquetIds
 * 
 * @respond added order id 
 */
module.exports.addOrder = async (req, res) => {
    try {
        validateKeysInObject(ALLOWED_KEYS, req.body);        
        const newOrder = await orderService.addOrder(req.body);
        res.status(200).json({ newOrderId: newOrder._id ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to receive a specific order from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested order 
 */
module.exports.getSpecificOrder = async (req, res) => {
    try{
        const requestedOrder = await orderService.getSpecificOrder(req.params.id);
        res.json(requestedOrder);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to update a specific order
 * 
 * @respond order before the update
 */
module.exports.updateSpecificOrder = async (req, res) => {
    try{
        validateObjectKeys(ALLOWED_KEYS, req.body);
        const orderBeforeUpdate = await orderService.updateSpecificOrder(req.params.id, req.body);
        res.status(200).json({ orderBeforeUpdate, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to delete a specific order from the DB.
 * Request has to contain an id param.
 * 
 * @respond deleted order
 */
module.exports.deleteSpecificOrder = async (req, res) => {
    try{
        const deletedOrder = await orderService.deleteSpecificOrder(req.params.id);
        res.status(200).json({ deletedOrder, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error: error['message'] }); }
};