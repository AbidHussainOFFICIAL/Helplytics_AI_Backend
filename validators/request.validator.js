const { z } = require('zod');

const createRequestSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5),
  tags: z.array(z.string()).optional(),

  category: z
  .string()
  .min(2, 'Category must be at least 2 characters')
  .max(50, 'Category too long'),

  urgency: z
    .enum(['low', 'medium', 'high', 'critical'])
    .optional(),
});

module.exports = {
  createRequestSchema,
};