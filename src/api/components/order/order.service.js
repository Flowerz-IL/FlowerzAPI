
const GenericModelService = require('../../../services/genericModelService.util');
const OrderModel = require('./order.model');
const userService = require('../user/user.service');
const providerService = require('../provider/provider.service');

const orderService = GenericModelService(OrderModel);

const getCurrentDate = () => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
};

/**
 * Used to insert a order to the DB
 * 
 * @param {object} order object contains the userID, orderAddress, orderFrequency,
 *      orderCreationDate, orderNextShippingDate, isOrderActive, orderFlowerBouquetIds
 * @resolve the created order
 */
orderService.addItem = async (newItem) => {
    const orderCreationDate = getCurrentDate();
    const order = {...newItem, orderCreationDate};
    if(newItem.providerId === '-') delete order.providerId;
    const newOrder = await new OrderModel(order).save();
    if(newItem.providerId !== '-') 
        providerService.pushToASpecificProviderArray(order.providerId, 'providerOrderIds', [newOrder._id]);
    userService.pushToASpecificUserArray(order.userId, 'userOrders', [newOrder._id]);
    return newOrder;
};

/**
 * Used to updated an existing order
 * 
 * @param {string} orderId 
 * @param {object} change 
 * @resolve order after the update
 */
orderService.updateSpecificItem = async (orderId, change) => {    
    if('providerId' in change){
        providerService.pushToASpecificProviderArray(change['providerId'], 'providerOrderIds', [orderId]);
    }
    return OrderModel.findByIdAndUpdate(orderId, {$set:change}, {new:true});
};

orderService.getTotals = async () => {
    const mapFunc = function(){emit(this.providerId, this.orderTotalSum);};
    const reduceFunc = function(key, values){return Array.sum(values);};
    return OrderModel.mapReduce({ 
        map: mapFunc, 
        reduce: reduceFunc, 
        query: {providerId: {$exists: true}}, 
        out : {inline:1} 
    });
};

module.exports = orderService;