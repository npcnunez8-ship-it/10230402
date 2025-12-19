const express = require('express');
const router = express.Router();
const {
  getSnackComments,
  createComment
} = require('../controllers/commentController');
const { validate } = require('../middleware/validation');
const { createCommentSchema, snackIdSchema } = require('../validators/commentValidator');

router.get('/:id/comments', validate(snackIdSchema, 'params'), getSnackComments);
router.post('/:id/comments', validate(snackIdSchema, 'params'), validate(createCommentSchema), createComment);

module.exports = router;

