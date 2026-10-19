'use strict';

const SITE_URL = process.env.SITE_URL || 'https://yousong-island.com';

const LEGACY_HOSTS = (process.env.LEGACY_HOSTS || 'yousong-island.onrender.com')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

const CANONICAL_HOST = new URL(SITE_URL).host.toLowerCase();

const SKIP_PATHS = new Set(['/healthz', '/health']);

function redirectLegacyHost(req, res, next) {
  if (String(process.env.LEGACY_REDIRECT_ENABLED || 'true').toLowerCase() === 'false') return next();
  if (SKIP_PATHS.has(req.path)) return next();

  const host = String(req.headers.host || '').toLowerCase().replace(/:\d+$/, '');

  if (!host || host === CANONICAL_HOST) return next();

  if (LEGACY_HOSTS.includes(host)) {
    res.set('Cache-Control', 'public, max-age=3600');
    return res.redirect(301, `${SITE_URL}${req.originalUrl}`);
  }
  return next();
}

module.exports = redirectLegacyHost;
