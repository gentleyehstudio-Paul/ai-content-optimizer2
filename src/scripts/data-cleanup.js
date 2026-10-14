require('dotenv').config();
const pool = require('../config/db');

async function run() {
  console.log('=== 有鬆島 Data Cleanup ===\n');

  // 1. Backup all tables as JSON
  console.log('1. Backing up tables...');
  const fs = require('fs');
  const path = require('path');
  const dir = path.join(__dirname, '../../backups');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const table of ['venues', 'facilitators', 'herbals', 'ingredients']) {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table}`);
      console.log(`  ${table}: ${rows.length} rows`);
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

  // 4. Add 2 new venues (only known fields, no fabricated content)
  console.log('\n4. Adding new venues...');
  const newVenues = [
    {
      name: '禪香不二 北投茶香空間',
      region: '台北市北投區',
      address: '112臺北市北投區溫泉里光明路240號2樓之8',
      contact: '0911 675 120',
      website: 'https://inzense.com.tw',
      description: '位在北投溫泉區的品香與品茶空間，可體驗品茶、品香與手作香錐。',
      tags: ['茶空間', '品香', '製香體驗', '昏靜'],
      latitude: 25.1360922,
      longitude: 121.5073616,
    },
    {
      name: '山所．沐光',
      region: '新北市永和區',
      address: '234新北市永和區保順里仁愛路248-1號',
      description: '永和的小班制瑜伽教室，鄰近公園綠意，課程包含椅子瑜伽等輔助練習。',
      tags: ['瑜伽', '小班制', '晨動', '昏靜'],
      latitude: 25.0090234,
      longitude: 121.5045157,
    },
  ];

  for (const venue of newVenues) {
    try {
      const fields = Object.keys(venue);
      const values = fields.map(k => {
        const v = venue[k];
        return Array.isArray(v) ? `{${v.join(',')}}` : v;
      });
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

  // 5. Normalize region — check and report; update only where address provides clear info
  console.log('\n5. Checking region normalization...');
  for (const table of ['venues', 'facilitators']) {
    try {
      const hasAddress = table === 'venues';
      const cols = hasAddress ? 'id, name, region, address' : 'id, name, region';
      const { rows } = await pool.query(`SELECT ${cols} FROM ${table} WHERE region IS NOT NULL`);
      console.log(`  ${table}: ${rows.length} items with region`);
      rows.forEach(r => {
        const regionOk = /^.{2,3}[市縣].+[區鄉鎮市]$/.test(r.region || '');
        const addr = hasAddress ? ` | address="${r.address || '(無)'}"` : '';
        console.log(`    id=${r.id}: ${r.name} → region="${r.region}" ${regionOk ? '✓' : '⚠ 需確認'}${addr}`);
      });
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }

  // 6. Report final counts
  console.log('\n6. Final counts:');
  for (const table of ['venues', 'facilitators', 'herbals', 'ingredients']) {
    try {
      const { rows } = await pool.query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`  ${table}: ${rows[0].count} rows`);
    } catch (err) {
      console.error(`  ${table}: error - ${err.message}`);
    }
  }

  console.log('\nDeleted IDs:');
  console.log('  venues: 1, 2, 3');
  console.log('  facilitators: 1, 2, 3');
  console.log('  herbals: 1, 2');
  console.log('  ingredients: 1, 2, 3');

  console.log('\n=== Cleanup complete ===');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
