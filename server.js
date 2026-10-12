require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const { renderCategoryPage, CATEGORIES } = require('./src/templates/category');
const { renderDetailPage } = require('./src/templates/detail');
const { renderPage, headerHTML, footerHTML, SITE_URL } = require('./src/templates/layout');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const urls = [{ loc: '/', priority: '1.0', changefreq: 'weekly' }];

    for (const type of Object.keys(CATEGORIES)) {
      urls.push({ loc: `/category/${type}`, priority: '0.8', changefreq: 'weekly' });

      const table = type;
      const { rows } = await pool.query(`SELECT id FROM ${table} ORDER BY id`);
      rows.forEach(row => {
        urls.push({ loc: `/detail/${type}/${row.id}`, priority: '0.6', changefreq: 'monthly' });
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    console.error('Sitemap error:', err.message);
    res.status(500).type('text/plain').send('Error generating sitemap');
  }
});

app.get('/category/:type', async (req, res) => {
  const type = req.params.type;
  if (!CATEGORIES[type]) {
    return res.status(404).send(render404Page());
  }

  try {
    const { rows } = await pool.query(
      `SELECT * FROM ${type} ORDER BY featured DESC, created_at DESC`
    );
    const html = renderCategoryPage(type, rows);
    res.send(html);
  } catch (err) {
    console.error(`Category ${type} error:`, err.message);
    const html = renderCategoryPage(type, []);
    res.send(html);
  }
});

app.get('/detail/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  if (!CATEGORIES[type]) {
    return res.status(404).send(render404Page());
  }

  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    return res.status(404).send(render404Page());
  }

  try {
    const { rows } = await pool.query(`SELECT * FROM ${type} WHERE id = $1`, [numId]);
    if (rows.length === 0) {
      return res.status(404).send(render404Page());
    }
    const html = renderDetailPage(type, rows[0]);
    res.send(html);
  } catch (err) {
    console.error(`Detail ${type}/${id} error:`, err.message);
    res.status(500).send(render404Page('載入失敗，請重試'));
  }
});

function render404Page(message) {
  const body = `
  ${headerHTML({ solid: true })}
  <div style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:80px 20px;text-align:center">
    <div>
      <h1 style="font-size:clamp(48px,8vw,96px);font-weight:300;color:var(--muted);letter-spacing:.1em">404</h1>
      <p style="margin-top:16px;font-size:15px;color:var(--text);letter-spacing:.06em">${message || '找不到此頁面'}</p>
      <a href="/" style="display:inline-block;margin-top:32px;font-size:13px;letter-spacing:.14em;color:var(--brown)">← 回首頁</a>
    </div>
  </div>
  ${footerHTML()}`;

  return renderPage({ title: '頁面不存在', description: '找不到此頁面', body, path: '/404' });
}

app.use((req, res) => {
  res.status(404).send(render404Page());
});

app.listen(PORT, () => {
  console.log(`有鬆島 server running on http://localhost:${PORT}`);
});
