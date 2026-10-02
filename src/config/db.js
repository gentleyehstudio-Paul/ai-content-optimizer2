const isNeon = process.env.DATABASE_URL?.includes('neon.tech');

let pool;

if (isNeon) {
  const { Pool } = require('@neondatabase/serverless');
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  const { Pool } = require('pg');
  const isSSL = process.env.DATABASE_SSL === 'true';
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    ssl: isSSL ? { rejectUnauthorized: false } : false,
  });
}

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

module.exports = pool;
