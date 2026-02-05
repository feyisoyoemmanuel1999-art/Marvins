const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const { authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/:doctorId', authorize('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'), scheduleController.listDoctorSchedules);
router.post('/:doctorId', authorize('ADMIN'), scheduleController.upsertDoctorSchedule);

module.exports = router;
