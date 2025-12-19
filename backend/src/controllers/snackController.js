const { listSnacks, getSnack, addSnack } = require('../snackService');
const { asyncHandler } = require('../middleware/errorHandler');

// Get all snacks
const getAllSnacks = asyncHandler(async (_req, res) => {
  const snacks = listSnacks();
  res.json(snacks);
});

// Get a single snack by ID
const getSnackById = asyncHandler(async (req, res) => {
  const id = req.params.id; // Already validated and converted by middleware
  const result = getSnack(id);
  
  if (!result) {
    const error = new Error('Snack not found');
    error.statusCode = 404;
    throw error;
  }
  
  res.json(result);
});

// Create a new snack
const createSnack = asyncHandler(async (req, res) => {
  const created = addSnack(req.body); // Already validated by middleware
  
  if (created.error) {
    const error = new Error(created.error);
    error.statusCode = 400;
    throw error;
  }
  
  res.status(201).json(created);
});

module.exports = {
  getAllSnacks,
  getSnackById,
  createSnack
};

