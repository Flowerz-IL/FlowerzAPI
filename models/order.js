
mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');

//model schema 
const modelSchema = new mongoose.Schema (
    {
        frequencyWeeks: mongoose.schemaTypes.frequencyWeeksRequired,
        startDate: mongoose.schemaTypes.dateRequired,
        nextShippingDate: mongoose.schemaTypes.dateRequired,
        Address: mongoose.schemaTypes.objectID,
        active : mongoose.schemaTypes.schemaTypes.boolRequierd, 
        orderCategory: mongoose.schemaTypes.categoryRequired,
        user: mongoose.schemaTypes.objectID,
        totalSum: mongoose.schemaTypes.totalSum,
    },
    
    {
        timestamps:true // adding object creation time
    }
    );