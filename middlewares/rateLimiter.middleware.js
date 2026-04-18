const rateLimit = require('express-rate-limit');
const config = require('../config/auth.config');

/**
 * RATE LIMITING MIDDLEWARE
 */

// General API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: config.rateLimit.message,
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

// Strict Rate Limiter for Auth Routes (Login/Signup)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  keyGenerator: (req) => {
    const email = req.body?.email || 'anonymous';
    return `${req.ip}-${email}`;
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
};