const express = require('express');
const { authenticate } = require('../middleware/auth');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const patientRoutes = require('./patientRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const encounterRoutes = require('./encounterRoutes');
const scheduleRoutes = require('./scheduleRoutes');

const router = express.Router();

router.get('/health', (req, res) => res.json({ success: true, message: 'HMS API is running' }));
router.use('/auth', authRoutes);
router.use(authenticate);
router.use('/users', userRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/encounters', encounterRoutes);
router.use('/doctor-schedules', scheduleRoutes);

module.exports = router;
