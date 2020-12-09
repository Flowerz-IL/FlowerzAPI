
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema(
    {   
        name: schemaTypes.requiredSmallString,
        city: schemaTypes.requiredSmallString,
        street: schemaTypes.requiredMediumString,
        houseNumber: schemaTypes.requiredSmallString,
        floorNumber: schemaTypes.nonRequiredNumber,
        aptNumber: schemaTypes.nonRequiredNumber,
    },
    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('Address', modelSchema);

//export model
module.exports = Model;