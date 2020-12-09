
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        categoryID:schemaTypes.IDRequired,
        color:schemaTypes.colorRequired,
        price:schemaTypes.priceRequired,
        size:schemaTypes.sizeRequired,
        productDescription:schemaTypes.LongStringRequired, 
        productImage:schemaTypes.LongStringRequired, 
        occassionstyleID:schemaTypes.IDRequired, 
        isMixed: schemaTypes.boolRequired, 
        frequencyWeeks: schemaTypes.frequencyWeeksRequired,
    //    orders: [schemaTypes.ID],
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('flowerBouquet', modelSchema);

//export model
module.exports = Model;