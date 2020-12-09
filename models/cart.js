
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');


//model schema 
const modelSchema = new mongoose.Schema(
    {
        userID: mongoose.SchemaTypes.ObjectId,
        totalSum: schemaTypes.totalSumRequired,
        orders: [schemaTypes.IDRequired], 
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('Cart', modelSchema);

//export model
module.exports = Model;