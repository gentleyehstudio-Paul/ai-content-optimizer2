const express = require('express');
const router = express.Router();
const { scrapeAndStore } = require('../scraper/scheduler');
const { importAll } = require('../scraper/import-portaly');

router.post('/import-portaly', async (req, res) => {
  try {
    res.json({ success: true, message: 'Import started — check server logs for progress' });
    importAll().catch(err => console.error('Portaly import error:', err));
  } catch (err) {
    console.error('Import API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { url, category } = req.body;
  if (!url || !category) {
    return res.status(400).json({ error: 'url and category are required' });
  }

  const validCategories = ['venue', 'facilitator', 'herbal', 'ingredient'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${validCategories.join(', ')}` });
  }

  try {
    const result = await scrapeAndStore(url, category);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Scrape API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
