import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const RECIPIENT_EMAIL = process.env.ENROLLMENT_RECIPIENT_EMAIL || 'fragky@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { studentName, email, track, projectTitle, description, codeLink } = req.body || {};

    if (!studentName || !email || !projectTitle) {
      res.status(400).json({
        ok: false,
        error: 'Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία (Ονοματεπώνυμο, Email, Τίτλος Εργασίας).',
      });
      return;
    }

    const submissionId = `PRJ-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    const subject = `[Forum Computer Studies] Υποβολή Εργασίας Μαθητή (${submissionId}) — ${projectTitle}`;
    const textBody = [
      `Νέα Υποβολή Εργασίας Μαθητή στο Forum Computer Studies`,
      `======================================================`,
      `Κωδικός Εργασίας: ${submissionId}`,
      `Ημερομηνία: ${new Date(createdAt).toLocaleString('el-GR')}`,
      `Τμήμα / Μάθημα: ${track || 'ΑΕΠΠ / ECDL'}`,
      `Ονοματεπώνυμο Μαθητή: ${studentName}`,
      `Email: ${email}`,
      `Τίτλος Εργασίας: ${projectTitle}`,
      `Περιγραφή / Σχόλια: ${description || '—'}`,
      `Σύνδεσμος Κώδικα / Αρχείου: ${codeLink || '—'}`,
      `======================================================`,
      `Παραλήπτης: ${RECIPIENT_EMAIL}`,
    ].join('\n');

    let deliveryMethod = 'recorded';

    // Relay via FormSubmit AJAX endpoint to fragky@gmail.com
    try {
      const appOrigin = process.env.APP_URL || 'https://forum-computer-studies.run.app';
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
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
          Κωδικός_Εργασίας: submissionId,
          Μαθητής: studentName,
          Email: email,
          Τμήμα: track,
          Τίτλος_Εργασίας: projectTitle,
          Περιγραφή: description,
          Σύνδεσμος: codeLink,
        }),
      });
      deliveryMethod = 'formsubmit-relay';
    } catch (err) {
      console.warn('Project submission email relay notice:', err);
    }

    // Persist to temporary directory if possible
    try {
      const dataDir = path.join('/tmp', 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const projectsFile = path.join(dataDir, 'project_submissions.json');
      let currentSubmissions = [];
      if (fs.existsSync(projectsFile)) {
        currentSubmissions = JSON.parse(fs.readFileSync(projectsFile, 'utf-8'));
      }
      currentSubmissions.unshift({
        id: submissionId,
        createdAt,
        studentName,
        email,
        track,
        projectTitle,
        description,
        codeLink,
        recipientEmail: RECIPIENT_EMAIL,
      });
      fs.writeFileSync(projectsFile, JSON.stringify(currentSubmissions, null, 2), 'utf-8');
    } catch {
      // Ignore filesystem errors in serverless
    }

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;

    res.status(200).json({
      ok: true,
      submissionId,
      recipientEmail: RECIPIENT_EMAIL,
      deliveryMethod,
      mailtoUrl,
    });
  } catch (err) {
    console.error('Error submitting project on Vercel:', err);
    res.status(500).json({
      ok: false,
      error: 'Παρουσιάστηκε σφάλμα κατά την υποβολή της εργασίας.',
    });
  }
}
