const prisma = require('../config/prisma');

async function createEncounter(req, res, next) {
  try {
    const encounter = await prisma.encounter.create({
      data: {
        ...req.body,
        doctorId: req.user.sub,
      },
      include: {
        patient: true,
      },
    });

    if (req.body.appointmentId) {
      await prisma.appointment.update({
        where: { id: req.body.appointmentId },
        data: { status: 'COMPLETED' },
      });
    }

    return res.status(201).json({ success: true, data: encounter });
  } catch (error) {
    return next(error);
  }
}

async function listEncounters(req, res, next) {
  try {
    const { patientId, doctorId } = req.query;
    const encounters = await prisma.encounter.findMany({
      where: {
        patientId: patientId || undefined,
        doctorId: doctorId || undefined,
      },
      include: {
        patient: true,
        doctor: { select: { id: true, fullName: true } },
      },
      orderBy: { visitDate: 'desc' },
    });

    return res.json({ success: true, data: encounters });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createEncounter, listEncounters };
