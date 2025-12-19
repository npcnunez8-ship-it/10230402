const Joi = require('joi');

// Validation schema for creating a comment
const createCommentSchema = Joi.object({
  text: Joi.string().trim().min(1).max(1000).required()
    .messages({
      'string.empty': 'Comment text is required',
      'string.min': 'Comment text must be at least 1 character',
      'string.max': 'Comment text must be less than 1000 characters',
      'any.required': 'Comment text is required'
    }),
  
  author: Joi.string().trim().max(100).optional()
    .messages({
      'string.max': 'Author name must be less than 100 characters'
    })
});

// Validation schema for snack ID parameter
const snackIdSchema = Joi.object({
  id: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Snack ID must be a number',
      'number.integer': 'Snack ID must be an integer',
      'number.positive': 'Snack ID must be a positive number',
      'any.required': 'Snack ID is required'
    })
});

module.exports = {
  createCommentSchema,
  snackIdSchema
};

