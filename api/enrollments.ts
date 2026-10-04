import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const RECIPIENT_EMAIL = process.env.ENROLLMENT_RECIPIENT_EMAIL || 'fragky@gmail.com';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const file = path.join('/tmp', 'data', 'enrollments.json');
    if (!fs.existsSync(file)) {
      res.status(200).json({ recipientEmail: RECIPIENT_EMAIL, enrollments: [] });
      return;
    }
    const raw = fs.readFileSync(file, 'utf-8');
    res.status(200).json({ recipientEmail: RECIPIENT_EMAIL, enrollments: JSON.parse(raw) });
  } catch {
    res.status(200).json({ recipientEmail: RECIPIENT_EMAIL, enrollments: [] });
  }
}
