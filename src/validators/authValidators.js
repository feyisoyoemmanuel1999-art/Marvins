const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password minimum length is 6'),
];

const createUserValidator = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password minimum length is 6'),
  body('role').isIn(['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']).withMessage('Invalid role'),
];

module.exports = { loginValidator, createUserValidator };
