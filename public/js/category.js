const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '01 — 場地', subtitle: 'Healing spaces across the island', descKey: 'description', secondaryKey: 'location', hero: '/assets/images/venue-pool.jpg', defaultImg: '/assets/images/venue-zen.jpg' },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '02 — 師資', subtitle: 'Guides for body and mind', descKey: 'bio', secondaryKey: 'title', hero: '/assets/images/facilitator-meditation.jpg', defaultImg: '/assets/images/facilitator-ceremony.jpg' },
  herbals: { zh: '草本', en: 'HERBAL', label: '03 — 草本', subtitle: 'Herbs and botanicals of Taiwan', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/herbal-stone.jpg', defaultImg: '/assets/images/herbal-bowls.jpg' },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '04 — 食材', subtitle: 'Farm-to-table healing ingredients', descKey: 'description', secondaryKey: 'origin', hero: '/assets/images/ingredient-harvest.jpg', defaultImg: '/assets/images/herbal-bowls.jpg' },
};

const path = window.location.pathname;
const type = path.split('/category/')[1]?.replace(/\/$/, '') || 'venues';
const cat = CATEGORIES[type] || CATEGORIES.venues;

document.title = `${cat.zh} — 有鬆島`;
document.getElementById('section-label').textContent = cat.label;
document.getElementById('page-title').textContent = `探索${cat.zh}`;
document.getElementById('page-subtitle').textContent = cat.subtitle;
document.getElementById('page-hero-img').src = cat.hero;
document.getElementById('page-hero-img').alt = cat.zh;

if (type === 'venues') {
  document.getElementById('facilities-group').style.display = '';
}

let allItems = [];

function extractPrice(item) {
  const raw = item.price_info || '';
  const match = raw.replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getActiveFilters() {
  const region = document.getElementById('filter-region').value;
  const portaly = document.getElementById('filter-portaly').value;
  const price = document.querySelector('input[name="price"]:checked')?.value || '';
  const keyword = document.getElementById('filter-keyword').value.trim().toLowerCase();

  const facilities = [];
  document.querySelectorAll('[data-facility]:checked').forEach(cb => {
    facilities.push(cb.dataset.facility);
  });

  return { region, portaly, price, keyword, facilities };
}

function applyFilters() {
  const { region, portaly, price, keyword, facilities } = getActiveFilters();

  const filtered = allItems.filter(item => {
    if (region && (item.region || '') !== region) return false;
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

  items.forEach((item, i) => {
    const card = document.createElement('a');
    card.className = 'ys-card ys-in';
    card.href = `/detail/${type}/${item.id}`;
    card.style.animationDelay = `${i * 0.08}s`;

    const desc = item[cat.descKey] || item.description || '';
    const secondary = item[cat.secondaryKey] || '';
    const imgSrc = item.image_url || cat.defaultImg;

    const badges = [];
    if (item.region) badges.push(item.region);
    if (item.portaly_category) badges.push(item.portaly_category);
    if (item.price_info) badges.push(item.price_info);

    card.innerHTML = `
      <div class="ys-card-image">
        <img src="${imgSrc}" alt="${item.name}">
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
  const regions = [...new Set(items.map(i => i.region).filter(Boolean))].sort();
  const select = document.getElementById('filter-region');
  regions.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    select.appendChild(opt);
  });
}

function resetFilters() {
  document.getElementById('filter-region').value = '';
  document.getElementById('filter-portaly').value = '';
  document.getElementById('filter-keyword').value = '';
  document.querySelector('input[name="price"][value=""]').checked = true;
  document.querySelectorAll('[data-facility]').forEach(cb => { cb.checked = false; });
  applyFilters();
}

function bindEvents() {
  document.getElementById('filter-region').addEventListener('change', applyFilters);
  document.getElementById('filter-portaly').addEventListener('change', applyFilters);
  document.querySelectorAll('input[name="price"]').forEach(r => r.addEventListener('change', applyFilters));
  document.querySelectorAll('[data-facility]').forEach(cb => cb.addEventListener('change', applyFilters));

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
    document.getElementById('loading').style.display = 'none';

    populateRegionDropdown(allItems);
    bindEvents();
    applyFilters();
  } catch (err) {
    document.getElementById('loading').textContent = '載入失敗，請重試';
    console.error(err);
  }
}

load();
