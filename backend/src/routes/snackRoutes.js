const express = require('express');
const router = express.Router();
const {
  getAllSnacks,
  getSnackById,
  createSnack
} = require('../controllers/snackController');
const { validate } = require('../middleware/validation');
const { createSnackSchema, snackIdSchema } = require('../validators/snackValidator');

router.get('/', getAllSnacks);
router.get('/:id', validate(snackIdSchema, 'params'), getSnackById);
router.post('/', validate(createSnackSchema), createSnack);

module.exports = router;

