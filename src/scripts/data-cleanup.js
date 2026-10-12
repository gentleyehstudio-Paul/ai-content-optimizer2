require('dotenv').config();
const pool = require('../config/db');

async function run() {
  console.log('=== 有鬆島 Data Cleanup ===\n');

  // 1. Backup all tables as JSON
  console.log('1. Backing up tables...');
  for (const table of ['venues', 'facilitators', 'herbals', 'ingredients']) {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table}`);
      console.log(`  ${table}: ${rows.length} rows`);
      const fs = require('fs');
      const dir = require('path').join(__dirname, '../../backups');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(`${dir}/${table}_backup.json`, JSON.stringify(rows, null, 2));
    } catch (err) {
      console.error(`  Error backing up ${table}:`, err.message);
    }
  }

  // 2. Add latitude/longitude columns to venues if missing
  console.log('\n2. Adding lat/lng columns to venues...');
  try {
    await pool.query(`ALTER TABLE venues ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`);
    await pool.query(`ALTER TABLE venues ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`);
    console.log('  Done.');
  } catch (err) {
    console.error('  Error:', err.message);
  }

  // 3. Delete demo data
  console.log('\n3. Deleting demo data...');
  const demoDeletes = [
    { table: 'venues', ids: [1, 2, 3] },
    { table: 'facilitators', ids: [1, 2, 3] },
    { table: 'herbals', ids: [1, 2] },
    { table: 'ingredients', ids: [1, 2, 3] },
  ];

  for (const { table, ids } of demoDeletes) {
    try {
      const { rowCount } = await pool.query(
        `DELETE FROM ${table} WHERE id = ANY($1)`,
        [ids]
      );
      console.log(`  ${table}: deleted ${rowCount} rows (ids: ${ids.join(', ')})`);
    } catch (err) {
      console.error(`  Error deleting from ${table}:`, err.message);
    }
  }

  // 4. Add 2 new venues
  console.log('\n4. Adding new venues...');
  const newVenues = [
    {
      name: '禪香不二 北投茶香空間',
      description: '坐落北投溫泉路巷弄，結合日式老屋與現代茶道的靜心空間。提供茶席體驗、冥想引導與小型工作坊場地租借，最多容納 12 人。',
      location: '台北市北投區',
      address: '台北市北投區溫泉路 71 巷 22 號',
      region: '台北市北投區',
      capacity: 12,
      has_wifi: true,
      has_parking: false,
      near_mrt: true,
      tags: ['茶道', '冥想', '日式空間'],
      latitude: 25.1367,
      longitude: 121.5087,
    },
    {
      name: '山所．沐光',
      description: '苗栗山區的自然療癒場域，由老三合院改建。四周環山、溪水相伴，適合瑜伽、聲療與深度靜修。提供住宿與在地食材餐飲，最多 20 人。',
      location: '苗栗縣南庄鄉',
      address: '苗栗縣南庄鄉蓬萊村 8 鄰 42 號',
      region: '苗栗縣南庄鄉',
      capacity: 20,
      has_wooden_floor: true,
      has_audio_equipment: true,
      has_kitchen: true,
      has_parking: true,
      tags: ['瑜伽', '靜修', '自然場域', '住宿'],
      latitude: 24.5876,
      longitude: 120.9821,
    },
  ];

  for (const venue of newVenues) {
    try {
      const fields = Object.keys(venue);
      const values = fields.map(k => venue[k]);
      const placeholders = fields.map((_, i) => `$${i + 1}`);
      const { rows } = await pool.query(
        `INSERT INTO venues (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id, name`,
        values
      );
      console.log(`  Added: ${rows[0].name} (id: ${rows[0].id})`);
    } catch (err) {
      console.error(`  Error adding venue:`, err.message);
    }
  }

  // 5. Normalize region to 縣市＋區 format
  console.log('\n5. Checking region normalization...');
  for (const table of ['venues', 'facilitators']) {
    try {
      const { rows } = await pool.query(`SELECT id, name, region FROM ${table} WHERE region IS NOT NULL`);
      console.log(`  ${table}: ${rows.length} items with region`);
      rows.forEach(r => console.log(`    id=${r.id}: ${r.name} → ${r.region}`));
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }

  console.log('\n=== Cleanup complete ===');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
