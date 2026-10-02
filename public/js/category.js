const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '01 — 場地', subtitle: 'Healing spaces across the island', descKey: 'description', secondaryKey: 'location' },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '02 — 師資', subtitle: 'Guides for body and mind', descKey: 'bio', secondaryKey: 'title' },
  herbals: { zh: '草本', en: 'HERBAL', label: '03 — 草本', subtitle: 'Herbs and botanicals of Taiwan', descKey: 'description', secondaryKey: 'origin' },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '04 — 食材', subtitle: 'Farm-to-table healing ingredients', descKey: 'description', secondaryKey: 'origin' },
};

const path = window.location.pathname;
const type = path.split('/category/')[1]?.replace(/\/$/, '') || 'venues';
const cat = CATEGORIES[type] || CATEGORIES.venues;

document.title = `${cat.zh} — 有鬆島`;
document.getElementById('section-label').textContent = cat.label;
document.getElementById('page-title').textContent = `探索${cat.zh}`;
document.getElementById('page-subtitle').textContent = cat.subtitle;

async function load() {
  try {
    const res = await fetch(`/api/${type}`);
    const items = await res.json();
    document.getElementById('loading').style.display = 'none';

    if (!items.length) {
      document.getElementById('empty').style.display = 'block';
      return;
    }

    const grid = document.getElementById('grid');
    grid.style.display = '';

    items.forEach((item, i) => {
      const card = document.createElement('a');
      card.className = 'ys-card ys-in';
      card.href = `/detail/${type}/${item.id}`;
      card.style.animationDelay = `${i * 0.08}s`;

      const desc = item[cat.descKey] || item.description || '';
      const secondary = item[cat.secondaryKey] || '';
      const imgSrc = item.image_url || '/assets/images/venue-teahouse.jpg';

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
          <p class="ys-card-desc">${desc.slice(0, 80)}${desc.length > 80 ? '⋯' : ''}</p>
          <span class="ys-card-rule"></span>
          <span class="ys-card-more">VIEW MORE →</span>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    document.getElementById('loading').textContent = '載入失敗，請重試';
    console.error(err);
  }
}

load();
