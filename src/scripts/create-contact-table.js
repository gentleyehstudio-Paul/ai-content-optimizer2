require('dotenv').config();
const pool = require('../config/db');

async function createContactTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        type VARCHAR(50),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('contact_submissions table created successfully');
  } catch (err) {
    console.error('Error creating table:', err.message);
  } finally {
    await pool.end();
  }
}

createContactTable();
