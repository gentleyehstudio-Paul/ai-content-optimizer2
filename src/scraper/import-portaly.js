require('dotenv').config();
const pool = require('../config/db');
const { scrapePortalyMap, PORTALY_CATEGORIES } = require('./portaly-map');

const MAP_URL = 'https://portaly.cc/TaiperBMSmap';

async function importAll() {
  console.log(`Scraping ${MAP_URL}...`);
  const result = await scrapePortalyMap(MAP_URL);

  if (!result.success) {
    console.error('Scrape failed:', result.error);
    process.exit(1);
  }

  console.log(`Found ${result.totalFound} listings`);

  let created = 0, updated = 0, skipped = 0;

  for (const item of result.listings) {
    if (!item.name || item.name.length < 2) {
      skipped++;
      continue;
    }

    const table = item.table;
    try {
      const { rows: existing } = await pool.query(
        `SELECT id FROM ${table} WHERE name = $1`, [item.name]
      );

      if (existing.length > 0) {
        const setClauses = [];
        const values = [];
        let idx = 1;

        if (item.region) { setClauses.push(`region = $${idx++}`); values.push(item.region); }
        if (item.priceInfo) { setClauses.push(`price_info = $${idx++}`); values.push(item.priceInfo); }
        if (item.bookingUrl) { setClauses.push(`booking_url = $${idx++}`); values.push(item.bookingUrl); }
        if (item.portalyCategory) { setClauses.push(`portaly_category = $${idx++}`); values.push(item.portalyCategory); }
        if (item.description) { setClauses.push(`description = COALESCE(NULLIF($${idx++}, ''), description)`); values.push(item.description); }
        setClauses.push(`updated_at = NOW()`);

        if (setClauses.length > 1) {
          values.push(existing[0].id);
          await pool.query(
            `UPDATE ${table} SET ${setClauses.join(', ')} WHERE id = $${idx}`,
            values
          );
        }
        updated++;
        console.log(`  Updated: ${item.name} (${table})`);
      } else {
        if (table === 'facilitators') {
          await pool.query(
            `INSERT INTO ${table} (name, bio, region, price_info, booking_url, portaly_category, tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [item.name, item.description, item.region, item.priceInfo, item.bookingUrl, item.portalyCategory,
             [PORTALY_CATEGORIES[item.portalyCategory]?.label || '其他'].filter(Boolean)]
          );
        } else if (table === 'venues') {
          await pool.query(
            `INSERT INTO ${table} (name, description, location, region, price_info, booking_url, portaly_category, tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [item.name, item.description, item.region, item.region, item.priceInfo, item.bookingUrl, item.portalyCategory,
             [PORTALY_CATEGORIES[item.portalyCategory]?.label || '其他'].filter(Boolean)]
          );
        } else {
          await pool.query(
            `INSERT INTO ${table} (name, description, price_info, booking_url, portaly_category, tags)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [item.name, item.description, item.priceInfo, item.bookingUrl, item.portalyCategory,
             [PORTALY_CATEGORIES[item.portalyCategory]?.label || '其他'].filter(Boolean)]
          );
        }
        created++;
        console.log(`  Created: ${item.name} (${table})`);
      }
    } catch (err) {
      console.error(`  Error processing ${item.name}:`, err.message);
      skipped++;
    }
  }

  console.log(`\nImport complete: ${created} created, ${updated} updated, ${skipped} skipped`);
}

if (require.main === module) {
  importAll()
    .then(() => process.exit(0))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { importAll };
