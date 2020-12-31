
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');
const FLOWERTYPES = ['ROSE','LILLY','ALSTROEMERIA'];


//model schema 
const modelSchema = new mongoose.Schema(
    {
        type: schemaTypes.requiredflowersTypes,
        amount: schemaTypes.nonRequiredNumber,
        color:schemaTypes.requiredFlowerColor,
        productDescription:schemaTypes.nonRequiredLongString, 
        productImage:schemaTypes.requiredString, 
    },
    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('Flower', modelSchema);

//export model
module.exports = Model;