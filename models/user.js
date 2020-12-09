
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');
const Joi = require('@hapi/joi');


//model schema 
const modelSchema = new mongoose.Schema(
    {
        emailAddress: schemaTypes.emailAddressRequired,
        password: schemaTypes.longStringRequired,
        firstName: schemaTypes.longStringRequired,
        surName: schemaTypes.longStringRequired,
        mainAddress: mongoose.SchemaTypes.ObjectId, // of address model
        phoneNumber: schemaTypes.phoneNumberRequired,
        orders: [schemaTypes.IDRequired],
        addresses: [schemaTypes.IDRequired], //orders addresses 
        userRole: schemaTypes.userRoleRequired, 
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('User', modelSchema);

//export model
module.exports = Model;