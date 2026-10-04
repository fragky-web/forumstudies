import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const RECIPIENT_EMAIL = process.env.ENROLLMENT_RECIPIENT_EMAIL || 'fragky@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

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

    // Persist to temporary storage if possible
    try {
      const dataDir = path.join('/tmp', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const file = path.join(dataDir, 'enrollments.json');
      let existing = [];
      if (fs.existsSync(file)) {
        existing = JSON.parse(fs.readFileSync(file, 'utf-8'));
      }
      existing.unshift({
        id: enrollmentId,
        createdAt,
        fullName,
        email,
        phone,
        track,
        notes,
        recipientEmail: RECIPIENT_EMAIL,
        deliveryMethod,
      });
      fs.writeFileSync(file, JSON.stringify(existing, null, 2), 'utf-8');
    } catch {
      // Ignore filesystem errors in serverless
    }

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;

    res.status(200).json({
      ok: true,
      enrollmentId,
      recipientEmail: RECIPIENT_EMAIL,
      deliveryMethod,
      mailtoUrl,
    });
  } catch (err) {
    console.error('Error processing enrollment on Vercel:', err);
    res.status(500).json({
      ok: false,
      error: 'Παρουσιάστηκε σφάλμα κατά την αποστολή της αίτησης.',
    });
  }
}
