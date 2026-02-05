# HMS MVP (Hospital Management System)

Minimal and extensible Hospital Management System for small-to-medium clinics/hospitals.

## Tech Stack
- Node.js + Express (REST API)
- Prisma ORM
- PostgreSQL
- JWT authentication + Role-based access control
- Vanilla HTML/CSS/JS frontend

## Features (MVP)
- Authentication and RBAC (`ADMIN`, `DOCTOR`, `NURSE`, `RECEPTIONIST`)
- Patient registration and profile management
- Appointment scheduling and updates/cancellation
- Basic encounter records (diagnosis notes, vitals, text medications)
- Doctor schedule management
- Admin user management

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── frontend/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── server.js
├── .env.example
└── package.json
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env`:
   ```bash
   cp .env.example .env
   ```

3. Run migrations and generate client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. Seed data:
   ```bash
   npm run prisma:seed
   ```

5. Start app:
   ```bash
   npm run dev
   ```

API base: `http://localhost:4000/api`
UI: `http://localhost:4000`

## Seed Users
All seeded users use password `Password123!`:
- `admin@hms.local` (ADMIN)
- `doctor@hms.local` (DOCTOR)
- `nurse@hms.local` (NURSE)
- `reception@hms.local` (RECEPTIONIST)

## Core API Endpoints

### Auth
- `POST /api/auth/login`

### Admin users
- `GET /api/users`
- `POST /api/users`

### Patients
- `POST /api/patients`
- `GET /api/patients`
- `GET /api/patients/:id`
- `PUT /api/patients/:id`

### Appointments
- `POST /api/appointments`
- `GET /api/appointments`
- `PUT /api/appointments/:id`
- `PATCH /api/appointments/:id/cancel`

### Encounters
- `POST /api/encounters`
- `GET /api/encounters`

### Doctor schedules
- `GET /api/doctor-schedules/:doctorId`
- `POST /api/doctor-schedules/:doctorId`

## Core User Flows
1. Receptionist registers patient via UI/API (`POST /patients`).
2. Receptionist schedules appointment (`POST /appointments`).
3. Doctor views daily appointments (`GET /appointments?date=YYYY-MM-DD`).
4. Doctor records encounter (`POST /encounters`).
5. Admin manages users and roles (`/users`).

## Notes
- Excludes billing, insurance, inventory, labs, advanced analytics, mobile apps, and external integrations.
- Built as an API-first modular monolith for fast iteration.
