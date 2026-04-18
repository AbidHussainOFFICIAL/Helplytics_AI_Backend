const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const config = require('./config/auth.config');
const { apiLimiter } = require('./middlewares/rateLimiter.middleware');

/**
 * EXPRESS SERVER SETUP
 * 
 * This is the main server file. Minimal configuration required.
 */

const app = express();

// 1. CONNECT TO DATABASE FIRST
connectDB();

// 2. MIDDLEWARES
// ===========================
// MIDDLEWARES
// ===========================

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS - Configure based on your frontend URL
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true, // Allow cookies
}));

// Rate limiting (apply to all routes)
app.use(apiLimiter);

// 3. ROUTES
// ===========================
// ROUTES
// ===========================

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Auth API is running',
  });
});

// Auth routes
app.use('/api/auth', require('./routes/auth.routes'));

// Example: Protected route
const { protect } = require('./middlewares/auth.middleware');
app.get('/api/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: 'You have access to this protected route',
    user: req.user,
  });
});

// ===========================
// ERROR HANDLING
// ===========================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ===========================
// START SERVER
// ===========================

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.server.env} mode`);
  console.log(`API URL: http://localhost:${PORT}`);
});