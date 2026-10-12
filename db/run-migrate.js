require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function run() {
  const files = fs.readdirSync(path.join(__dirname))
    .filter(f => f.startsWith('migrate-') && f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    console.log(`Running ${file}...`);
    const sql = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const stmts = sql.split(';').filter(s => s.trim());
    for (const stmt of stmts) {
      await pool.query(stmt);
    }
    console.log(`  Done.`);
  }

  console.log('All migrations complete.');
  await pool.end();
}

run().catch(err => { console.error(err); process.exit(1); });
