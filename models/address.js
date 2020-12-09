
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');


//model schema 
const modelSchema = new mongoose.Schema(
    {   
        name: schemaTypes.longStringRequired,
        city: schemaTypes.longStringRequired,
        street: schemaTypes.longStringRequired,
        houseNumber: schemaTypes.numberRequired,
        floorNumber: mongoose.Schema.Types.Number,
        aptNumber: mongoose.Schema.Types.Number,
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('Address', modelSchema);

//export model
module.exports = Model;