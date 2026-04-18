const { z } = require('zod');

/**
 * VALIDATION SCHEMAS
 */

// Signup Validation Schema
const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .trim(),
  
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),

    role: z
    .enum(['need_help', 'can_help', 'both'])
    .optional(),
});

// Login Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(1, 'Password is required'),
});

// Email Validation Schema (for forgot password, etc.)
const emailSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
});

// Password Change Schema
const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});

const verifyOTPSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  otp: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
  purpose: z.enum(['verify', 'reset']),
  password: z.string().min(6).optional(),
}).refine((data) => {
  if (data.purpose === 'reset') return !!data.password;
  return true;
}, {
  message: 'Password is required for reset',
  path: ['password'],
});

const sendOTPSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  purpose: z.enum(['verify', 'reset']),
});

module.exports = {
  signupSchema,
  loginSchema,
  emailSchema,
  passwordChangeSchema,
  verifyOTPSchema,
  sendOTPSchema,
};