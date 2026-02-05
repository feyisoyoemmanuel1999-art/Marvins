const { body } = require('express-validator');

const createEncounterValidator = [
  body('patientId').isString().notEmpty(),
  body('appointmentId').optional().isString(),
  body('diagnosisNotes').trim().notEmpty(),
  body('chiefComplaint').optional().isString(),
  body('vitals').optional().isString(),
  body('prescribedMeds').optional().isString(),
];

module.exports = { createEncounterValidator };
