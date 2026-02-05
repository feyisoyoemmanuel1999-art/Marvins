const express = require('express');
const patientController = require('../controllers/patientController');
const { authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');
const { createPatientValidator, updatePatientValidator } = require('../validators/patientValidators');

const router = express.Router();

router.get('/', authorize('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'), patientController.listPatients);
router.get('/:id', authorize('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'), patientController.getPatient);
router.post('/', authorize('ADMIN', 'NURSE', 'RECEPTIONIST'), createPatientValidator, validateRequest, patientController.createPatient);
router.put('/:id', authorize('ADMIN', 'NURSE', 'RECEPTIONIST'), updatePatientValidator, validateRequest, patientController.updatePatient);

module.exports = router;
