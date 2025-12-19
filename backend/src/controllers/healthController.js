const { asyncHandler } = require('../middleware/errorHandler');

// Health check controller
const getHealth = asyncHandler(async (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

module.exports = {
  getHealth
};

