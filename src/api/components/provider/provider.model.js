
const mongoose = require('mongoose');
const {requiredSmallString, nonRequiredSmallString, nonRequiredUrl} = require('../../../config/schemaTypes.constant');

const modelSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.ObjectId, ref:'User'},
        businessName: requiredSmallString,
        businessWebsite: nonRequiredUrl,        
        deliveryCities:[nonRequiredSmallString],
        providerOrderIds: [{type: mongoose.Schema.ObjectId, ref:'Order'}]
    },
    {timestamps:true}
);

module.exports = mongoose.model('Provider', modelSchema);