const { body } = require('express-validator');

const createAppointmentValidator = [
  body('patientId').isString().notEmpty(),
  body('doctorId').isString().notEmpty(),
  body('scheduledAt').isISO8601(),
  body('reason').optional().isString(),
];

const updateAppointmentValidator = [
  body('doctorId').optional().isString().notEmpty(),
  body('scheduledAt').optional().isISO8601(),
  body('status').optional().isIn(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
  body('reason').optional().isString(),
];

module.exports = { createAppointmentValidator, updateAppointmentValidator };
