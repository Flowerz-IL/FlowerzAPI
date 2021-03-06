
const mongoose = require('mongoose');
const {requiredSmallString, requiredLongString, requiredUrl, requiredString} = require('../../../config/schemaTypes.constant');

const flowerModelSchema = new mongoose.Schema(
    {
        flowerName: requiredSmallString,
        flowerColor: requiredSmallString,
        flowerDescription: requiredLongString,
        flowerImageUrl: requiredString,
    },{timestamps:true}
);

module.exports = mongoose.model('Flower', flowerModelSchema);