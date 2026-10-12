const { renderPage, headerHTML, footerHTML, breadcrumbHTML, esc, TABLE_TO_SLUG, PORTALY_LABELS, SITE_URL } = require('./layout');

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

function renderDetailPage(type, item, relatedItems) {
  const cat = CATEGORIES[type];
  if (!cat || !item) return null;

  const slug = TABLE_TO_SLUG[type];
  const desc = item[cat.descKey] || item.description || item.bio || '';
  const imgSrc = item.image_url || cat.defaultImg;
  const seoDesc = desc.slice(0, 120) || `${item.name}——有鬆島${cat.zh}資源`;

  const metaHTML = cat.metaFields.map(field => {
    const val = item[field];
    if (!val) return '';
    return `<div class="ys-detail-meta-item">
      <span class="ys-detail-meta-label">${esc(META_LABELS[field] || field)}</span>
      <span class="ys-detail-meta-value">${esc(val)}</span>
    </div>`;
  }).filter(Boolean).join('\n');

  const facilities = Object.entries(FACILITY_LABELS).filter(([key]) => item[key]);
  const facilitiesHTML = type === 'venues' && facilities.length > 0 ? `
    <div id="detail-facilities" class="ys-detail-facilities">
      <h2>場地設施</h2>
      <div id="facility-list" class="ys-detail-facility-list">
        ${facilities.map(([, label]) => `<span class="ys-detail-facility">${esc(label)}</span>`).join('')}
      </div>
    </div>` : `<div id="detail-facilities" class="ys-detail-facilities" style="display:none"><div id="facility-list" class="ys-detail-facility-list"></div></div>`;

  const infos = [];
  if (item.region) infos.push({ label: '地區', value: item.region });
  if (item.price_info) infos.push({ label: '價格', value: item.price_info });
  if (item.portaly_category) infos.push({ label: 'Portaly 分類', value: PORTALY_LABELS[item.portaly_category] || item.portaly_category });
  if (item.capacity) infos.push({ label: '容納人數', value: `${item.capacity} 人` });

  const infoHTML = infos.length > 0 ? `
    <div id="detail-info" class="ys-detail-info">
      <div id="info-grid" class="ys-detail-info-grid">
        ${infos.map(i => `<div class="ys-detail-meta-item">
          <span class="ys-detail-meta-label">${esc(i.label)}</span>
          <span class="ys-detail-meta-value">${esc(i.value)}</span>
        </div>`).join('')}
      </div>
    </div>` : '<div id="detail-info" class="ys-detail-info" style="display:none"><div id="info-grid" class="ys-detail-info-grid"></div></div>';

  const contactLinks = [];
  if (item.line_at) contactLinks.push(`<a class="ys-detail-contact-btn" href="https://line.me/R/ti/p/${encodeURIComponent(item.line_at)}" target="_blank" rel="noopener">LINE 聯繫</a>`);
  if (item.booking_url) contactLinks.push(`<a class="ys-detail-contact-btn" href="${esc(item.booking_url)}" target="_blank" rel="noopener">預約場地</a>`);
  if (item.website) contactLinks.push(`<a class="ys-detail-contact-btn" href="${esc(item.website)}" target="_blank" rel="noopener">官方網站</a>`);
  if (item.portaly_url) contactLinks.push(`<a class="ys-detail-contact-btn" href="${esc(item.portaly_url)}" target="_blank" rel="noopener">Portaly 頁面</a>`);
  if (item.contact) contactLinks.push(`<a class="ys-detail-contact-btn" href="tel:${item.contact.replace(/[^\d+]/g, '')}">${esc(item.contact)}</a>`);

  const contactHTML = contactLinks.length > 0 ? `
    <div id="detail-contact" class="ys-detail-contact">
      <h2>聯繫店家</h2>
      <div id="contact-links" class="ys-detail-contact-links">${contactLinks.join('')}</div>
    </div>` : '<div id="detail-contact" class="ys-detail-contact" style="display:none"><div id="contact-links" class="ys-detail-contact-links"></div></div>';

  const tags = item.tags || item.specialties || [];
  const tagsHTML = tags.length > 0 ? tags.map(tag => `<span class="ys-tag">${esc(tag)}</span>`).join('') : '';

  let relatedHTML = '';
  if (relatedItems && relatedItems.length > 0) {
    const relatedCards = relatedItems.map((ri, i) => {
      const riDesc = ri[cat.descKey] || ri.description || '';
      const riImg = ri.image_url || cat.defaultImg;
      return `<a class="ys-card ys-card--small ys-in" href="/${esc(slug)}/${ri.id}" style="animation-delay:${i * 0.08}s">
        <div class="ys-card-image">
          <img src="${esc(riImg)}" alt="${esc(ri.name)}" loading="lazy" width="400" height="300">
        </div>
        <div class="ys-card-body">
          <div class="ys-card-title"><span class="ys-card-title-zh">${esc(ri.name)}</span></div>
          <p class="ys-card-desc">${esc(riDesc.slice(0, 60))}${riDesc.length > 60 ? '⋯' : ''}</p>
        </div>
      </a>`;
    }).join('\n');

    relatedHTML = `
    <section class="ys-related">
      <h2>其他${esc(cat.zh)}</h2>
      <div class="ys-grid ys-grid--related">${relatedCards}</div>
    </section>`;
  }

  const jsonLd = { '@context': 'https://schema.org' };
  const fullUrl = `${SITE_URL}/${slug}/${item.id}`;

  if (type === 'venues') {
    jsonLd['@type'] = 'LocalBusiness';
    jsonLd.name = item.name;
    jsonLd.description = desc.slice(0, 200);
    if (imgSrc.startsWith('http')) jsonLd.image = imgSrc;
    jsonLd.url = fullUrl;
    if (item.address) {
      jsonLd.address = { '@type': 'PostalAddress', streetAddress: item.address };
      if (item.region) jsonLd.address.addressRegion = item.region;
      jsonLd.address.addressCountry = 'TW';
    }
    if (item.latitude && item.longitude) {
      jsonLd.geo = { '@type': 'GeoCoordinates', latitude: item.latitude, longitude: item.longitude };
    }
    if (item.contact) jsonLd.telephone = item.contact;
    if (item.price_info) jsonLd.priceRange = item.price_info;
    if (item.capacity) jsonLd.maximumAttendeeCapacity = item.capacity;
  } else if (type === 'facilitators') {
    jsonLd['@type'] = 'Person';
    jsonLd.name = item.name;
    jsonLd.description = desc.slice(0, 200);
    if (imgSrc.startsWith('http')) jsonLd.image = imgSrc;
    jsonLd.url = fullUrl;
    if (item.title) jsonLd.jobTitle = item.title;
    const specialties = item.specialties || item.tags || [];
    if (specialties.length > 0) jsonLd.knowsAbout = specialties;
    if (item.website) jsonLd.sameAs = [item.website];
  } else {
    jsonLd['@type'] = 'Product';
    jsonLd.name = item.name;
    jsonLd.description = desc.slice(0, 200);
    if (imgSrc.startsWith('http')) jsonLd.image = imgSrc;
    jsonLd.url = fullUrl;
    jsonLd.brand = { '@type': 'Brand', name: '有鬆島' };
    if (item.origin) jsonLd.countryOfOrigin = { '@type': 'Country', name: item.origin };
    if (type === 'ingredients' && item.season) jsonLd.additionalProperty = [{ '@type': 'PropertyValue', name: '產季', value: item.season }];
    if (item.portaly_category) jsonLd.category = PORTALY_LABELS[item.portaly_category] || item.portaly_category;
  }

  const body = `
  ${headerHTML({ solid: true })}

  <div id="loading" class="ys-loading" style="display:none">載入中⋯</div>

  <div id="content">
    <div class="ys-container">
      ${breadcrumbHTML([
        { label: cat.zh, href: `/${slug}` },
        { label: item.name },
      ])}
    </div>

    <div class="ys-detail-hero">
      <img id="hero-img" src="${esc(imgSrc)}" alt="${esc(item.name)}" width="1200" height="600">
      <div class="ys-detail-hero-overlay"></div>
      <div class="ys-detail-hero-content">
        <span class="ys-section-label" style="color:rgba(244,241,234,.55)" id="detail-label">${esc(cat.label)}</span>
        <h1 id="detail-name" style="margin-top:12px">${esc(item.name)}</h1>
      </div>
    </div>

    <div class="ys-detail-body">
      <p id="detail-desc">${esc(desc)}</p>
      <div id="detail-meta" class="ys-detail-meta">${metaHTML}</div>
      ${facilitiesHTML}
      ${infoHTML}
      ${contactHTML}
      <div id="detail-tags" class="ys-tags">${tagsHTML}</div>
    </div>

    ${relatedHTML}
  </div>

  ${footerHTML()}
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script>window.__YS_TYPE="${type}";window.__YS_SLUG="${slug}";</script>
  <script src="/js/detail.js"></script>`;

  return renderPage({
    title: item.name,
    description: seoDesc,
    path: `/${slug}/${item.id}`,
    ogImage: imgSrc.startsWith('http') ? imgSrc : undefined,
    body,
  });
}

module.exports = { renderDetailPage };
