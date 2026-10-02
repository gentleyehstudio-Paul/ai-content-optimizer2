const CATEGORIES = {
  venues: { zh: '場地', en: 'VENUE', label: '場地', metaFields: ['location', 'address', 'contact', 'website'] },
  facilitators: { zh: '師資', en: 'FACILITATOR', label: '師資', metaFields: ['title', 'contact', 'website'] },
  herbals: { zh: '草本', en: 'HERBAL', label: '草本', metaFields: ['origin', 'supplier', 'website'] },
  ingredients: { zh: '食材', en: 'INGREDIENT', label: '食材', metaFields: ['origin', 'season', 'supplier', 'website'] },
};

const META_LABELS = {
  location: '所在地', address: '地址', contact: '聯絡', website: '網站',
  title: '專長', origin: '產地', supplier: '供應者', season: '產季',
};

const parts = window.location.pathname.split('/');
const type = parts[2] || 'venues';
const id = parts[3];
const cat = CATEGORIES[type] || CATEGORIES.venues;

document.getElementById('back-link').href = `/category/${type}`;
document.getElementById('back-link').textContent = `← 返回${cat.zh}列表`;

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
    document.getElementById('detail-desc').textContent = item.description || item.bio || '';

    const img = document.getElementById('hero-img');
    img.src = item.image_url || '/assets/images/venue-teahouse.jpg';
    img.alt = item.name;

    const metaContainer = document.getElementById('detail-meta');
    cat.metaFields.forEach(field => {
      const val = item[field];
      if (!val) return;
      const div = document.createElement('div');
      div.className = 'ys-detail-meta-item';

      let display = val;
      if (field === 'website' && val.startsWith('http')) {
        display = `<a href="${val}" target="_blank" rel="noopener">${new URL(val).hostname}</a>`;
      }

      div.innerHTML = `
        <span class="ys-detail-meta-label">${META_LABELS[field] || field}</span>
        <span class="ys-detail-meta-value">${display}</span>
      `;
      metaContainer.appendChild(div);
    });

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
