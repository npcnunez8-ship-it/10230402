const { getLeaderboard } = require('../snackService');
const { asyncHandler } = require('../middleware/errorHandler');

// Get leaderboard data
const getLeaderboardData = asyncHandler(async (_req, res) => {
  const leaderboard = getLeaderboard();
  res.json(leaderboard);
});

module.exports = {
  getLeaderboardData
};

