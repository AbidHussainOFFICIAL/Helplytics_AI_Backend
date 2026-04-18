const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/User');


/**
 * AUTH MIDDLEWARE - Protect Routes
 * 
 * router.get('/protected', protect, (req, res) => { ... });
 */

const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in cookies first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Then check Authorization header: "Bearer <token>"
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login to access this resource.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
      });
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'Password recently changed. Please login again.',
      });
    }

    // Attach user info to request object
    // You can access this in your route: req.user
    req.user = user;

    next();
  } catch (error) {
    // Token invalid or expired
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
    });
  }
};

/**
 * OPTIONAL: Role-based Authorization Middleware
 * 
 * Use after protect middleware to restrict access by role.
 * 
 * Usage:
 * router.get('/admin', protect, authorize('admin'), (req, res) => { ... });
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. User role not found.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      });
    }

    next();
  };
};

module.exports = { protect, authorize };