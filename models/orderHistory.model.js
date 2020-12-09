
mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema (
    {
        userID: schemaTypes.requiredString,
        AddressID:  schemaTypes.requiredString,
        frequencyWeeks: schemaTypes.requiredFrequencyWeeks,
        startDate: schemaTypes.requiredLongString,
        nextShippingDate: schemaTypes.requiredLongString,
        orderCategory: schemaTypes.requiredCategory,
        totalSum: schemaTypes.requiredNumber,
    },
    {
        timestamps:true // adding object creation time
    }
);

    //create model 
const Model = mongoose.model('OrderHistory', modelSchema);

//export model
module.exports = Model;