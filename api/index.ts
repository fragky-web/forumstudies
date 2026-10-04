import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'online',
    app: 'Forum Computer Studies API',
    endpoints: ['/api/enroll', '/api/submit-project', '/api/enrollments'],
    timestamp: new Date().toISOString(),
  });
}
