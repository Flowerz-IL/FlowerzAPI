
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

const COLORS = ['WHITE','PINK','YELLOW','GREEN','BLUE','LIGHT BLUE','PURPLE'];
const SIZE_OPTIONS = ['S','M','L','XXL'];
const FREQUENCY = ['1','2'];
const ROLES = ['ADMIN','DELIVERY','PROVIDER','USER'];
const CATEGORIES = ['BOUQUET','WINE','NUTS'];
const OCCASIONS = ['BIRTHDAY', 'WEEKENDVIBES','APOLOGIZE','ROMANTIC','NORMAL','CELEBRATE','CALM','PRETTYHOUSE'];
const FLOWERTYPES = ['ROSE','LILLY'];

/**
 * String fixed COLORS
 */
module.exports.requiredFlowerColor = {...module.exports.requiredString, enum:COLORS };

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
module.exports.requiredCategory = {...module.exports.requiredString, enum: CATEGORIES};

/**
 * String fixed CATEGORIES
 */
module.exports.requiredOccasionStyle = {...module.exports.requiredString, enum: OCCASIONS};

/**
 * Number fixed FREQUENCY
 */
module.exports.requiredFrequencyWeeks = {...module.exports.requiredString, enum: FREQUENCY};

/**
 * String fixed FLOWERTYPES
 */
module.exports.nonRequiredflowersTypes = {...module.exports.requiredMediumString, enum: FLOWERTYPES}


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