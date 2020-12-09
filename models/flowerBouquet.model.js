
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        color:schemaTypes.requiredFlowerColor,
        price:schemaTypes.requiredNumber,
        size:schemaTypes.requiredSize,
        productDescription:schemaTypes.requiredLongString, 
        productImage:schemaTypes.requiredString, 
        occasionStyle: schemaTypes.requiredOccasionStyle, 
        isMixed: schemaTypes.requiredBoolean,
    },
    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('FlowerBouquet', modelSchema);

//export model
module.exports = Model;