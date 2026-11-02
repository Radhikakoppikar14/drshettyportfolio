// Booking backend: receives the website's appointment form, adds the appointment to Google Calendar
// (doctor + patient are invited) and sends confirmation emails to both.
import 'dotenv/config';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const env = process.env;
const TZ = 'Asia/Kolkata';
const TZ_OFFSET = '+05:30'; // India has no daylight saving, so this is fixed
const MINUTES = Number(env.APPOINTMENT_MINUTES) || 30;
const CLINIC = {
  name: env.CLINIC_NAME || 'Svasti Heart and Dental Care',
  address: env.CLINIC_ADDRESS || 'HSR Layout, Bengaluru',
  phone: env.CLINIC_PHONE || '',
};

// Doctor details live on the server so nobody can make the clinic email an arbitrary address.
const DOCTORS = {
  heart: { name: env.HEART_DOCTOR_NAME || 'Dr. Sreekanth B. Shetty', email: env.HEART_DOCTOR_EMAIL, calendarId: env.HEART_CALENDAR_ID || 'primary' },
  dental: { name: env.DENTAL_DOCTOR_NAME || 'Dr. Chitra S. Shetty', email: env.DENTAL_DOCTOR_EMAIL, calendarId: env.DENTAL_CALENDAR_ID || 'primary' },
};

// ---------- Google Calendar client ----------
function googleAuth() {
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  if (env.GOOGLE_SERVICE_ACCOUNT_FILE && env.GOOGLE_IMPERSONATE_USER) {
    const key = JSON.parse(fs.readFileSync(env.GOOGLE_SERVICE_ACCOUNT_FILE, 'utf8'));
    return new google.auth.JWT({ email: key.client_email, key: key.private_key, scopes, subject: env.GOOGLE_IMPERSONATE_USER });
  }
  const oauth = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
  oauth.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN });
  return oauth;
}
const calendar = google.calendar({ version: 'v3', auth: googleAuth() });

// ---------- Email ----------
const mailer = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT) || 465,
  secure: String(env.SMTP_SECURE ?? 'true') === 'true',
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

// ---------- helpers ----------
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const dmy = (iso) => iso.split('-').reverse().join('/');
const time12 = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
const addMinutes = (iso, hhmm, mins) => new Date(new Date(`${iso}T${hhmm}:00Z`).getTime() + mins * 60000).toISOString().slice(0, 19);
const todayIST = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

function validate(b) {
  const out = {
    deptKey: b.deptKey,
    treatment: clean(b.treatment, 120) || 'General consultation',
    name: clean(b.name, 80),
    phone: clean(b.phone, 20),
    email: clean(b.email, 120).toLowerCase(),
    date: clean(b.date, 10),
    time: clean(b.time, 5),
    message: String(b.message ?? '').trim().slice(0, 300),
  };
  if (!DOCTORS[out.deptKey]) return { error: 'Please choose heart or dental care.' };
  if (out.name.length < 2) return { error: 'Name is required.' };
  if (out.phone.replace(/\D/g, '').length < 10) return { error: 'A 10-digit phone number is required.' };
  if (out.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) return { error: 'Email address is not valid.' };

  out.hasSlot = Boolean(out.date && out.time);
  if (out.hasSlot) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(out.date) || Number.isNaN(Date.parse(out.date))) return { error: 'Date is not valid.' };
    if (out.date < todayIST()) return { error: 'Date must be today or later.' };
    if (new Date(`${out.date}T00:00:00Z`).getUTCDay() === 0) return { error: 'The clinic is closed on Sundays.' };
    if (!/^([01]\d|2[0-3]):(00|30)$/.test(out.time) || out.time < '09:00' || out.time > '20:00') return { error: 'Please choose a time between 9:00 AM and 8:00 PM.' };
  }
  return { data: out };
}

// ---------- calendar ----------
async function slotIsFree(doc, start, end) {
  const r = await calendar.freebusy.query({
    requestBody: { timeMin: `${start}${TZ_OFFSET}`, timeMax: `${end}${TZ_OFFSET}`, timeZone: TZ, items: [{ id: doc.calendarId }] },
  });
  return !(r.data.calendars?.[doc.calendarId]?.busy?.length);
}

async function createEvent(doc, b, start, end) {
  const attendees = [{ email: doc.email, displayName: doc.name }];
  if (b.email) attendees.push({ email: b.email, displayName: b.name });
  const r = await calendar.events.insert({
    calendarId: doc.calendarId,
    sendUpdates: 'all', // Google emails the invite to the doctor and the patient
    requestBody: {
      summary: `${b.treatment} – ${b.name}`,
      location: `${CLINIC.name}, ${CLINIC.address}`,
      description: [`Patient: ${b.name}`, `Phone: ${b.phone}`, b.email && `Email: ${b.email}`, `Service: ${b.treatment}`, b.message && `Note: ${b.message}`].filter(Boolean).join('\n'),
      start: { dateTime: start, timeZone: TZ },
      end: { dateTime: end, timeZone: TZ },
      attendees,
      reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 24 * 60 }, { method: 'popup', minutes: 60 }] },
    },
  });
  return r.data;
}

