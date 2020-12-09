
mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema (
    {
        frequencyWeeks: schemaTypes.frequencyWeeksRequired,
        startDate: schemaTypes.dateRequired,
        nextShippingDate: schemaTypes.dateRequired,
        Address:  schemaTypes.IdRequired,
        active : schemaTypes.boolRequierd, 
        orderCategory: schemaTypes.categoryRequired,
        user: mongoose.schemaTypes.objectID,
        totalSum: schemaTypes.totalSum,
    },
    
    {
        timestamps:true // adding object creation time
    }
    );

    //create model 
const Model = mongoose.model('order', modelSchema);

//export model
module.exports = Model;