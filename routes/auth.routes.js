const express = require('express');
const router = express.Router();
// Import controllers
const {
  signup,
  login,
  getMe,
  logout,
  updatePassword,
  forgotPassword, 
  sendOTP,
  verifyOTP,
} = require('../controllers/auth.controller');

// Import middlewares
const validate = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimiter.middleware');

// Import validators
const {
  signupSchema,
  loginSchema,
  passwordChangeSchema,
  emailSchema,
  verifyOTPSchema,
  sendOTPSchema,
} = require('../validators/auth.validator');

/**
 * AUTHENTICATION ROUTES
 * 
 * All routes are prefixed with /api/auth (configured in server.js)
 */

// Public Routes
router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/login', authLimiter, validate(loginSchema), login);

// OTP SYSTEM
router.post('/send-otp', authLimiter, validate(sendOTPSchema), sendOTP);
router.post('/verify-otp', authLimiter, validate(verifyOTPSchema), verifyOTP);

// Forgot Password
router.post('/forgot-password', authLimiter, validate(emailSchema), forgotPassword);

// Protected Routes (require authentication)
router.get('/me', protect, getMe);
router.post('/logout', logout);
router.put('/updatepassword', protect, validate(passwordChangeSchema), updatePassword);

module.exports = router;