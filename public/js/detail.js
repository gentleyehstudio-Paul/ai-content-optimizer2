const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '場地', descKey: 'description', metaFields: ['location', 'address'], defaultImg: '/assets/images/venue-zen.jpg' },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '師資', descKey: 'bio', metaFields: ['title'], defaultImg: '/assets/images/facilitator-ceremony.jpg' },
  herbals: { zh: '草本', en: 'HERBAL', label: '草本', descKey: 'description', metaFields: ['origin'], defaultImg: '/assets/images/herbal-bowls.jpg' },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '食材', descKey: 'description', metaFields: ['origin', 'season'], defaultImg: '/assets/images/ingredient-harvest.jpg' },
};

const META_LABELS = {
  location: '所在地', address: '地址', title: '專長',
  origin: '產地', season: '產季',
};

const FACILITY_LABELS = {
  has_mirror: '鏡子', has_wooden_floor: '木地板', has_accessibility: '無障礙空間',
  has_audio_equipment: '音響設備', has_parking: '停車場', has_shower: '淋浴間',
  has_kitchen: '廚房', has_wifi: 'Wi-Fi', has_projector: '投影機', near_mrt: '捷運站步行5分鐘內',
};

const parts = window.location.pathname.split('/');
const type = parts[2] || 'venues';
const id = parts[3];
const cat = CATEGORIES[type] || CATEGORIES.venues;

document.getElementById('back-link').href = `/category/${type}`;
document.getElementById('back-link').textContent = `← 返回${cat.zh}列表`;

function renderContactLinks(item) {
  const container = document.getElementById('contact-links');
  const links = [];

  if (item.line_at) {
    links.push(`<a class="ys-detail-contact-btn" href="https://line.me/R/ti/p/${encodeURIComponent(item.line_at)}" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.81 2 10.5c0 4.08 3.42 7.5 8.05 8.34.31.07.74.21.85.48.1.25.06.63.03.88l-.14.82c-.04.25-.2.98.86.53s5.72-3.37 7.8-5.77C21.17 13.86 22 12.25 22 10.5 22 5.81 17.52 2 12 2z"/></svg>
      LINE 聯繫
    </a>`);
  }

  if (item.booking_url) {
    links.push(`<a class="ys-detail-contact-btn" href="${item.booking_url}" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      預約場地
    </a>`);
  }

  if (item.website) {
    links.push(`<a class="ys-detail-contact-btn" href="${item.website}" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>
      官方網站
    </a>`);
  }

  if (item.portaly_url) {
    links.push(`<a class="ys-detail-contact-btn" href="${item.portaly_url}" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Portaly 頁面
    </a>`);
  }

  if (item.contact) {
    links.push(`<a class="ys-detail-contact-btn" href="tel:${item.contact.replace(/[^\d+]/g, '')}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0122 16.92z"/></svg>
      ${item.contact}
    </a>`);
  }

  if (links.length > 0) {
    container.innerHTML = links.join('');
    document.getElementById('detail-contact').style.display = '';
  }
}

function renderFacilities(item) {
  const facilities = Object.entries(FACILITY_LABELS)
    .filter(([key]) => item[key])
    .map(([, label]) => label);

  if (facilities.length === 0) return;

  const container = document.getElementById('facility-list');
  container.innerHTML = facilities.map(f => `<span class="ys-detail-facility">${f}</span>`).join('');
  document.getElementById('detail-facilities').style.display = '';
}

function renderExtraInfo(item) {
  const infos = [];
  if (item.region) infos.push({ label: '地區', value: item.region });
  if (item.price_info) infos.push({ label: '價格', value: item.price_info });
  if (item.portaly_category) infos.push({ label: 'Portaly 分類', value: item.portaly_category });
  if (item.capacity) infos.push({ label: '容納人數', value: `${item.capacity} 人` });

  if (infos.length === 0) return;

  const container = document.getElementById('info-grid');
  container.innerHTML = infos.map(i => `
    <div class="ys-detail-meta-item">
      <span class="ys-detail-meta-label">${i.label}</span>
      <span class="ys-detail-meta-value">${i.value}</span>
    </div>
  `).join('');
  document.getElementById('detail-info').style.display = '';
}

async function load() {
  try {
    const res = await fetch(`/api/${type}/${id}`);
    if (!res.ok) throw new Error('Not found');
    const item = await res.json();

    document.title = `${item.name} — 有鬆島`;
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = '';

    document.getElementById('detail-label').textContent = cat.label;
    document.getElementById('detail-name').textContent = item.name;
    document.getElementById('detail-desc').textContent = item[cat.descKey] || item.description || item.bio || '';

    const img = document.getElementById('hero-img');
    img.src = item.image_url || cat.defaultImg;
    img.alt = item.name;

    const metaContainer = document.getElementById('detail-meta');
    cat.metaFields.forEach(field => {
      const val = item[field];
      if (!val) return;
      const div = document.createElement('div');
      div.className = 'ys-detail-meta-item';
      div.innerHTML = `
        <span class="ys-detail-meta-label">${META_LABELS[field] || field}</span>
        <span class="ys-detail-meta-value">${val}</span>
      `;
      metaContainer.appendChild(div);
    });

    if (type === 'venues') {
      renderFacilities(item);
    }
    renderExtraInfo(item);
    renderContactLinks(item);

    const tags = item.tags || item.specialties || [];
    const tagsContainer = document.getElementById('detail-tags');
    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'ys-tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  } catch (err) {
    document.getElementById('loading').textContent = '找不到此資源';
    console.error(err);
  }
}

load();
