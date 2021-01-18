
const OrderModel = require('./order.model');
const userService = require('../user/user.service');
const providerService = require('../provider/provider.service');

const getCurrentDate = () => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
};

/**
 * Used to fetch all orders data from the DB
 * 
 * @resolve orders data
 */
module.exports.getOrders = () => OrderModel.find();

/**
 * Used to insert a order to the DB
 * 
 * @param {object} order object contains the userID, orderAddress, orderFrequency,
 *      orderCreationDate, orderNextShippingDate, isOrderActive, orderFlowerBouquetIds
 * @resolve the created order
 */
module.exports.addOrder = async ({userId, orderAddress, orderFrequency, isOrderActive, orderFlowerBouquetIds, orderTotalSum, providerId}) => {
    const orderCreationDate = getCurrentDate();
    const order = { userId, orderAddress, orderFrequency, orderCreationDate,
        isOrderActive, orderFlowerBouquetIds, orderTotalSum };
    if(providerId !== '-') order.providerId = providerId;
    const newOrder = new OrderModel(order).save();
    if(providerId !== '-') 
        providerService.pushToASpecificProviderArray(providerId, 'providerOrderIds', [newOrder._id]);
    userService.pushToASpecificUserArray(userId, 'userOrders', [newOrder._id]);
    return newOrder;
};

/**
 * Used to fetch a specific order from the DB.
 * 
 * @param {string} orderId 
 * @resolve requested order data
 */
module.exports.getSpecificOrder = orderId => OrderModel.findById(orderId);

/**
 * Used to updated an existing order
 * 
 * @param {string} orderId 
 * @param {object} change 
 * @resolve order after the update
 */
module.exports.updateSpecificOrder = async (orderId, change) => {    
    if('providerId' in change){
        providerService.pushToASpecificProviderArray(change['providerId'], 'providerOrderIds', [orderId]);
    }
    return OrderModel.findByIdAndUpdate(orderId, {$set:change}, {new:true});
};
    

/**
 * Used to delete a specific order from the DB.
 * 
 * @param {string} orderId 
 * @resolve the deleted order
 */
module.exports.deleteSpecificOrder = orderId => OrderModel.findByIdAndDelete(orderId);