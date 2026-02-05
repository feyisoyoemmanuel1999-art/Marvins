const API = '/api';
let token = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');

const loginCard = document.getElementById('loginCard');
const app = document.getElementById('app');
const whoami = document.getElementById('whoami');

function setSession(session) {
  token = session?.token || null;
  currentUser = session?.user || null;

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(currentUser));
    loginCard.style.display = 'none';
    app.style.display = 'block';
    whoami.textContent = `${currentUser.fullName} (${currentUser.role})`;
    loadTodayAppointments();
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    loginCard.style.display = 'block';
    app.style.display = 'none';
  }
}

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || 'API error');
  }
  return payload.data;
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setSession(data);
    document.getElementById('loginMessage').textContent = 'Login successful';
  } catch (error) {
    document.getElementById('loginMessage').textContent = error.message;
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => setSession(null));

document.getElementById('patientForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    mrn: mrn.value,
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: dateOfBirth.value,
    sex: sex.value,
    phone: phone.value,
    address: address.value,
    emergencyContact: emergencyContact.value,
  };

  await api('/patients', { method: 'POST', body: JSON.stringify(payload) });
  alert('Patient created');
});

document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  await api('/appointments', {
    method: 'POST',
    body: JSON.stringify({
      patientId: patientId.value,
      doctorId: doctorId.value,
      scheduledAt: new Date(scheduledAt.value).toISOString(),
      reason: reason.value,
    }),
  });
  alert('Appointment created');
  loadTodayAppointments();
});

document.getElementById('encounterForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  await api('/encounters', {
    method: 'POST',
    body: JSON.stringify({
      patientId: encPatientId.value,
      appointmentId: encAppointmentId.value || undefined,
      diagnosisNotes: diagnosisNotes.value,
      vitals: vitals.value,
      prescribedMeds: prescribedMeds.value,
    }),
  });
  alert('Encounter recorded');
  loadTodayAppointments();
});

document.getElementById('refreshAppointments').addEventListener('click', loadTodayAppointments);

async function loadTodayAppointments() {
  const date = new Date().toISOString().slice(0, 10);
  const rows = document.getElementById('appointmentRows');
  rows.innerHTML = '';

  const appointments = await api(`/appointments?date=${date}`);
  for (const appointment of appointments) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.id}</td>
      <td>${appointment.patient.firstName} ${appointment.patient.lastName}</td>
      <td>${appointment.doctor.fullName}</td>
      <td>${new Date(appointment.scheduledAt).toLocaleString()}</td>
      <td>${appointment.status}</td>
    `;
    rows.appendChild(row);
  }
}

setSession(token && currentUser ? { token, user: currentUser } : null);
