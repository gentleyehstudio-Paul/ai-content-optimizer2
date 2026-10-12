const { renderPage, headerHTML, footerHTML, breadcrumbHTML, esc, TABLE_TO_SLUG, PORTALY_LABELS } = require('./layout');

const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '01 — 場地', subtitle: 'Healing spaces across the island', descKey: 'description', secondaryKey: 'location', hero: '/assets/images/venue-pool.jpg', defaultImg: '/assets/images/venue-zen.jpg', seoDesc: '探索台灣各地療癒場地——瑜伽教室、靜心空間、茶室與自然場域，找到適合你的身心安放之所。' },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '02 — 師資', subtitle: 'Guides for body and mind', descKey: 'bio', secondaryKey: 'title', hero: '/assets/images/facilitator-meditation.jpg', defaultImg: '/assets/images/facilitator-ceremony.jpg', seoDesc: '有鬆島師資——瑜伽、冥想、芳療、聲音療癒與藝術療癒引導師，陪伴你的身心旅程。' },
  herbals: { zh: '草本', en: 'HERBAL', label: '03 — 草本', subtitle: 'Herbs and botanicals of Taiwan', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/herbal-stone.jpg', defaultImg: '/assets/images/herbal-bowls.jpg', seoDesc: '台灣在地草本植物——香草、精油、藥草與茶材，來自這座島嶼的自然療癒力量。' },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '04 — 食材', subtitle: 'Farm-to-table healing ingredients', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/ingredient-harvest.jpg', defaultImg: '/assets/images/herbal-bowls.jpg', seoDesc: '友善農產與療癒食材——從產地到餐桌，用食物找回身體的平衡。' },
};

