require('dotenv').config();
const pool = require('../config/db');
const { scrapePortaly } = require('./portaly');

const CATEGORY_TABLE = {
  venue: 'venues',
  facilitator: 'facilitators',
  herbal: 'herbals',
  ingredient: 'ingredients',
};

async function scrapeAndStore(portalyUrl, category) {
  const table = CATEGORY_TABLE[category];
  if (!table) throw new Error(`Unknown category: ${category}`);

  const result = await scrapePortaly(portalyUrl);
  if (!result.success) throw new Error(`Scrape failed: ${result.error}`);

  const { rows: existing } = await pool.query(
    `SELECT id FROM ${table} WHERE portaly_url = $1`, [portalyUrl]
  );

  if (existing.length > 0) {
    await pool.query(
      `UPDATE ${table} SET name = COALESCE(NULLIF($1, ''), name), description = COALESCE(NULLIF($2, ''), description), website = COALESCE(NULLIF($3, ''), website), image_url = COALESCE(NULLIF($4, ''), image_url), updated_at = NOW() WHERE portaly_url = $5 RETURNING *`,
      [result.profileName, result.profileBio, result.links[0]?.url || '', result.profileImage, portalyUrl]
    );
    console.log(`Updated ${table} entry for ${portalyUrl}`);
  } else {
    await pool.query(
      `INSERT INTO ${table} (name, description, website, portaly_url, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [result.profileName, result.profileBio, result.links[0]?.url || '', portalyUrl, result.profileImage]
    );
    console.log(`Created ${table} entry for ${portalyUrl}`);
  }

  return result;
}

if (require.main === module) {
  const [,, url, category] = process.argv;
  if (!url || !category) {
    console.error('Usage: node scheduler.js <portaly-url> <category>');
    process.exit(1);
  }
  scrapeAndStore(url, category)
    .then(() => process.exit(0))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { scrapeAndStore };
