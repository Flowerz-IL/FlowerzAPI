
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');
require('mongoose-type-email');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        providerId: schemaTypes.requiredLongString,
        businessName: schemaTypes.requiredSmallString,
        businessWebsite: schemaTypes.nonRequiredLongString,
        phoneNumbers: [{
            PhoneNumber: schemaTypes.phoneNumberRequired,
        }],
        
        deliveryCities:[{
            city: schemaTypes.nonRequiredSmallString
        }],
        flowersTypes: [{
            type: mongoose.ObjectId,
            amount: schemaTypes.nonRequiredNumber,
        }],

        flowersBouquets: [{
            flowersBouquet: mongoose.ObjectId,
            bouquetSize: schemaTypes.requiredSize,
            amount: schemaTypes.RequiredNumber,
        }],

    },
    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('Provider', modelSchema);

//export model
module.exports = Model;