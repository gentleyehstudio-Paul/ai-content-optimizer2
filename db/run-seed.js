require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function run() {
  const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  await pool.query(sql);
  console.log('Seed data inserted successfully');
  await pool.end();
}

run().catch(err => { console.error(err); process.exit(1); });
