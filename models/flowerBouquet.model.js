
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        color:schemaTypes.colorRequired,
        price:schemaTypes.priceRequired,
        size:schemaTypes.sizeRequired,
        productDescription:schemaTypes.longStringRequired, 
        productImage:schemaTypes.LongStringRequired, 
        occassionstyleID: schemaTypes.IDRequired, 
        isMixed: schemaTypes.boolRequired,
        frequencyWeeks: schemaTypes.frequencyWeeksRequired,
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('FlowerBouquet', modelSchema);

//export model
module.exports = Model;