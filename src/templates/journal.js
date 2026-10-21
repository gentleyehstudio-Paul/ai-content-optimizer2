const { renderPage, headerHTML, footerHTML, breadcrumbHTML, esc, SITE_URL } = require('./layout');

function renderArticlePage(article) {
  if (!article) return null;

  const authorLine = [
    article.author ? `文／${esc(article.author)}` : '',
    article.partnerHotel ? `合作旅宿 ${esc(article.partnerHotel)}` : '',
    article.readingTime ? `閱讀${esc(article.readingTime)}` : '',
  ].filter(Boolean).join(' ・ ');

  const sectionsHTML = article.sections.map(s => {
    switch (s.type) {
      case 'lead':
        return `<p class="ys-journal-lead">${esc(s.content)}</p>`;
      case 'paragraph':
        return `<p class="ys-journal-p">${esc(s.content)}</p>`;
      case 'heading':
        return `<h2 class="ys-journal-h2">${esc(s.content)}</h2>`;
      case 'image':
        if (!s.src) {
          return `<figure class="ys-journal-figure ys-journal-figure--placeholder">
            <div class="ys-journal-img-placeholder">${esc(s.caption || s.alt)}</div>
            ${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ''}
          </figure>`;
        }
        return `<figure class="ys-journal-figure">
          <img src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy" width="680" height="450">
          ${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ''}
        </figure>`;
      case 'closing':
        return `<p class="ys-journal-closing">${esc(s.content)}</p>`;
      default:
        return '';
    }
  }).join('\n');

  const routeCardHTML = article.routeCard ? renderRouteCard(article.routeCard) : '';
  const rhythmHTML = article.rhythmSchedule ? renderRhythmSchedule(article.rhythmSchedule) : '';
  const relatedHTML = renderRelatedStories(article.relatedStories);
  const ctaHTML = renderCTA();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription,
    url: `${SITE_URL}${article.url}`,
    publisher: {
      '@type': 'Organization',
      name: '有鬆島 Yousong Island',
      url: SITE_URL,
    },
  };
  if (article.author) jsonLd.author = { '@type': 'Person', name: article.author };
  if (article.coverImage) jsonLd.image = article.coverImage.startsWith('/') ? `${SITE_URL}${article.coverImage}` : article.coverImage;

  const body = `
  ${headerHTML({ solid: true })}

  <div class="ys-journal-hero">
    <div class="ys-journal-hero-overlay"></div>
    ${article.coverImage
      ? `<img class="ys-journal-hero-img" src="${esc(article.coverImage)}" alt="${esc(article.coverImageAlt)}" width="1600" height="600">`
      : `<div class="ys-journal-hero-img ys-journal-hero-img--placeholder"></div>`}
    <div class="ys-container" style="position:relative;z-index:1">
      <span class="ys-section-label" style="color:rgba(244,241,234,.55)">有鬆誌</span>
      <span class="ys-journal-category">${esc(article.categoryLabel)}</span>
      <h1 class="ys-journal-title">${esc(article.title)}</h1>
      ${authorLine ? `<p class="ys-journal-meta">${authorLine}</p>` : ''}
    </div>
  </div>

  <div class="ys-container">
    ${breadcrumbHTML([
      { label: '有鬆誌', href: '/journal' },
      { label: article.title },
    ])}

    <div class="ys-journal-layout">
      <article class="ys-journal-content">
        ${sectionsHTML}

        <div class="ys-journal-divider"></div>

        ${ctaHTML}
      </article>

      <aside class="ys-journal-sidebar">
        ${routeCardHTML}
        ${rhythmHTML}
        ${relatedHTML}
      </aside>
    </div>
  </div>

  ${footerHTML()}
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

  return renderPage({
    title: article.seoTitle || article.title,
    description: article.seoDescription,
    path: article.url,
    noindex: !article.published,
    body,
  });
}

function renderRouteCard(route) {
  const rows = [
    ['距離', route.distance],
    ['爬升', route.elevation],
    ['路面', route.surface],
    ['車流', route.traffic],
    ['補給點', route.supply],
    ['探勘日期', route.surveyDate],
    ['引導員', route.guide],
  ];

  return `<div class="ys-journal-card">
    <div class="ys-journal-card-header">
      <h3>這條路線</h3>
      <span class="ys-journal-card-badge">${esc(route.status)}</span>
    </div>
    <table class="ys-journal-card-table">
      ${rows.map(([label, value]) =>
        `<tr><td>${esc(label)}</td><td>${value ? esc(value) : '<span class="ys-journal-pending">—</span>'}</td></tr>`
      ).join('\n')}
    </table>
    <p class="ys-journal-card-note">欄位值為「待探勘」時照樣顯示，不可自行填數字。</p>
  </div>`;
}

function renderRhythmSchedule(schedule) {
  return `<div class="ys-journal-card">
    <h3 class="ys-journal-card-header">這一天的節律</h3>
    <div class="ys-journal-rhythm">
      ${schedule.map(s => {
        const cls = s.highlight ? ' ys-journal-rhythm-item--active' : '';
        const content = s.content || '<span class="ys-journal-pending">待規劃</span>';
        return `<div class="ys-journal-rhythm-item${cls}">
          <span class="ys-journal-rhythm-period">${esc(s.period)}</span>
          <span class="ys-journal-rhythm-content">${s.content ? esc(s.content) : content}</span>
        </div>`;
      }).join('\n')}
    </div>
  </div>`;
}

function renderRelatedStories(stories) {
  if (!stories || stories.length === 0) return '';

  return `<div class="ys-journal-card">
    <h3 class="ys-journal-card-header">繼續閱讀</h3>
    <ul class="ys-journal-related">
      ${stories.map(s => {
        if (s.status === 'upcoming') {
          return `<li class="ys-journal-related-item ys-journal-related-item--upcoming">
            <span>${esc(s.title)}</span>
            <span class="ys-journal-upcoming-badge">即將推出</span>
          </li>`;
        }
        return `<li class="ys-journal-related-item">
          <a href="/journal/${esc(s.slug)}">${esc(s.title)}</a>
        </li>`;
      }).join('\n')}
    </ul>
  </div>`;
}

function renderCTA() {
  return `<div class="ys-journal-cta">
    <span class="ys-section-label">FOR HOTELS</span>
    <h2 class="ys-journal-cta-title">想讓你的旅客，也有這樣的早晨？</h2>
    <p class="ys-journal-cta-desc">從一條已探勘的晨跑路線開始，我們陪你把空間排成有鬆一日。</p>
    <a href="/partners" class="ys-btn ys-btn--solid">了解旅宿合作 →</a>
  </div>`;
}

function renderJournalListPage(articles) {
  const featuredArticles = articles.filter(a => a.featured);
  const allArticles = articles;

  const articleCards = allArticles.map((article, i) => {
    const excerpt = article.sections.find(s => s.type === 'lead' || s.type === 'paragraph');
    const excerptText = excerpt ? excerpt.content.slice(0, 100) + (excerpt.content.length > 100 ? '⋯' : '') : '';

    return `<a class="ys-journal-list-card ys-in" href="${esc(article.url)}" style="animation-delay:${i * 0.08}s">
      <div class="ys-journal-list-card-image">
        ${article.coverImage
          ? `<img src="${esc(article.coverImage)}" alt="${esc(article.coverImageAlt)}" loading="lazy" width="400" height="260">`
          : `<div class="ys-journal-list-card-placeholder"></div>`}
        <span class="ys-journal-list-card-badge">${esc(article.categoryLabel)}</span>
      </div>
      <div class="ys-journal-list-card-body">
        <h2 class="ys-journal-list-card-title">${esc(article.title)}</h2>
        <p class="ys-journal-list-card-excerpt">${esc(excerptText)}</p>
        <span class="ys-journal-list-card-meta">${esc(article.readingTime)}</span>
      </div>
    </a>`;
  }).join('\n');

  const body = `
  ${headerHTML({ solid: true })}

  <div class="ys-page-header" style="padding:120px 0 60px;background:var(--dark)">
    <div class="ys-container" style="position:relative;z-index:1">
      <span class="ys-section-label" style="color:rgba(244,241,234,.55)">JOURNAL</span>
      <h1 style="margin-top:16px;color:var(--bg)">有鬆誌</h1>
      <p style="margin-top:8px;color:rgba(244,241,234,.65);font-size:14px;letter-spacing:.08em">身心靈旅行的真實體驗與在地發現</p>
    </div>
  </div>

  <div class="ys-container">
    ${breadcrumbHTML([{ label: '有鬆誌' }])}

    ${allArticles.length > 0
      ? `<div class="ys-journal-list-grid">${articleCards}</div>`
      : `<div class="ys-empty" style="padding:80px 0">
          <p>有鬆誌文章即將推出，敬請期待。</p>
          <a href="/" style="display:inline-block;margin-top:24px;font-size:13px;letter-spacing:.14em;color:var(--brown)">← 回首頁</a>
        </div>`}
  </div>

  ${footerHTML()}`;

  return renderPage({
    title: '有鬆誌',
    description: '有鬆誌——身心靈旅行的真實體驗與在地發現。晨跑、瑜伽、草本、食材，記錄島嶼上的療癒日常。',
    path: '/journal',
    body,
  });
}

module.exports = { renderArticlePage, renderJournalListPage };
