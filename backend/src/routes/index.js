const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const snackRoutes = require('./snackRoutes');
const ratingRoutes = require('./ratingRoutes');
const commentRoutes = require('./commentRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

// Mount routes
router.use('/health', healthRoutes);
router.use('/snacks', snackRoutes);
router.use('/snacks', ratingRoutes);
router.use('/snacks', commentRoutes);
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;

