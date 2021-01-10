
// import packages 
const JWT = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const jwtDecoder = require('jwt-decode');

/**
 * Assign jason web token to a given user
 * for a day
 * 
 * @param {object} user 
 * @returns {string} assigned JWT
 */
module.exports.createJWT = user => {
    if(!user) throw new Error('user is undefined');
    return JWT.sign(
        {
            sub: user._id,
            emailAddress:user.emailAddress,
            userRole: user.userRole,
            iss: 'api.flowerZIl',
            aud: 'client.flowerZIl'
        }, // payload
        process.env.JWT_SECRET, // secret
        {algorithm: 'HS256', expiresIn: '1d'} // HS256 -> sign with a secret
    );
};

/**
 * Function decode a jason web token to it's 
 * payload.
 * 
 * @param {String} jwt a json web token
 * @returns token payload
 */
module.exports.decodeJWT = jwt => jwtDecoder(jwt);

// 
/**
 * Middleware function.
 * Authenticate a given JWT.
 */
module.exports.JWTAuthentication = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    issuer: 'api.flowerZIl',
    audience: 'client.flowerZIl'
});

