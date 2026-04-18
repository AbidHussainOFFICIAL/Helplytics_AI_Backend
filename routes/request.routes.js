const express = require('express');
const router = express.Router();

const {
  createRequest,
  getRequests,
  canHelp,
  markCompleted,
} = require('../controllers/request.controller');

const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const { createRequestSchema } = require('../validators/request.validator');

// Create request
router.post('/', protect, validate(createRequestSchema), createRequest);

// View & filter requests
router.get('/', protect, getRequests);

// I can help
router.post('/:id/help', protect, canHelp);

// Mark as solved
router.put('/:id/complete', protect, markCompleted);

module.exports = router;