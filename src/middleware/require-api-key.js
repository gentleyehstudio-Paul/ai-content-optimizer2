'use strict';

function requireApiKey(req, res, next) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return res.status(503).json({ error: 'API key not configured on server' });
  }

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header (Bearer <key>)' });
  }

  const token = auth.slice(7);
  if (token.length !== key.length || !require('crypto').timingSafeEqual(Buffer.from(token), Buffer.from(key))) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
}

module.exports = requireApiKey;
