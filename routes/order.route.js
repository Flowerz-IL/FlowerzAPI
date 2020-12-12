
// import packages
const express = require('express');
const {modelAddMessage, modelDeleteMessage, modelOverrideMessage, modelUpdateMessage, OrderCustomError} = require('../util/messages.util');
const OrderModel = require('../models/orders.model');
const UserModel = require('../models/user.model');
const MODEL_NAME = 'Order';

// router
const router = express.Router();

// restful API - target all
router
    .route('/')

    .get((req, res) => { // get all
        OrderModel.find()
            .then( results => res.json(results))
            .catch( err => res.status(404).json(err));
    })
    
    .post(async (req, res) => { // add one
        try{

            const {userID, addressName, frequencyWeeks, startDate, nextShippingDate, orderCategory, totalSum} = req.body

            // find attached user
            const currentUser = await UserModel.findById(userID);
            if(!currentUser)
                return res.status(400).json({
                    message: OrderCustomError('user')
                });
                        
            // find attached address from that user
            const orderAddress = currentUser.addresses.find( address => address.name = addressName);
            if(!orderAddress)
                return res.status(400).json({
                    message: OrderCustomError('user address')
                });
            
            // create the order
            const newOrder = new OrderModel({
                userID,
                Address: orderAddress,
                frequencyWeeks,
                startDate,
                nextShippingDate,
                orderCategory,
                active:true,
                totalSum
            });
            newOrder.save();
            return res.json(modelAddMessage(MODEL_NAME));

        } catch(err){ return res.status(400).json(err); }
    });

// Target Specific 
router
    .route('/:id')
    
    .get((req, res) => { // get one
        OrderModel.findById(req.params.id)
            .then( result => res.json(result))
            .catch( err => res.status(404).json(err));
    })

    .patch((req, res) => { // update one specific items
        OrderModel.updateOne({ _id:req.params.id }, { $set: req.body })
            .then( () => res.json(modelUpdateMessage(MODEL_NAME)))
            .catch( err => res.status(404).json(err));
    })
    
    .delete((req, res) => { // delete one 
        OrderModel.findByIdAndDelete(req.params.id)
            .then(() => res.json(modelDeleteMessage(MODEL_NAME)))
            .catch( err => res.status(404).json(err));
    });

// export router
module.exports = router;