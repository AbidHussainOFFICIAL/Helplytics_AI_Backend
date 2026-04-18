const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config/auth.config');

/**
 * UTILITY FUNCTIONS
 * 
 * Reusable helper functions for authentication.
 * No modifications needed for basic usage.
 */

/**
 * Generate JWT Token
 * @param {Object} payload - Data to encode in token (e.g., { id, email })
 * @returns {String} JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

/**
 * Hash Password
 * @param {String} password - Plain text password
 * @returns {Promise<String>} Hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(config.password.saltRounds);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare Password
 * @param {String} plainPassword - Plain text password
 * @param {String} hashedPassword - Hashed password from database
 * @returns {Promise<Boolean>} True if passwords match
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Send Token Response
 * Sends JWT token in cookie and JSON response
 * @param {Object} user - User data to include in response
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken({ id: user.id, email: user.email });
  const cookieOptions = {
    expires: new Date(Date.now() + config.cookie.expires * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
  };

  // // Cookie options
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + config.cookie.expires * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: config.cookie.httpOnly,
  //   secure: config.cookie.secure,
  //   sameSite: config.cookie.sameSite,
  // };

  // Send response with cookie and JSON
res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  sendTokenResponse,
};