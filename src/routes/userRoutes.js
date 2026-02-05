const express = require('express');
const userController = require('../controllers/userController');
const { authorize } = require('../middleware/auth');
const { createUserValidator } = require('../validators/authValidators');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.get('/', authorize('ADMIN'), userController.listUsers);
router.post('/', authorize('ADMIN'), createUserValidator, validateRequest, userController.createUser);

module.exports = router;
