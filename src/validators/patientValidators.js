const { body } = require('express-validator');

const createPatientValidator = [
  body('mrn').trim().notEmpty(),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('dateOfBirth').isISO8601(),
  body('sex').isIn(['Male', 'Female', 'Other']),
  body('phone').trim().notEmpty(),
];

const updatePatientValidator = [
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('dateOfBirth').optional().isISO8601(),
  body('sex').optional().isIn(['Male', 'Female', 'Other']),
  body('phone').optional().trim().notEmpty(),
];

module.exports = { createPatientValidator, updatePatientValidator };
