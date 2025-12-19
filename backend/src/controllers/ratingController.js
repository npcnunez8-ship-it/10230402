const { getRatings, addRating } = require('../snackService');
const { asyncHandler } = require('../middleware/errorHandler');

// Get ratings for a snack
const getSnackRatings = asyncHandler(async (req, res) => {
  const id = req.params.id; // Already validated and converted by middleware
  const result = getRatings(id);
  
  if (result.error) {
    const error = new Error(result.error);
    error.statusCode = 404;
    throw error;
  }
  
  res.json(result);
});

// Add a rating to a snack
const createRating = asyncHandler(async (req, res) => {
  const id = req.params.id; // Already validated and converted by middleware
  const result = addRating(id, req.body); // Already validated by middleware
  
  if (result.error) {
    const error = new Error(result.error);
    error.statusCode = result.error === 'Snack not found' ? 404 : 400;
    throw error;
  }
  
  res.status(201).json(result);
});

module.exports = {
  getSnackRatings,
  createRating
};

