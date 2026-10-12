const SITE_NAME = '有鬆島 Yousong Island';
const SITE_URL = process.env.SITE_URL || 'https://yousong-island.onrender.com';

const FONTS_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">`;

const SLUG_MAP = {
  places: 'venues',
  teachers: 'facilitators',
  herbs: 'herbals',
  food: 'ingredients',
};

const TABLE_TO_SLUG = {
  venues: 'places',
  facilitators: 'teachers',
  herbals: 'herbs',
  ingredients: 'food',
};

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function breadcrumbHTML(crumbs) {
  if (!crumbs || crumbs.length === 0) return '';
  const items = [{ label: '首頁', href: '/' }, ...crumbs];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE_URL}${c.href}` : undefined,
    })),
  };
  return `<nav class="ys-breadcrumb" aria-label="breadcrumb">
    <ol>
      ${items.map((c, i) => {
        if (i === items.length - 1) {
          return `<li aria-current="page">${esc(c.label)}</li>`;
        }
        return `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`;
      }).join('')}
    </ol>
  </nav>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function renderPage({ title, description, path, ogImage, canonicalPath, body, noindex }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — 連結台灣療癒生態`;
  const desc = description || '有鬆島串連台灣場地、師資、草本與食材，打造島嶼療癒生態網絡。';
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : `${SITE_URL}${path || '/'}`;
  const og = ogImage || `${SITE_URL}/assets/images/hero-island.jpg`;

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${esc(canonical)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(og)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE_NAME)}">
  <meta property="og:locale" content="zh_TW">
  ${FONTS_LINK}
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
${body}
</body>
</html>`;
}

function headerHTML({ solid } = {}) {
  const bg = solid ? 'style="background:var(--dark)"' : 'style="position:relative;z-index:1"';
  return `<header class="ys-header" ${bg}>
    <a href="/" class="ys-logo">
      <span class="ys-logo-zh">有鬆島</span>
      <span class="ys-logo-en">YOUSONG</span>
    </a>
    <nav class="ys-nav">
      <a href="/places">場地</a>
      <a href="/teachers">師資</a>
      <a href="/herbs">草本</a>
      <a href="/about">關於</a>
    </nav>
  </header>`;
}

function footerHTML() {
  return `<footer class="ys-footer">
    <div class="ys-footer-inner">
      <div class="ys-footer-brand">
        <span style="font-size:15px;letter-spacing:.34em;color:var(--dark)">有鬆島</span>
        <span style="font-family:var(--font-sans);font-size:9px;letter-spacing:.4em;color:var(--muted)">YOUSONG ISLAND</span>
      </div>
      <nav class="ys-footer-nav">
        <a href="/places">場地</a>
        <a href="/teachers">師資</a>
        <a href="/herbs">草本</a>
        <a href="/about">關於我們</a>
        <a href="/partners">合作夥伴</a>
        <a href="/privacy">隱私政策</a>
      </nav>
      <span class="ys-footer-copy">© 2026 有鬆島 · TAIWAN</span>
    </div>
  </footer>`;
}

module.exports = { renderPage, headerHTML, footerHTML, breadcrumbHTML, esc, SITE_URL, SITE_NAME, SLUG_MAP, TABLE_TO_SLUG };
