const prisma = require('../config/prisma');

async function createPatient(req, res, next) {
  try {
    const patient = await prisma.patient.create({ data: req.body });
    return res.status(201).json({ success: true, data: patient });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'MRN already exists' });
    }
    return next(error);
  }
}

async function listPatients(req, res, next) {
  try {
    const { q } = req.query;
    const patients = await prisma.patient.findMany({
      where: q
        ? {
            OR: [
              { mrn: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } },
              { phone: { contains: q, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: patients });
  } catch (error) {
    return next(error);
  }
}

async function getPatient(req, res, next) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: {
        appointments: { orderBy: { scheduledAt: 'desc' }, take: 20 },
        encounters: { orderBy: { visitDate: 'desc' }, take: 20 },
      },
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    return res.json({ success: true, data: patient });
  } catch (error) {
    return next(error);
  }
}

async function updatePatient(req, res, next) {
  try {
    const patient = await prisma.patient.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json({ success: true, data: patient });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    return next(error);
  }
}

module.exports = {
  createPatient,
  listPatients,
  getPatient,
  updatePatient,
};
