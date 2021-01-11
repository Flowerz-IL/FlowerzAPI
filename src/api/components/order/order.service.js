
const OrderModel = require('./order.model');
const FlowerBouquetService = require('../flowerBouquet/flowerBouquet.service');
const userService = require('../user/user.service');
const providerService = require('../provider/provider.service');

const calculateTotal = async flowerBouquetIds => {
    let sum = 0;
    for(let fIdx = 0; fIdx < flowerBouquetIds.length; fIdx++) {
        const flowerBouquet = await FlowerBouquetService
            .getSpecificFlowerBouquet(flowerBouquetIds[fIdx].flowerBouquetId);
        sum += flowerBouquet.bouquetPrice * flowerBouquetIds[fIdx].bouquetAmount;
    }
    return sum;
};

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
module.exports.addOrder = async ({userId, orderAddress, orderFrequency, isOrderActive, orderFlowerBouquetIds}) => {
    const orderTotalSum = await calculateTotal(orderFlowerBouquetIds);
    const orderCreationDate = isOrderActive ? getCurrentDate() : '-';
    const newOrder = new OrderModel({
        userId,
        orderAddress,
        orderFrequency,
        orderCreationDate,
        isOrderActive,
        orderFlowerBouquetIds,
        orderTotalSum
    }).save();
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
    if('orderFlowerBouquetIds' in change){
        const orderTotalSum = await calculateTotal(change['orderFlowerBouquetIds']);
        change = {...change, orderTotalSum};
    };
    
    if('isOrderActive' in change){
        const orderCreationDate = change['isOrderActive'] ? getCurrentDate() : '-';
        change = {...change, orderCreationDate};
    };
    
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