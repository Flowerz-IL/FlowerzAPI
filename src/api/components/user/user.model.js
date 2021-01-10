
const mongoose = require('mongoose');
const {requiredEmail,requiredString, requiredUserRole, requiredSmallString, phoneNumberRequired, nonRequiredAddress} = require('../../../config/schemaTypes.constant');

const userModelSchema = new mongoose.Schema(
    {
        userEmail: requiredEmail,
        userPassword: requiredString,
        userRole: requiredUserRole, 
        userFirstName: requiredSmallString,
        userLastName: requiredSmallString,
        userPhoneNumber: phoneNumberRequired,
        userAddresses: [nonRequiredAddress],
        userOrders: [{type: mongoose.Schema.ObjectId, ref:'Order'}],
        providerId: {type: mongoose.Schema.ObjectId, ref:'Provider'}
    },{timestamps:true}
);

module.exports = mongoose.model('User', userModelSchema);