
const mongoose = require('mongoose');
const {requiredSmallString, requiredNumber, requiredLongString, requiredUrl,
    requiredOccasionStyle, requiredSize, nonRequiredNumber} = require('../../../config/schemaTypes.constant');
 
const flowerBouquetModelSchema = new mongoose.Schema(
    {
        bouquetName: requiredSmallString,
        bouquetPrice: requiredNumber,
        bouquetSize: requiredSize,
        bouquetDescription: requiredLongString, 
        bouquetImageUrl: requiredUrl, 
        bouquetOccasionStyle: requiredOccasionStyle, 
        bouquetFlowers: [{
            flowerId: {type: mongoose.Schema.ObjectId, ref:'Flower'},
            flowerAmount: nonRequiredNumber,
        }],
        bouquetColors:[requiredSmallString],
    },{timestamps:true}
);

module.exports = mongoose.model('FlowerBouquet', flowerBouquetModelSchema);

