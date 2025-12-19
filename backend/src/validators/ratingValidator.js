const Joi = require('joi');

// Validation schema for creating a rating
const createRatingSchema = Joi.object({
  taste: Joi.number().integer().min(1).max(5).required()
    .messages({
      'number.base': 'Taste rating must be a number',
      'number.integer': 'Taste rating must be an integer',
      'number.min': 'Taste rating must be between 1 and 5',
      'number.max': 'Taste rating must be between 1 and 5',
      'any.required': 'Taste rating is required'
    }),
  
  spiciness: Joi.number().integer().min(1).max(5).required()
    .messages({
      'number.base': 'Spiciness rating must be a number',
      'number.integer': 'Spiciness rating must be an integer',
      'number.min': 'Spiciness rating must be between 1 and 5',
      'number.max': 'Spiciness rating must be between 1 and 5',
      'any.required': 'Spiciness rating is required'
    }),
  
  uniqueness: Joi.number().integer().min(1).max(5).required()
    .messages({
      'number.base': 'Uniqueness rating must be a number',
      'number.integer': 'Uniqueness rating must be an integer',
      'number.min': 'Uniqueness rating must be between 1 and 5',
      'number.max': 'Uniqueness rating must be between 1 and 5',
      'any.required': 'Uniqueness rating is required'
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
  createRatingSchema,
  snackIdSchema
};

