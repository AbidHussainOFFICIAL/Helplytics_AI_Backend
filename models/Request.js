const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
    },

    tags: [String],

    category: {
  type: String,
  required: [true, 'Category is required'],
  trim: true,
  maxlength: 50,
},

    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    helpers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed'],
      default: 'open',
    },

    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    completedAt: Date,
    location: {
      city: String,
      country: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);