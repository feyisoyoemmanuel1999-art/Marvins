const express = require('express');
const authController = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidators');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginValidator, validateRequest, authController.login);

module.exports = router;
