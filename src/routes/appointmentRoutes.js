const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');
const { createAppointmentValidator, updateAppointmentValidator } = require('../validators/appointmentValidators');

const router = express.Router();

router.get('/', authorize('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'), appointmentController.listAppointments);
router.post('/', authorize('ADMIN', 'NURSE', 'RECEPTIONIST'), createAppointmentValidator, validateRequest, appointmentController.createAppointment);
router.put('/:id', authorize('ADMIN', 'NURSE', 'RECEPTIONIST'), updateAppointmentValidator, validateRequest, appointmentController.updateAppointment);
router.patch('/:id/cancel', authorize('ADMIN', 'NURSE', 'RECEPTIONIST'), appointmentController.cancelAppointment);

module.exports = router;
