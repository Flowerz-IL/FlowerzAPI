
const mongoose = require('mongoose');
const schemaTypes = require('./schemaTypes');
const Joi = require('@hapi/joi');


//model schema 
const modelSchema = new mongoose.Schema(
    {
        emailAddress: mongoose.schemaTypes.emailAddressRequired,
        password: mongoose.SchemaTypes.longStringRequired,
        firstName: mongoose.SchemaTypes.longStringRequired,
        surName: mongoose.SchemaTypes.longStringRequired,
        mainAddress: mongoose.Schema.Type.ObjectId, // of adress model
        phoneNumber: mongoose.SchemaTypes.phoneNumberRequired,
        orders: [mongoose.Schema.Type.ObjectId],
        addresses: [mongoose.Schema.Type.ObjectId], //orders addresses 
        userRole: mongoose.schemaTypes.userRoleRequired, 
    },

    {
        timestamps:true // adding object creation time
    }
);

//create model 
const Model = mongoose.model('user', modelSchema);

//export model
module.exports = Model;