function renderCategoryPage(type, items) {
  const cat = CATEGORIES[type];
  if (!cat) return null;

  const slug = TABLE_TO_SLUG[type];

  const itemCards = (items || []).map((item, i) => {
    const desc = item[cat.descKey] || item.description || '';
    const secondary = item[cat.secondaryKey] || '';
    const imgSrc = item.image_url || cat.defaultImg;
    const badges = [];
    if (item.region) badges.push(item.region);
    if (item.portaly_category) badges.push(PORTALY_LABELS[item.portaly_category] || item.portaly_category);
    if (item.price_info) badges.push(item.price_info);
    if (item.season) badges.push(item.season);

    return `<a class="ys-card ys-in" href="/${esc(slug)}/${item.id}" style="animation-delay:${i * 0.08}s">
      <div class="ys-card-image">
        <img src="${esc(imgSrc)}" alt="${esc(item.name)}" loading="lazy" width="400" height="300">
        <span class="ys-card-number">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <div class="ys-card-body">
        <div class="ys-card-title">
          <span class="ys-card-title-zh">${esc(item.name)}</span>
          ${secondary ? `<span class="ys-card-title-en">${esc(secondary)}</span>` : ''}
        </div>
        ${badges.length ? `<div class="ys-card-badges">${badges.map(b => `<span class="ys-badge">${esc(b)}</span>`).join('')}</div>` : ''}
        <p class="ys-card-desc">${esc(desc.slice(0, 80))}${desc.length > 80 ? '⋯' : ''}</p>
        <span class="ys-card-rule"></span>
        <span class="ys-card-more">VIEW MORE →</span>
      </div>
    </a>`;
  }).join('\n');

  const body = `
  ${headerHTML({ solid: true })}

  <div class="ys-page-header ys-page-header--hero">
    <img id="page-hero-img" class="ys-page-header-img" src="${esc(cat.hero)}" alt="有鬆島${esc(cat.zh)}列表" width="1600" height="600">
    <div class="ys-page-header-overlay"></div>
    <div class="ys-container" style="position:relative;z-index:1">
      <span class="ys-section-label" style="color:rgba(244,241,234,.55)" id="section-label">${esc(cat.label)}</span>
      <h1 id="page-title" style="margin-top:16px">探索${esc(cat.zh)}</h1>
      <p id="page-subtitle">${esc(cat.subtitle)}</p>
    </div>
  </div>

  <div class="ys-container">
    ${breadcrumbHTML([{ label: cat.zh, href: `/${slug}` }])}

    <div class="ys-category-layout">
      <aside class="ys-sidebar" id="sidebar">
        <button class="ys-sidebar-toggle" id="sidebar-toggle">
          <span>篩選條件</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        </button>
        <div class="ys-sidebar-body" id="sidebar-body">
          <div class="ys-filter-group">
            <h3 class="ys-filter-title">${type === 'herbals' || type === 'ingredients' ? '產地' : '地區'}</h3>
            <select id="filter-region" class="ys-filter-select"><option value="">${type === 'herbals' || type === 'ingredients' ? '全部產地' : '全部地區'}</option></select>
          </div>
          ${type === 'venues' || type === 'facilitators' ? `<div class="ys-filter-group">
            <h3 class="ys-filter-title">Portaly 分類</h3>
            <select id="filter-portaly" class="ys-filter-select">
              <option value="">全部分類</option>
              <option value="A">課程教學類</option>
              <option value="B">身體調理類</option>
              <option value="C">空間能量類</option>
              <option value="D">心靈茶飲類</option>
              <option value="E">商品販售類</option>
              <option value="F">個案諮詢類</option>
              <option value="G">頌缽療育類</option>
              <option value="H">瑜伽教室類</option>
              <option value="I">場地租借類</option>
              <option value="J">其他類</option>
            </select>
          </div>` : '<select id="filter-portaly" style="display:none"></select>'}
          ${type === 'venues' ? `<div class="ys-filter-group">
            <h3 class="ys-filter-title">價格範圍</h3>
            <div class="ys-filter-radios">
              <label class="ys-filter-radio"><input type="radio" name="price" value="" checked><span>不限</span></label>
              <label class="ys-filter-radio"><input type="radio" name="price" value="low"><span>$500 以下</span></label>
              <label class="ys-filter-radio"><input type="radio" name="price" value="mid"><span>$500 – $2,000</span></label>
              <label class="ys-filter-radio"><input type="radio" name="price" value="high"><span>$2,000 以上</span></label>
            </div>
          </div>` : '<input type="radio" name="price" value="" checked style="display:none">'}
          ${type === 'venues' ? `<div class="ys-filter-group" id="facilities-group">
            <h3 class="ys-filter-title">場地設施</h3>
            <div class="ys-filter-checks">
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_mirror"><span>鏡子</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_wooden_floor"><span>木地板</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_accessibility"><span>無障礙空間</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_audio_equipment"><span>音響設備</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_parking"><span>停車場</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_shower"><span>淋浴間</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_kitchen"><span>廚房</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_wifi"><span>Wi-Fi</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="has_projector"><span>投影機</span></label>
              <label class="ys-filter-check"><input type="checkbox" data-facility="near_mrt"><span>捷運站步行5分鐘內</span></label>
            </div>
          </div>` : ''}
          ${type === 'ingredients' ? `<div class="ys-filter-group">
            <h3 class="ys-filter-title">產季</h3>
            <select id="filter-season" class="ys-filter-select"><option value="">全部產季</option></select>
          </div>` : '<select id="filter-season" style="display:none"></select>'}
          <div class="ys-filter-group">
            <h3 class="ys-filter-title">關鍵字搜尋</h3>
            <input type="text" id="filter-keyword" class="ys-filter-input" placeholder="輸入名稱或描述⋯">
          </div>
          <div class="ys-filter-actions">
            <button class="ys-filter-reset" id="filter-reset">清除篩選</button>
            <span class="ys-filter-count" id="filter-count"></span>
          </div>
        </div>
      </aside>

      <main class="ys-main">
        ${items && items.length > 0
          ? `<div id="grid" class="ys-grid">${itemCards}</div>`
          : `<div id="grid" class="ys-grid" style="display:none"></div>`}
        <div id="loading" class="ys-loading" style="display:none">載入中⋯</div>
        <div id="empty" class="ys-empty" style="${!items || items.length === 0 ? '' : 'display:none'}">
          <p>目前尚無資料</p>
          <a href="/" style="display:inline-block;margin-top:24px;font-size:13px;letter-spacing:.14em;color:var(--brown)">← 回首頁</a>
        </div>
        <div id="no-results" class="ys-empty" style="display:none">
          <p>沒有符合篩選條件的結果</p>
          <button id="clear-filters-btn" style="margin-top:16px;padding:8px 24px;border:1px solid var(--brown);background:none;color:var(--brown);font-family:var(--font-serif);font-size:13px;letter-spacing:.14em;cursor:pointer">清除篩選</button>
        </div>
      </main>
    </div>
  </div>

  ${footerHTML()}
  <script>window.__YS_TYPE="${type}";window.__YS_SLUG="${slug}";</script>
  <script src="/js/category.js"></script>`;

  const noindex = (type === 'herbals' || type === 'ingredients') && items && items.length <= 1;

  return renderPage({
    title: `探索${cat.zh}`,
    description: cat.seoDesc,
    path: `/${slug}`,
    ogImage: cat.hero,
    noindex,
    body,
  });
}

module.exports = { renderCategoryPage, CATEGORIES };
