const Joi = require('joi');

// Validation schema for creating a snack
const createSnackSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required()
    .messages({
      'string.empty': 'Snack name is required',
      'string.min': 'Snack name must be at least 1 character',
      'string.max': 'Snack name must be less than 200 characters',
      'any.required': 'Snack name is required'
    }),
  
  country: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'Country is required',
      'string.min': 'Country must be at least 1 character',
      'string.max': 'Country must be less than 100 characters',
      'any.required': 'Country is required'
    }),
  
  description: Joi.string().trim().min(1).max(1000).required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 1 character',
      'string.max': 'Description must be less than 1000 characters',
      'any.required': 'Description is required'
    }),
  
  type: Joi.string().trim().valid('main', 'snack', 'dessert', 'soup', 'street food').required()
    .messages({
      'any.only': 'Type must be one of: main, snack, dessert, soup, street food',
      'any.required': 'Type is required'
    }),
  
  imageUrl: Joi.string().uri().trim().required()
    .messages({
      'string.uri': 'Image URL must be a valid URL',
      'string.empty': 'Image URL is required',
      'any.required': 'Image URL is required'
    }),
  
  photographer: Joi.string().trim().max(200).optional()
    .messages({
      'string.max': 'Photographer name must be less than 200 characters'
    }),
  
  tags: Joi.array().items(Joi.string().trim().min(1).max(50)).optional()
    .messages({
      'array.base': 'Tags must be an array',
      'string.min': 'Each tag must be at least 1 character',
      'string.max': 'Each tag must be less than 50 characters'
    }),
  
  taste: Joi.number().min(1).max(5).optional()
    .messages({
      'number.base': 'Taste rating must be a number',
      'number.min': 'Taste rating must be between 1 and 5',
      'number.max': 'Taste rating must be between 1 and 5'
    }),
  
  spiciness: Joi.number().min(1).max(5).optional()
    .messages({
      'number.base': 'Spiciness rating must be a number',
      'number.min': 'Spiciness rating must be between 1 and 5',
      'number.max': 'Spiciness rating must be between 1 and 5'
    }),
  
  uniqueness: Joi.number().min(1).max(5).optional()
    .messages({
      'number.base': 'Uniqueness rating must be a number',
      'number.min': 'Uniqueness rating must be between 1 and 5',
      'number.max': 'Uniqueness rating must be between 1 and 5'
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
  createSnackSchema,
  snackIdSchema
};

