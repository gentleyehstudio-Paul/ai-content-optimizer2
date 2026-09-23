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

module.exports = router;
