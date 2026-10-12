const express = require('express');
const router = express.Router();

const venues = require('./venues');
const facilitators = require('./facilitators');
const herbals = require('./herbals');
const ingredients = require('./ingredients');
const scrape = require('./scrape');

router.use('/venues', venues);
router.use('/facilitators', facilitators);
router.use('/herbals', herbals);
router.use('/ingredients', ingredients);
router.use('/scrape', scrape);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'yousong-island' });
});

const pool = require('../config/db');

router.post('/contact', async (req, res) => {
  const { name, email, type, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: '請填寫必填欄位' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email 格式不正確' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: '訊息過長' });
  }
  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, type, message) VALUES ($1, $2, $3, $4)',
      [name.slice(0, 200), email.slice(0, 200), (type || '').slice(0, 50), message.slice(0, 5000)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err.message);
    res.json({ ok: true });
  }
});

module.exports = router;
