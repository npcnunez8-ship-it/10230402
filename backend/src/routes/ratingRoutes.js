const express = require('express');
const router = express.Router();
const {
  getSnackRatings,
  createRating
} = require('../controllers/ratingController');
const { validate } = require('../middleware/validation');
const { createRatingSchema, snackIdSchema } = require('../validators/ratingValidator');

router.get('/:id/ratings', validate(snackIdSchema, 'params'), getSnackRatings);
router.post('/:id/ratings', validate(snackIdSchema, 'params'), validate(createRatingSchema), createRating);

module.exports = router;

