require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const { renderCategoryPage, CATEGORIES } = require('./src/templates/category');
const { renderDetailPage } = require('./src/templates/detail');
const { renderPage, headerHTML, footerHTML, SITE_URL, SLUG_MAP, TABLE_TO_SLUG } = require('./src/templates/layout');
const { aboutPage, partnersPage, privacyPage } = require('./src/templates/pages');
const { renderArticlePage, renderJournalListPage } = require('./src/templates/journal');
const { getArticleBySlug, getAllArticles } = require('./src/data/journal-articles');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// --- Debug: check if image files exist on deploy ---
app.get('/api/debug/images', (req, res) => {
  const fs = require('fs');
  const imgDir = path.join(__dirname, 'public', 'assets', 'images', 'journal');
  const publicDir = path.join(__dirname, 'public');
  const result = {
    cwd: process.cwd(),
    __dirname,
    publicDirExists: fs.existsSync(publicDir),
    imgDirExists: fs.existsSync(imgDir),
    files: [],
  };
  if (result.imgDirExists) {
    result.files = fs.readdirSync(imgDir).map(f => {
      const stat = fs.statSync(path.join(imgDir, f));
      return { name: f, size: stat.size, isFile: stat.isFile() };
    });
  }
  try {
    result.allPublicImages = [];
    const walkDir = path.join(__dirname, 'public', 'assets', 'images');
    if (fs.existsSync(walkDir)) {
      const dirs = fs.readdirSync(walkDir, { withFileTypes: true });
      dirs.forEach(d => {
        if (d.isDirectory()) {
          const sub = fs.readdirSync(path.join(walkDir, d.name));
          sub.forEach(f => result.allPublicImages.push(`${d.name}/${f}`));
        } else {
          result.allPublicImages.push(d.name);
        }
      });
    }
  } catch (e) { result.walkError = e.message; }
  res.json(result);
});

// --- robots.txt & sitemap ---

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const urls = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/about', priority: '0.5', changefreq: 'monthly' },
      { loc: '/partners', priority: '0.5', changefreq: 'monthly' },
      { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
    ];

    // Journal pages
    urls.push({ loc: '/journal', priority: '0.7', changefreq: 'weekly' });
    const journalArticles = getAllArticles().filter(a => a.published);
    journalArticles.forEach(a => {
      urls.push({ loc: a.url, priority: '0.6', changefreq: 'monthly' });
    });

    for (const [table, slug] of Object.entries(TABLE_TO_SLUG)) {
      urls.push({ loc: `/${slug}`, priority: '0.8', changefreq: 'weekly' });
      const { rows } = await pool.query(`SELECT id FROM ${table} ORDER BY id`);
      rows.forEach(row => {
        urls.push({ loc: `/${slug}/${row.id}`, priority: '0.6', changefreq: 'monthly' });
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

// --- 301 redirects from old URLs ---

app.get('/category/:type', (req, res) => {
  const type = req.params.type;
  const slug = TABLE_TO_SLUG[type];
  if (slug) return res.redirect(301, `/${slug}`);
  res.status(404).send(render404Page());
});

app.get('/detail/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const slug = TABLE_TO_SLUG[type];
  if (slug) return res.redirect(301, `/${slug}/${id}`);
  res.status(404).send(render404Page());
});

// --- Static pages (before slug catch-all) ---

app.get('/about', (req, res) => { res.send(aboutPage()); });
app.get('/partners', (req, res) => { res.send(partnersPage()); });
app.get('/privacy', (req, res) => { res.send(privacyPage()); });

// --- Journal (有鬆誌) ---

app.get('/journal', (req, res) => {
  const articles = getAllArticles();
  res.send(renderJournalListPage(articles));
});

app.get('/journal/:slug', (req, res) => {
  const article = getArticleBySlug(req.params.slug);
  if (!article) return res.status(404).send(render404Page());
  const html = renderArticlePage(article);
  if (!html) return res.status(404).send(render404Page());
  res.send(html);
});

// --- New slug-based category routes ---

app.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const table = SLUG_MAP[slug];
  if (!table) return next();

  try {
    const { rows } = await pool.query(
      `SELECT * FROM ${table} ORDER BY featured DESC, created_at DESC`
    );
    const html = renderCategoryPage(table, rows);
    res.send(html);
  } catch (err) {
    console.error(`Category ${slug} error:`, err.message);
    const html = renderCategoryPage(table, []);
    res.send(html);
  }
});

// --- New slug-based detail routes ---

app.get('/:slug/:id', async (req, res, next) => {
  const { slug, id } = req.params;
  const table = SLUG_MAP[slug];
  if (!table) return next();

  const numId = parseInt(id, 10);
  if (isNaN(numId)) return res.status(404).send(render404Page());

  try {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [numId]);
    if (rows.length === 0) return res.status(404).send(render404Page());

    let relatedItems = [];
    try {
      const { rows: related } = await pool.query(
        `SELECT * FROM ${table} WHERE id != $1 ORDER BY RANDOM() LIMIT 3`,
        [numId]
      );
      relatedItems = related;
    } catch (_) {}

    const html = renderDetailPage(table, rows[0], relatedItems);
    res.send(html);
  } catch (err) {
    console.error(`Detail ${slug}/${id} error:`, err.message);
    res.status(500).send(render404Page('載入失敗，請重試'));
  }
});

// --- 404 ---

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
