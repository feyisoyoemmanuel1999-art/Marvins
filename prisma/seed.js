const bcrypt = require('bcryptjs');
const prisma = require('../src/config/prisma');

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const users = [
    { fullName: 'Alice Admin', email: 'admin@hms.local', role: 'ADMIN' },
    { fullName: 'Daniel Doctor', email: 'doctor@hms.local', role: 'DOCTOR' },
    { fullName: 'Nancy Nurse', email: 'nurse@hms.local', role: 'NURSE' },
    { fullName: 'Rachel Reception', email: 'reception@hms.local', role: 'RECEPTIONIST' },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        passwordHash,
      },
    });
  }

  const doctor = await prisma.user.findUnique({ where: { email: 'doctor@hms.local' } });

  const patient = await prisma.patient.upsert({
    where: { mrn: 'MRN-0001' },
    update: {},
    create: {
      mrn: 'MRN-0001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-06-15'),
      sex: 'Male',
      phone: '+1555000001',
      address: '123 Health St',
      emergencyContact: 'Jane Doe +1555000002',
    },
  });

  await prisma.doctorSchedule.upsert({
    where: {
      doctorId_weekday_startTime_endTime: {
        doctorId: doctor.id,
        weekday: 1,
        startTime: '09:00',
        endTime: '17:00',
      },
    },
    update: {},
    create: {
      doctorId: doctor.id,
      weekday: 1,
      startTime: '09:00',
      endTime: '17:00',
      location: 'OPD Room 2',
    },
  });

  const appointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      scheduledAt: new Date(),
      reason: 'Follow-up visit',
      createdByUserId: doctor.id,
    },
  });

  await prisma.encounter.create({
    data: {
      patientId: patient.id,
      appointmentId: appointment.id,
      doctorId: doctor.id,
      diagnosisNotes: 'Mild seasonal allergies.',
      vitals: 'BP 120/80, HR 76 bpm, Temp 98.6F',
      prescribedMeds: 'Cetirizine 10mg once daily for 7 days',
      chiefComplaint: 'Sneezing and nasal congestion',
    },
  });

  console.log('Seed completed. Default password for all users: Password123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
