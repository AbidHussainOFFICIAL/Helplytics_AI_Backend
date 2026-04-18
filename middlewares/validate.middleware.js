/**
 * VALIDATION MIDDLEWARE
 * 
 * Generic middleware to validate request body against Zod schemas.
 * No modifications needed - works with any Zod schema.
 */

const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Validate request body against schema
      const validatedData = schema.parse(req.body);
      
      // Replace req.body with validated and sanitized data
      req.body = validatedData;
      
      next();
    } catch (error) {
      // Zod validation error
      if (error.errors) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }

      // Other errors
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
      });
    }
  };
};

module.exports = validate;