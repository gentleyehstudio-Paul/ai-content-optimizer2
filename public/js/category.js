const SLUG_TO_TABLE = { places: 'venues', teachers: 'facilitators', herbs: 'herbals', food: 'ingredients' };

const PORTALY_LABELS = {
  A: '課程教學類', B: '身體調理類', C: '空間能量類', D: '心靈茶飲類',
  E: '商品販售類', F: '個案諮詢類', G: '頌缽療育類', H: '瑜伽教室類',
  I: '場地租借類', J: '其他類',
};

const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '01 — 場地', subtitle: 'Healing spaces across the island', descKey: 'description', secondaryKey: 'location', hero: '/assets/images/venue-pool.jpg', defaultImg: '/assets/images/venue-zen.jpg' },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '02 — 師資', subtitle: 'Guides for body and mind', descKey: 'bio', secondaryKey: 'title', hero: '/assets/images/facilitator-meditation.jpg', defaultImg: '/assets/images/facilitator-ceremony.jpg' },
  herbals: { zh: '草本', en: 'HERBAL', label: '03 — 草本', subtitle: 'Herbs and botanicals of Taiwan', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/herbal-stone.jpg', defaultImg: '/assets/images/herbal-bowls.jpg' },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '04 — 食材', subtitle: 'Farm-to-table healing ingredients', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/ingredient-harvest.jpg', defaultImg: '/assets/images/herbal-bowls.jpg' },
};

const type = window.__YS_TYPE || (function() {
  const p = window.location.pathname;
  const slugMatch = p.match(/^\/(places|teachers|herbs|food)/);
  if (slugMatch) return SLUG_TO_TABLE[slugMatch[1]];
  const catMatch = p.split('/category/')[1]?.replace(/\/$/, '');
  return catMatch || 'venues';
})();

const slug = window.__YS_SLUG || Object.entries(SLUG_TO_TABLE).find(([, v]) => v === type)?.[0] || 'places';
const cat = CATEGORIES[type] || CATEGORIES.venues;

let allItems = [];

