
const bcrypt = require('bcrypt');

/**
 * The function translate a plain text to
 * cypher text one using bcrypt hashing algorithm.
 * 
 * @param {String} string user's password
 * @returns {Promise<String>} encrypted password
 */
module.exports.encryptText = string => bcrypt.hash(string, Number(process.env.SALT_ROUNDS));

/**
 * The function compares a nonHashed string to hashed string,
 * and determines whether the hashed string was built from the
 * nonHashed one.
 * 
 * @param {String} string string to compare
 * @param {String} hashedString HashedString to compare to
 * @returns {Promise<Boolean>} strings have the same origin ? true : false
 */
module.exports.compareStringToHash = (string, hashedString) => bcrypt.compare(string, hashedString);