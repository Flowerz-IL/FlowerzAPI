import { string } from 'joi';
import { isEmail } from 'validator';

//model: general, Item ID
const IDRequired = { 
    type:String,
    required: true,
    trim: true,
};

//model: flowerBouqet, bouquet color
const COLORS = ['WHITE','PINK','YELLOW','GREEN','BLUE','LIGHT BLUE','PURPLE'];
const colorRequired = {
    type:String,
    required: true, 
    trim:true,
    enum:COLORS,
};

//model: flowerBouqet, bouquet price
const priceRequired = {
    type:Number,
    required: true, 
    trim:true,
};


//model: flowerBouqet, bouquet size
const SIZE_OPTIONS = ['S','M','L','XXL'];
const sizeRequired = {
    type:String,
    required: true,
    trim: true,
    enum:SIZE_OPTIONS,
}

//model: general, image path, description  
const longStringRequired = {
    type:String,
    required: true,
    trim: true,
};

//model: general
const boolRequired = {
    type: Boolean,
    required: true,
}


//model: flowerBouqet, delivery frequency every 1 or 2 weeks 
const FREQUENCY = ['1','2']
const frequencyWeeksRequired = {
    type: Number,
    required: true,
    enum: FREQUENCY,
}

//model: cart, total sum of purchase 
const totalSumRequired = {
    type: Number,
    required: true,
};


const emailAddressRequired = {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
};

const phoneNumberRequired = {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
};      

const ROLES = ['ADMIN','DELIVERY','FLOURIST','USER'] 
const userRoleRequired = {
    type: String,
    required:true,
    enum: ROLES,
}

const dateRequired = {
    type: Date, 
    required: true,
    default: Date.now,
}

CATEGORIES = ['BOUQUET','WINE','NUTS']
const categoryRequired = {
type: string, 
default:'BOUQUET',
enum:CATEGORIES,
}


module.exports = {
    IDRequired, SIZE_OPTIONS, sizeRequired,
    COLORS, colorRequired, priceRequired,
    longStringRequired, boolRequired, frequencyWeeksRequired,
    totalSum,FREQUENCY,emailAddressRequired,
    phoneNumberRequired,ROLES,userRoleRequired,
    CATEGORIES,categoryRequired,

// here the rest of the modules 
};