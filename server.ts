import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const RECIPIENT_EMAIL = process.env.ENROLLMENT_RECIPIENT_EMAIL || 'fragky@gmail.com';
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENROLLMENTS_FILE = path.join(DATA_DIR, 'enrollments.json');

interface EnrollmentRecord {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  track: string;
  notes?: string;
  recipientEmail: string;
  deliveryMethod: string;
}

function saveEnrollmentRecord(record: EnrollmentRecord) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: EnrollmentRecord[] = [];
    if (fs.existsSync(ENROLLMENTS_FILE)) {
      const raw = fs.readFileSync(ENROLLMENTS_FILE, 'utf-8');
      existing = JSON.parse(raw);
    }
    existing.unshift(record);
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist enrollment record:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/enroll', async (req, res) => {
    try {
      const { fullName, email, phone, track, notes } = req.body || {};

      if (!fullName || !email || !phone || !track) {
        res.status(400).json({
          ok: false,
          error: 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία (Ονοματεπώνυμο, Email, Τηλέφωνο, Πρόγραμμα).',
        });
        return;
      }

      const enrollmentId = `FCS-${Date.now().toString(36).toUpperCase()}`;
      const createdAt = new Date().toISOString();
      const subject = `[Forum Computer Studies] Νέα Αίτηση Εγγραφής (${enrollmentId}) — ${track}`;
      const textBody = [
        `Νέα Αίτηση Εγγραφής στο Forum Computer Studies`,
        `=================================================`,
        `Κωδικός Αίτησης: ${enrollmentId}`,
        `Ημερομηνία: ${new Date(createdAt).toLocaleString('el-GR')}`,
        `Πρόγραμμα / Μάθημα: ${track}`,
        `Ονοματεπώνυμο: ${fullName}`,
        `Email Επικοινωνίας: ${email}`,
        `Τηλέφωνο: ${phone}`,
        `Σημειώσεις / Τμήμα: ${notes || '—'}`,
        `=================================================`,
        `Παραλήπτης: ${RECIPIENT_EMAIL}`,
      ].join('\n');

      let deliveryMethod = 'recorded';

      // 1. If SMTP credentials are provided, send directly via Nodemailer
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"Forum Computer Studies" <${process.env.SMTP_USER}>`,
            to: RECIPIENT_EMAIL,
            replyTo: email,
            subject,
            text: textBody,
          });
          deliveryMethod = 'smtp';
        } catch (smtpError) {
          console.warn('SMTP send failed, falling back to FormSubmit relay:', smtpError);
        }
      }

      // 2. Relay via FormSubmit AJAX endpoint to fragky@gmail.com
      if (deliveryMethod !== 'smtp') {
        try {
          const appOrigin = process.env.APP_URL || 'https://forum-computer-studies.run.app';
          const relayResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin': appOrigin,
              'Referer': appOrigin,
            },
            body: JSON.stringify({
              _subject: subject,
              _replyto: email,
              _template: 'table',
              Κωδικός_Αίτησης: enrollmentId,
              Πρόγραμμα_Σπουδών: track,
              Ονοματεπώνυμο: fullName,
              Email: email,
              Τηλέφωνο: phone,
              Σημειώσεις: notes || '—',
            }),
          });

          if (relayResponse.ok) {
            deliveryMethod = 'formsubmit-relay';
          }
        } catch (relayErr) {
          console.warn('FormSubmit relay warning:', relayErr);
        }
      }

      const record: EnrollmentRecord = {
        id: enrollmentId,
        createdAt,
        fullName,
        email,
        phone,
        track,
        notes,
        recipientEmail: RECIPIENT_EMAIL,
        deliveryMethod,
      };

      saveEnrollmentRecord(record);

      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;

      res.json({
        ok: true,
        enrollmentId,
        recipientEmail: RECIPIENT_EMAIL,
        deliveryMethod,
        mailtoUrl,
      });
    } catch (err) {
      console.error('Error processing enrollment:', err);
      res.status(500).json({
        ok: false,
        error: 'Παρουσιάστηκε σφάλμα κατά την αποστολή της αίτησης.',
      });
    }
  });

  app.get('/api/enrollments', (_req, res) => {
    try {
      if (!fs.existsSync(ENROLLMENTS_FILE)) {
        res.json({ recipientEmail: RECIPIENT_EMAIL, enrollments: [] });
        return;
      }
      const raw = fs.readFileSync(ENROLLMENTS_FILE, 'utf-8');
      res.json({ recipientEmail: RECIPIENT_EMAIL, enrollments: JSON.parse(raw) });
    } catch {
      res.json({ recipientEmail: RECIPIENT_EMAIL, enrollments: [] });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (Enrollments -> ${RECIPIENT_EMAIL})`);
  });
}

startServer();
