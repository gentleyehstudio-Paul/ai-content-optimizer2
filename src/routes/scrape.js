const express = require('express');
const router = express.Router();
const { scrapeAndStore } = require('../scraper/scheduler');

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
