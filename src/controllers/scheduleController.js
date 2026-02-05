const prisma = require('../config/prisma');

async function upsertDoctorSchedule(req, res, next) {
  try {
    const { doctorId } = req.params;
    const { weekday, startTime, endTime, location } = req.body;

    const schedule = await prisma.doctorSchedule.upsert({
      where: {
        doctorId_weekday_startTime_endTime: {
          doctorId,
          weekday,
          startTime,
          endTime,
        },
      },
      update: {
        isActive: true,
        location,
      },
      create: {
        doctorId,
        weekday,
        startTime,
        endTime,
        location,
      },
    });

    return res.json({ success: true, data: schedule });
  } catch (error) {
    return next(error);
  }
}

async function listDoctorSchedules(req, res, next) {
  try {
    const { doctorId } = req.params;
    const schedules = await prisma.doctorSchedule.findMany({
      where: { doctorId, isActive: true },
      orderBy: [{ weekday: 'asc' }, { startTime: 'asc' }],
    });

    return res.json({ success: true, data: schedules });
  } catch (error) {
    return next(error);
  }
}

module.exports = { upsertDoctorSchedule, listDoctorSchedules };
