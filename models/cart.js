
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');


//model schema 
const modelSchema = new mongoose.Schema(
    {
        userID:mongoos.SchemaTypes.ObjectId,
        totalSum: schemaTypes.totalSumRequired,
        orders: [mongoose.SchemaTypes.ObjectId], 
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('cart', modelSchema);

//export model
module.exports = Model;