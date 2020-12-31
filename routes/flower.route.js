
// import packages
const express = require('express');
const {modelAddMessage, modelDeleteMessage, modelOverrideMessage, modelUpdateMessage, OrderCustomError} = require('../util/messages.util');
const Model = require('../models/flower.model');
const MODEL_NAME = 'Flower';

// router
const router = express.Router();

// restful API - target all
router
    .route('/')

    .get((req, res) => { // get all
        Model.find()
            .then( results => res.json(results))
            .catch( err => res.status(404).json(err));
    })
    
    .post(async (req, res) => { // add one
        try{
            //Check if flower is already exists
            const{type,color,amount,productDescription,productImage}=req.body;
            const isExisted=await Model.findOne({color:color},{type:type}).lean();
            if(isExisted)
            {
                return res.status(400).json({
                    message:'Flower already exists'
                });
            }
            else
            {
                //Adding the flower to db
                new Model(req.body)
                .save()
                .then( () => res.json(modelAddMessage(MODEL_NAME)))
                .catch( err => res.status(400).json(err));
            }
            }catch(err){
                return res.status(400).json({
                    message:'There is a problem with creating a flower',
                    err:err
                });
            }

    });

// Target Specific 
router
    .route('/:id')
    
    .get((req, res) => { // get one
        Model.findById(req.params.id)
            .then( result => res.json(result))
            .catch( err => res.status(404).json(err));
    })
    
    .patch((req, res) => { // update one specific items
        Model.updateOne({ _id:req.params.id }, { $set: req.body })
            .then( () => res.json(modelUpdateMessage(MODEL_NAME)))
            .catch( err => res.status(404).json(err));
    })
    
    .delete((req, res) => { // delete one 
        Model.findByIdAndDelete(req.params.id)
            .then(() => res.json(modelDeleteMessage(MODEL_NAME)))
            .catch( err => res.status(404).json(err));
    });

// export router
module.exports = router;