const prisma = require('../config/prisma');

async function createAppointment(req, res, next) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        ...req.body,
        scheduledAt: new Date(req.body.scheduledAt),
        createdByUserId: req.user.sub,
      },
    });
    return res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    return next(error);
  }
}

async function listAppointments(req, res, next) {
  try {
    const { doctorId, date, status } = req.query;
    const where = {};

    if (doctorId) where.doctorId = doctorId;
    if (status) where.status = status;

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      where.scheduledAt = { gte: start, lte: end };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: { select: { id: true, fullName: true, email: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });

    return res.json({ success: true, data: appointments });
  } catch (error) {
    return next(error);
  }
}

async function updateAppointment(req, res, next) {
  try {
    const payload = { ...req.body };
    if (payload.scheduledAt) {
      payload.scheduledAt = new Date(payload.scheduledAt);
    }

    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: payload,
    });

    return res.json({ success: true, data: appointment });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    return next(error);
  }
}

async function cancelAppointment(req, res, next) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: {
        status: 'CANCELLED',
        cancellationReason: req.body.cancellationReason || null,
      },
    });

    return res.json({ success: true, data: appointment });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    return next(error);
  }
}

module.exports = {
  createAppointment,
  listAppointments,
  updateAppointment,
  cancelAppointment,
};
