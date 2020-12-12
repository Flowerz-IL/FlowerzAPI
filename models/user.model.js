
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
        addresses: [{
            name: schemaTypes.nonRequiredSmallString,
            city: schemaTypes.nonRequiredSmallString,
            street: schemaTypes.nonRequiredMediumString,
            houseNumber: schemaTypes.nonRequiredSmallString,
            floorNumber: schemaTypes.nonRequiredNumber,
            aptNumber: schemaTypes.nonRequiredNumber,
        }],
        cart: {
            orders: [schemaTypes.nonRequiredString], 
            totalSum: schemaTypes.nonRequiredNumber,
        }
    },
    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('User', modelSchema);

//export model
module.exports = Model;