// ---------- emails ----------
function emailShell(title, rows, footer) {
  const tr = rows.filter(Boolean).map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#667;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;color:#0F2230"><strong>${esc(v)}</strong></td></tr>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#0F2230">
    <h2 style="margin:0 0 4px">${esc(title)}</h2><p style="margin:0 0 16px;color:#667">${esc(CLINIC.name)}</p>
    <table style="border-collapse:collapse;font-size:15px">${tr}</table>
    <p style="margin-top:20px;font-size:14px;color:#445">${esc(footer)}</p></div>`;
}

function buildEmails(doc, b) {
  const when = b.hasSlot ? `${dmy(b.date)}, ${time12(b.time)}` : 'To be confirmed by the clinic';
  const where = `${CLINIC.name}, ${CLINIC.address}`;
  const subjectTail = b.hasSlot ? `${dmy(b.date)} at ${time12(b.time)}` : 'request received';

  const patientRows = [['Doctor', doc.name], ['Service', b.treatment], ['Date & time', when], ['Place', where], CLINIC.phone && ['Phone', CLINIC.phone]];
  const patientIntro = b.hasSlot ? 'Your appointment is booked.' : 'We have received your request.';
  const patientFooter = b.hasSlot
    ? 'Please arrive 10 minutes early. To change or cancel, call the clinic.'
    : 'We will call you shortly to confirm a time.';

  const doctorRows = [['Patient', b.name], ['Phone', b.phone], b.email && ['Email', b.email], ['Service', b.treatment], ['Date & time', when], b.message && ['Note', b.message]];

  const patient = b.email && {
    from: env.MAIL_FROM || env.SMTP_USER, to: b.email,
    subject: `${b.hasSlot ? 'Appointment confirmed' : 'Appointment request'} – ${CLINIC.name} (${subjectTail})`,
    text: [`Hello ${b.name},`, patientIntro, ...patientRows.filter(Boolean).map(([k, v]) => `${k}: ${v}`), patientFooter].join('\n'),
    html: emailShell(patientIntro, patientRows, patientFooter),
  };
  const doctor = {
    from: env.MAIL_FROM || env.SMTP_USER, to: doc.email, replyTo: b.email || undefined,
    subject: `New appointment – ${b.name} (${subjectTail})`,
    text: ['New appointment', ...doctorRows.filter(Boolean).map(([k, v]) => `${k}: ${v}`)].join('\n'),
    html: emailShell('New appointment', doctorRows, b.hasSlot ? 'This has been added to your Google Calendar.' : 'No time was chosen: please call the patient to confirm.'),
  };
  return { patient, doctor };
}

// ---------- server ----------
const app = express();
app.set('trust proxy', 1);
// text/plain is accepted too, because the website sends it (no CORS preflight)
app.use(express.json({ limit: '20kb', type: ['application/json', 'text/plain'] }));
app.use(cors({ origin: (env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean) }));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/book', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }), async (req, res) => {
  const v = validate(req.body || {});
  if (v.error) return res.status(400).json({ ok: false, error: v.error });
  const b = v.data;
  const doc = DOCTORS[b.deptKey];
  if (!doc.email) { console.error(`No doctor email configured for ${b.deptKey}`); return res.status(500).json({ ok: false, error: 'Booking is not configured yet.' }); }

  // 1) Calendar (only when the patient picked a date and time)
  let eventId = null;
  if (b.hasSlot) {
    const start = `${b.date}T${b.time}:00`;
    const end = addMinutes(b.date, b.time, MINUTES);
    try {
      if (!(await slotIsFree(doc, start, end))) return res.status(409).json({ ok: false, error: 'That time is already taken. Please choose another slot.' });
      eventId = (await createEvent(doc, b, start, end)).id;
    } catch (err) {
      console.error('Google Calendar error:', err?.response?.data || err);
      return res.status(502).json({ ok: false, error: 'Could not reserve the slot right now. Please call the clinic.' });
    }
  }

  // 2) Confirmation emails to patient and doctor at the same time
  const { patient, doctor } = buildEmails(doc, b);
  const sent = await Promise.allSettled([patient && mailer.sendMail(patient), mailer.sendMail(doctor)].filter(Boolean));
  sent.forEach((r) => r.status === 'rejected' && console.error('Email error:', r.reason));
  const failed = sent.filter((r) => r.status === 'rejected').length;

  // The booking itself succeeded; email problems are reported but do not fail the request.
  res.json({ ok: true, eventId, emailsSent: sent.length - failed, emailsFailed: failed });
});

app.listen(Number(env.PORT) || 3000, () => console.log(`Booking server running on port ${env.PORT || 3000}`));