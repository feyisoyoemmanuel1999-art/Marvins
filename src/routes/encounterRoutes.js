const express = require('express');
const encounterController = require('../controllers/encounterController');
const { authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');
const { createEncounterValidator } = require('../validators/encounterValidators');

const router = express.Router();

router.get('/', authorize('ADMIN', 'DOCTOR', 'NURSE'), encounterController.listEncounters);
router.post('/', authorize('DOCTOR'), createEncounterValidator, validateRequest, encounterController.createEncounter);

module.exports = router;
