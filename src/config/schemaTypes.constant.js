
const mongoose = require('mongoose');
require('mongoose-type-url');
require('mongoose-type-email');

// -----------------------------------------------------------------------------------------------
// ------------------------------------------- STRINGS -------------------------------------------
// -----------------------------------------------------------------------------------------------

const [SMALL_STRING, MEDIUM_STRING, LONG_STRING] = [40, 80, 120];

/**
 * Required trimmed string with no restrictions.
 */
module.exports.requiredString = {
    type:String,
    required: true,
    trim: true,
};

/**
 * Trimmed string with no restrictions.
 */
module.exports.nonRequiredString = {
    type:String,
    trim: true,
};

/**
 * Required trimmed string with maximum of 40 characters.
 */
module.exports.requiredSmallString = {...module.exports.requiredString, maxlength:SMALL_STRING};

/**
 * Trimmed string with maximum of 40 characters.
 */
module.exports.nonRequiredSmallString = {...module.exports.nonRequiredString, maxlength: SMALL_STRING};

/**
 * Required trimmed string with maximum of 80 characters.
 */
module.exports.requiredMediumString = {...module.exports.requiredString, maxlength: MEDIUM_STRING};

/**
 * Trimmed string with maximum of 80 characters.
 */
module.exports.nonRequiredMediumString = {...module.exports.nonRequiredString, maxlength: MEDIUM_STRING};

/**
 * Required trimmed string with maximum of 120 characters.
 */
module.exports.requiredLongString = {...module.exports.requiredString, maxlength: LONG_STRING };

/**
 * Trimmed string with maximum of 120 characters.
 */
module.exports.nonRequiredLongString = {...module.exports.nonRequiredString, maxlength: LONG_STRING};


// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Numbers -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Number with no restrictions.
 */
module.exports.requiredNumber = {type:Number, required: true};

/**
 * Number with no restrictions.
 */
module.exports.nonRequiredNumber = {type:Number };

// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Boolean -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Boolean with no restrictions.
 */
module.exports.requiredBoolean = { type: Boolean, required: true}

/**
 * Boolean with no restrictions.
 */
module.exports.nonRequiredBoolean = {type: Boolean}

// -----------------------------------------------------------------------------------------------
// -------------------------------------------- Enums --------------------------------------------
// -----------------------------------------------------------------------------------------------

const SIZE_OPTIONS = ['S','M','L', 'XL', 'XXL'];
const OCCASIONS = ['BIRTHDAY', 'WEEKEND_VIBES','APOLOGIZE','ROMANTIC','NORMAL','CELEBRATE','CALM','PRETTY_HOUSE'];
const ROLES = ['ADMIN','PROVIDER','USER'];

/**
 * String fixed SIZE_OPTIONS
 */
module.exports.requiredSize = {...module.exports.requiredString, enum:SIZE_OPTIONS };

/**
 * String fixed ROLES
 */
module.exports.requiredUserRole = {...module.exports.requiredString, enum: ROLES};

/**
 * String fixed CATEGORIES
 */
module.exports.requiredOccasionStyle = {...module.exports.requiredString, enum: OCCASIONS};

// -----------------------------------------------------------------------------------------------
// -------------------------------------------- Other --------------------------------------------
// -----------------------------------------------------------------------------------------------

module.exports.phoneNumberRequired = {
    ...module.exports.requiredString,
    validate: {
      validator: function(phoneNumber) {
        return /\d{3}-\d{3}-\d{4}/.test(phoneNumber);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
};

module.exports.requiredUrl = {type: mongoose.SchemaTypes.Url, required: true};

module.exports.nonRequiredUrl = {type: mongoose.SchemaTypes.Url};

module.exports.requiredEmail = {type: mongoose.SchemaTypes.Email, required: true};

module.exports.requiredAddress = {
    name: module.exports.requiredSmallString,
    city: module.exports.requiredSmallString,
    street: module.exports.requiredMediumString,
    houseNumber: module.exports.requiredSmallString,
    floorNumber: module.exports.nonRequiredNumber,
    aptNumber: module.exports.nonRequiredNumber,
};

module.exports.nonRequiredAddress = {
    name: module.exports.nonRequiredSmallString,
    city: module.exports.nonRequiredSmallString,
    street: module.exports.nonRequiredMediumString,
    houseNumber: module.exports.nonRequiredSmallString,
    floorNumber: module.exports.nonRequiredNumber,
    aptNumber: module.exports.nonRequiredNumber,
};
