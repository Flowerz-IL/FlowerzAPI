
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');
require('mongoose-type-email');

//model schema 
const modelSchema = new mongoose.Schema(
    {
        emailAddress: mongoose.SchemaTypes.Email,
        password: schemaTypes.requiredString,
        userRole: schemaTypes.requiredUserRole, 
        firstName: schemaTypes.requiredSmallString,
        surName: schemaTypes.requiredSmallString,
        phoneNumber: schemaTypes.phoneNumberRequired,
        orders: [schemaTypes.requiredString],
        addresses: [schemaTypes.requiredString], //orders addresses 
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('User', modelSchema);

//export model
module.exports = Model;