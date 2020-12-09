
// -----------------------------------------------------------------------------------------------
// ------------------------------------------- STRINGS -------------------------------------------
// -----------------------------------------------------------------------------------------------

const [SMALL_STRING, MEDIUM_STRING, LONG_STRING] = [40, 80, 120];

/**
 * Required trimmed string with no restrictions.
 */
export const requiredString = {
    type:String,
    required: true,
    trim: true,
};

/**
 * Trimmed string with no restrictions.
 */
export const nonRequiredString = {
    type:String,
    trim: true,
};

/**
 * Required trimmed string with maximum of 40 characters.
 */
export const requiredSmallString = {...RequiredString, maxlength: SMALL_STRING};

/**
 * Trimmed string with maximum of 40 characters.
 */
export const nonRequiredSmallString = {...NonRequiredString, maxlength: SMALL_STRING};

/**
 * Required trimmed string with maximum of 80 characters.
 */
export const requiredMediumString = {...RequiredString, maxlength: MEDIUM_STRING};

/**
 * Trimmed string with maximum of 80 characters.
 */
export const nonRequiredSmallString = {...NonRequiredString, maxlength: MEDIUM_STRING};

/**
 * Required trimmed string with maximum of 120 characters.
 */
export const requiredLongString = {...RequiredString, maxlength: LONG_STRING};

/**
 * Trimmed string with maximum of 120 characters.
 */
export const nonRequiredSmallString = {...NonRequiredString, maxlength: LONG_STRING};


// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Numbers -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Number with no restrictions.
 */
export const requiredNumber = {type:Number, required: true};

/**
 * Number with no restrictions.
 */
export const nonRequiredNumber = {type:Number };

// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Boolean -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Boolean with no restrictions.
 */
export const requiredBoolean = { type: Boolean, required: true}

/**
 * Boolean with no restrictions.
 */
export const nonRequiredBoolean = {type: Boolean}

// -----------------------------------------------------------------------------------------------
// -------------------------------------------- Enums --------------------------------------------
// -----------------------------------------------------------------------------------------------

const COLORS = ['WHITE','PINK','YELLOW','GREEN','BLUE','LIGHT BLUE','PURPLE'];
const SIZE_OPTIONS = ['S','M','L','XXL'];
const FREQUENCY = ['1','2'];
const ROLES = ['ADMIN','DELIVERY','FLOURIST','USER'];
const CATEGORIES = ['BOUQUET','WINE','NUTS'];
const OCCASIONS = ['Birthday', 'Happy_FRIDAY'];

/**
 * String fixed COLORS
 */
export const requiredFlowerColor = {...requiredString, enum:COLORS };

/**
 * String fixed SIZE_OPTIONS
 */
export const requiredSize = {...requiredString, enum:SIZE_OPTIONS };

/**
 * String fixed ROLES
 */
export const requiredUserRole = {...requiredString, enum: ROLES};

/**
 * String fixed CATEGORIES
 */
export const requiredCategory = {...requiredNumber, enum: CATEGORIES};

/**
 * String fixed CATEGORIES
 */
export const requiredOccasionStyle = {...requiredNumber, enum: OCCASIONS};

/**
 * Number fixed FREQUENCY
 */
export const requiredFrequencyWeeks = {...requiredNumber, enum: FREQUENCY};

// -----------------------------------------------------------------------------------------------
// -------------------------------------------- Other --------------------------------------------
// -----------------------------------------------------------------------------------------------

export const phoneNumberRequired = {
    ...requiredString,
    validate: {
      validator: function(phoneNumber) {
        return /\d{3}-\d{3}-\d{4}/.test(phoneNumber);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
};      