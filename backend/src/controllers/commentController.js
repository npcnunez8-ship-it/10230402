const { getComments, addComment } = require('../snackService');
const { asyncHandler } = require('../middleware/errorHandler');

// Get comments for a snack
const getSnackComments = asyncHandler(async (req, res) => {
  const id = req.params.id; // Already validated and converted by middleware
  const result = getComments(id);
  
  if (result.error) {
    const error = new Error(result.error);
    error.statusCode = 404;
    throw error;
  }
  
  res.json(result);
});

// Add a comment to a snack
const createComment = asyncHandler(async (req, res) => {
  const id = req.params.id; // Already validated and converted by middleware
  const result = addComment(id, req.body); // Already validated by middleware
  
  if (result.error) {
    const error = new Error(result.error);
    error.statusCode = result.error === 'Snack not found' ? 404 : 400;
    throw error;
  }
  
  res.status(201).json(result);
});

module.exports = {
  getSnackComments,
  createComment
};

