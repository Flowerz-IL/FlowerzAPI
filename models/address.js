
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');


//model schema 
const modelSchema = new mongoose.Schema(
    {   
        name: mmongoose.SchemaTypes.longStringRequired,
        city: mongoose.SchemaTypes.longStringRequired,
        street: mongoose.SchemaTypes.longStringRequired,
        houseNumber: mongoose.Schema.Types.Number,
        floorNumber: mongoose.Schema.Types.Number,
        aptNumber: mongoose.Schema.Types.Number,
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('address', modelSchema);

//export model
module.exports = Model;