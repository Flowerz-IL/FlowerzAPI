
const mongoose = require('mongoose');
const {requiredNumber, nonRequiredNumber, requiredBoolean, requiredAddress, nonRequiredSmallString} = require('../../../config/schemaTypes.constant');

const orderModelSchema = new mongoose.Schema (
    {
        userId: {type: mongoose.Schema.ObjectId, ref:'User'},
        providerId: {type: mongoose.Schema.ObjectId, ref:'Provider'},
        orderAddress:  requiredAddress,
        orderFrequency: requiredNumber,
        orderCreationDate: nonRequiredSmallString,
        isOrderActive: requiredBoolean,
        orderFlowerBouquetIds: [{
            flowerBouquetId: {type: mongoose.Schema.ObjectId, ref:'FlowerBouquet'},
            bouquetAmount: nonRequiredNumber
        }],
        orderTotalSum: requiredNumber
    },{timestamps:true}
);

module.exports = mongoose.model('Order', orderModelSchema);