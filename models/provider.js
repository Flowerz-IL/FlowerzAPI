
const mongoose = require('mongoose');
const { schema } = require('./flowerBouquet.model');
const schemaTypes = require('./schemaTypes');
require('mongoose-type-email');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        emailAddress: mongoose.SchemaTypes.Email,
        userRole: schemaTypes.requiredUserRole, 
        ownerFirstName: schemaTypes.requiredSmallString,
        ownerSurName: schemaTypes.requiredSmallString,
        businessName: schemaTypes.requiredSmallString,
        businessWebsite: schemaTypes.nonRequiredLongString,
        phoneNumbers: [{
            PhoneNumber: schemaTypes.phoneNumberRequired,
        }],
        address: {
            name: schemaTypes.nonRequiredSmallString,
            city: schemaTypes.nonRequiredSmallString,
            street: schemaTypes.nonRequiredMediumString,
            houseNumber: schemaTypes.nonRequiredSmallString,
            },
        deliveryCities:[{
            city: schemaTypes.nonRequiredSmallString
        }],
        flowersTypes: [{
            type: schemaTypes.nonRequiredflowersTypes,
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
const Model = mongoose.model('User', modelSchema);

//export model
module.exports = Model;