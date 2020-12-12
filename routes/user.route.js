
// import packages
const express = require('express');
const {encryptText, compareStringToHash} = require('../util/encrypt.util');
const {createJWT, decodeJWT} = require('../util/jwt.util');
const Model = require('./../models/user.model');

// router
const router = express.Router();

// Target All
router
    .get('/', (req, res) => { // get all
        Model.find()
            .then(users => {
                const result = users.map(user => {
                    return {
                        _id: user._id,
                        emailAddress: user.emailAddress,
                        userRole: user.UserRole, 
                        firstName: user.firstName,
                        surName: user.surName,
                        phoneNumber: user.phoneNumber,
                        addresses: user.addresses,
                        cart: user.cart,
                    };
                });
                res.json(result);
            })
            .catch(err => res.status(404).json(err));
    });

// Target Specific
router.route('/:id')
    .get((req, res) => { // get one
        Model.findById(req.params.id)
            .then(user => {
                delete user.password;
                res.json(user);
            })
            .catch(err => res.status(404).json(err));
    })

    .patch((req, res) => { // update one
        Model.updateOne({ _id:req.params.id }, { $set: req.body })
            .then( () => res.json('User updated successfully'))
            .catch( err => res.status(404).json(err));
    })

    .delete((req, res) => { // delete one
        Model.findByIdAndDelete(req.params.id)
            .then(() => res.json('User deleted successfully'))
            .catch( err => res.status(404).json(err));
    });

// register a user
router
    .post('/signup', async (req, res) => { 
        try{

            // get data
            const {emailAddress, password, firstName, surName, phoneNumber} = req.body;
            const fixedEmail = emailAddress.toLowerCase();

            // encrypt password
            const encryptedPassword = await encryptText(password);        

            // check if the email already existed for another user 
            const isExisted = await Model.findOne({emailAddress: fixedEmail}).lean();
            if(isExisted) 
                return res.status(400).json({
                    message: 'Email already exists' 
                });
            console.log(isExisted)
            // new user data
            const newUser = new Model({
                emailAddress: fixedEmail,
                password: encryptedPassword,
                firstName,
                surName,
                phoneNumber,
                userRole: 'USER'
            });

            // save user to the db
            const savedUser = await newUser.save();
            if(!savedUser)
                throw new Error();
            
            // create user's token
            const jwt = createJWT(savedUser);
            const expiredAt = decodeJWT(jwt).exp;
            
            // return user's data
            const userInformation = {_id: savedUser_id ,emailAddress, firstName, surName, phoneNumber, userRole: savedUser.userRole};
            return res.json({
                message: 'User created successfully',
                information:userInformation,
                token:jwt,
                expiredAt:expiredAt
            });

        } catch (err) {
            return res.status(400).json({
                message:'There is a problem with creating your account please try again in a few minutes',
                err:err
            });
        }
    });

// sign in a user
router
    .post('/signin', async (req, res) => {
        try{ 

            // get data
            const {emailAddress, password} = req.body;
            const fixedEmail = emailAddress.toLowerCase();
            
            
            // verify user's data
            const currentUser = await Model.findOne({emailAddress:fixedEmail});
            if(!currentUser) 
                return res.status(403).json({message: 'Wrong email or password.'});
            const isValid = compareStringToHash(password, currentUser.password);
            if(!isValid) 
                return res.status(403).json({message: 'Wrong email or password.'});
            
            // create user's token
            const jwt = createJWT(currentUser);
            const expiredAt = decodeJWT(jwt).exp;
            const { _id, firstName, surName, phoneNumber, userRole, addresses, cart } = currentUser;
            const userInformation = { _id, emailAddress: fixedEmail, firstName, surName, phoneNumber, userRole, addresses, cart};
            
            // return user's data
            return res.json({
                message: 'logged-in successfully',
                information:userInformation,
                expiredAt:expiredAt,
                token:jwt
            });

        }catch (err) {
            return res.status(400).json({
                message:'Cant sign-in in this moment please try again in a few minutes',
                err:err
            });
        }
    });

// export router
module.exports = router;