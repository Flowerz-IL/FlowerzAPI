
mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema (
    {
        userID: schemaTypes.requiredString,
        Address:  {
            name: schemaTypes.nonRequiredSmallString,
            city: schemaTypes.nonRequiredSmallString,
            street: schemaTypes.nonRequiredMediumString,
            houseNumber: schemaTypes.nonRequiredSmallString,
            floorNumber: schemaTypes.nonRequiredNumber,
            aptNumber: schemaTypes.nonRequiredNumber,
        },
        frequencyWeeks: schemaTypes.requiredFrequencyWeeks,
        startDate: schemaTypes.requiredLongString,
        nextShippingDate: schemaTypes.requiredLongString,
        orderCategory: schemaTypes.requiredCategory,
        active: schemaTypes.requiredBoolean,
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