function extractPrice(item) {
  const raw = item.price_info || '';
  const match = raw.replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getActiveFilters() {
  const region = document.getElementById('filter-region').value;
  const portaly = document.getElementById('filter-portaly').value;
  const priceEl = document.querySelector('input[name="price"]:checked');
  const price = priceEl ? priceEl.value : '';
  const keyword = document.getElementById('filter-keyword').value.trim().toLowerCase();
  const seasonEl = document.getElementById('filter-season');
  const season = seasonEl ? seasonEl.value : '';

  const facilities = [];
  document.querySelectorAll('[data-facility]:checked').forEach(cb => {
    facilities.push(cb.dataset.facility);
  });

  return { region, portaly, price, keyword, facilities, season };
}

function applyFilters() {
  const { region, portaly, price, keyword, facilities, season } = getActiveFilters();

  const filtered = allItems.filter(item => {
    const regionKey = (type === 'herbals' || type === 'ingredients') ? 'origin' : 'region';
    if (region && (item[regionKey] || '') !== region) return false;
    if (portaly && (item.portaly_category || '') !== portaly) return false;

    if (price) {
      const p = extractPrice(item);
      if (p === null) return false;
      if (price === 'low' && p > 500) return false;
      if (price === 'mid' && (p < 500 || p > 2000)) return false;
      if (price === 'high' && p < 2000) return false;
    }

    if (keyword) {
      const searchable = [
        item.name, item.description, item.bio, item.location,
        item.title, item.origin, item.region, item.price_info
      ].filter(Boolean).join(' ').toLowerCase();
      if (!searchable.includes(keyword)) return false;
    }

    if (season && (item.season || '') !== season) return false;

    for (const fac of facilities) {
      if (!item[fac]) return false;
    }

    return true;
  });

  renderGrid(filtered);
  const countEl = document.getElementById('filter-count');
  countEl.textContent = `${filtered.length} / ${allItems.length} 筆`;
}

function renderGrid(items) {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const noResults = document.getElementById('no-results');

  grid.innerHTML = '';

  if (allItems.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  if (items.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  noResults.style.display = 'none';
  grid.style.display = '';

  let displayItems = items;
  if (type === 'herbals' && items.length > 0 && items.length < 4) {
    const base = [...items];
    while (displayItems.length < 4) displayItems = displayItems.concat(base);
    displayItems = displayItems.slice(0, 6);
  }

  displayItems.forEach((item, i) => {
    const card = document.createElement('a');
    card.className = 'ys-card ys-in';
    card.href = `/${slug}/${item.id}`;
    card.style.animationDelay = `${i * 0.08}s`;

    const desc = item[cat.descKey] || item.description || '';
    const secondary = item[cat.secondaryKey] || '';
    const imgSrc = item.image_url || cat.defaultImg;

    const badges = [];
    if (item.region) badges.push(item.region);
    if (item.portaly_category) badges.push(PORTALY_LABELS[item.portaly_category] || item.portaly_category);
    if (item.price_info) badges.push(item.price_info);
    if (item.season) badges.push(item.season);

    card.innerHTML = `
      <div class="ys-card-image">
        <img src="${imgSrc}" alt="${item.name}" loading="lazy">
        <span class="ys-card-number">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <div class="ys-card-body">
        <div class="ys-card-title">
          <span class="ys-card-title-zh">${item.name}</span>
          ${secondary ? `<span class="ys-card-title-en">${secondary}</span>` : ''}
        </div>
        ${badges.length ? `<div class="ys-card-badges">${badges.map(b => `<span class="ys-badge">${b}</span>`).join('')}</div>` : ''}
        <p class="ys-card-desc">${desc.slice(0, 80)}${desc.length > 80 ? '⋯' : ''}</p>
        <span class="ys-card-rule"></span>
        <span class="ys-card-more">VIEW MORE →</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function populateRegionDropdown(items) {
  const useOrigin = type === 'herbals' || type === 'ingredients';
  const key = useOrigin ? 'origin' : 'region';
  const regions = [...new Set(items.map(i => i[key]).filter(Boolean))].sort();
  const select = document.getElementById('filter-region');
  regions.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    select.appendChild(opt);
  });
}

function populateSeasonDropdown(items) {
  const seasons = [...new Set(items.map(i => i.season).filter(Boolean))].sort();
  const select = document.getElementById('filter-season');
  if (!select || select.style.display === 'none') return;
  seasons.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}

function resetFilters() {
  document.getElementById('filter-region').value = '';
  document.getElementById('filter-portaly').value = '';
  document.getElementById('filter-keyword').value = '';
  const priceAll = document.querySelector('input[name="price"][value=""]');
  if (priceAll) priceAll.checked = true;
  const seasonEl = document.getElementById('filter-season');
  if (seasonEl) seasonEl.value = '';
  document.querySelectorAll('[data-facility]').forEach(cb => { cb.checked = false; });
  applyFilters();
}

function bindEvents() {
  document.getElementById('filter-region').addEventListener('change', applyFilters);
  const portalyEl = document.getElementById('filter-portaly');
  if (portalyEl && portalyEl.style.display !== 'none') portalyEl.addEventListener('change', applyFilters);
  document.querySelectorAll('input[name="price"]').forEach(r => r.addEventListener('change', applyFilters));
  document.querySelectorAll('[data-facility]').forEach(cb => cb.addEventListener('change', applyFilters));
  const seasonEl = document.getElementById('filter-season');
  if (seasonEl && seasonEl.style.display !== 'none') seasonEl.addEventListener('change', applyFilters);

  let debounce;
  document.getElementById('filter-keyword').addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(applyFilters, 300);
  });

  document.getElementById('filter-reset').addEventListener('click', resetFilters);
  document.getElementById('clear-filters-btn').addEventListener('click', resetFilters);

  const toggle = document.getElementById('sidebar-toggle');
  const body = document.getElementById('sidebar-body');
  toggle.addEventListener('click', () => {
    body.classList.toggle('ys-sidebar-open');
    toggle.classList.toggle('active');
  });
}

async function load() {
  try {
    const res = await fetch(`/api/${type}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error(data.error || 'Invalid response');
    allItems = data;
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'none';

    populateRegionDropdown(allItems);
    populateSeasonDropdown(allItems);
    bindEvents();
    applyFilters();
  } catch (err) {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
      loadingEl.style.display = '';
      loadingEl.textContent = '載入失敗，請重試';
    }
    console.error(err);
  }
}

load();
