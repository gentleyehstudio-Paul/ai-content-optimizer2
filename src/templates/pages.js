const { renderPage, headerHTML, footerHTML, breadcrumbHTML, esc } = require('./layout');

function renderStaticPage({ title, description, slug, breadcrumb, content }) {
  const body = `
  ${headerHTML({ solid: true })}
  <div class="ys-container" style="padding-top:120px;padding-bottom:80px">
    ${breadcrumbHTML([{ label: breadcrumb || title }])}
    <article class="ys-article">
      <h1>${esc(title)}</h1>
      ${content}
    </article>
  </div>
  ${footerHTML()}`;

  return renderPage({ title, description, path: `/${slug}`, body });
}

function aboutPage() {
  return renderStaticPage({
    title: '關於有鬆島',
    description: '有鬆島串連台灣場地、師資、草本與食材，打造島嶼療癒生態網絡——讓每一次休息，都能落在真實的山、真實的人、真實的土地上。',
    slug: 'about',
    breadcrumb: '關於',
    content: `
      <p class="ys-article-lead">有鬆島不是一個地方，而是一張把島嶼上的療癒資源接起來的網。</p>
      <p>我們串連場地、師資、草本與食材——讓每一次休息，都能落在真實的山、真實的人、真實的土地上。</p>
      <h2>我們的願景</h2>
      <p>在這座島嶼上，療癒的資源其實一直都在：隱身巷弄的茶空間、深山裡的靜修場域、默默耕耘的草本農家、用心製作友善食材的小農。有鬆島想做的，是讓這些資源被看見、被串連，讓每個想要慢下來的人，都能找到適合自己的方式。</p>
      <h2>四大療癒維度</h2>
      <div class="ys-article-grid">
        <div><h3>場地</h3><p>療癒空間、自然場域、民宿、農場與茶空間。</p></div>
        <div><h3>師資</h3><p>瑜伽、冥想、芳療、聲音療癒與藝術療癒。</p></div>
        <div><h3>草本</h3><p>台灣香草、精油、藥草、茶材與植物應用。</p></div>
        <div><h3>食材</h3><p>友善農產、養生飲食、地方風土與療癒料理。</p></div>
      </div>
      <h2>聯繫我們</h2>
      <p>若你正在做讓人鬆下來的事——場域主人、療癒師、香草農與友善小農，歡迎成為有鬆島的一部分。</p>
      <p>Email: <a href="mailto:gentleyehstudio@gmail.com">gentleyehstudio@gmail.com</a></p>
    `,
  });
}

function partnersPage() {
  return renderStaticPage({
    title: '合作夥伴',
    description: '場域主人、療癒師、香草農與友善小農——歡迎成為有鬆島的一部分，一起串連台灣療癒生態。',
    slug: 'partners',
    content: `
      <p class="ys-article-lead">歡迎成為有鬆島的一部分。</p>
      <p>我們正在尋找志同道合的夥伴，一起串連台灣的療癒生態網絡。無論你是：</p>
      <ul>
        <li><strong>場域主人</strong> — 提供療癒空間、自然場域、靜修場所</li>
        <li><strong>療癒師</strong> — 瑜伽、冥想、芳療、聲音療癒引導</li>
        <li><strong>草本農家</strong> — 種植台灣在地香草、藥草、茶材</li>
        <li><strong>友善小農</strong> — 生產友善農產、養生食材</li>
      </ul>
      <h2>合作方式</h2>
      <p>有鬆島為合作夥伴提供免費的線上曝光，包含獨立介紹頁面、篩選功能與聯繫管道。我們不收取上架費用，也不抽取佣金。</p>
      <h2>提出合作</h2>
      <form id="partner-form" class="ys-contact-form">
        <div class="ys-form-group">
          <label for="contact-name">姓名 / 品牌名稱 <span class="ys-required">*</span></label>
          <input type="text" id="contact-name" name="name" required placeholder="您的名字或品牌名稱">
        </div>
        <div class="ys-form-group">
          <label for="contact-email">Email <span class="ys-required">*</span></label>
          <input type="email" id="contact-email" name="email" required placeholder="your@email.com">
        </div>
        <div class="ys-form-group">
          <label for="contact-type">合作類型</label>
          <select id="contact-type" name="type">
            <option value="">請選擇</option>
            <option value="venue">場域主人</option>
            <option value="facilitator">療癒師</option>
            <option value="herbal">草本農家</option>
            <option value="ingredient">友善小農</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="ys-form-group">
          <label for="contact-message">簡述您的療癒事業 <span class="ys-required">*</span></label>
          <textarea id="contact-message" name="message" required rows="5" placeholder="告訴我們您在做的事⋯"></textarea>
        </div>
        <button type="submit" class="ys-btn ys-btn--solid" style="border:none;cursor:pointer">送出合作提案</button>
        <div id="form-status" class="ys-form-status" style="display:none"></div>
      </form>
      <p style="margin-top:24px;font-size:13px;color:var(--muted)">或直接來信 <a href="mailto:gentleyehstudio@gmail.com">gentleyehstudio@gmail.com</a></p>
      <script>
      document.getElementById('partner-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const status = document.getElementById('form-status');
        btn.disabled = true;
        btn.textContent = '送出中⋯';
        status.style.display = 'none';
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: document.getElementById('contact-name').value,
              email: document.getElementById('contact-email').value,
              type: document.getElementById('contact-type').value,
              message: document.getElementById('contact-message').value,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            status.textContent = '感謝您的提案！我們會盡快回覆。';
            status.className = 'ys-form-status ys-form-success';
            status.style.display = 'block';
            this.reset();
          } else {
            throw new Error(data.error || '送出失敗');
          }
        } catch (err) {
          status.textContent = err.message || '送出失敗，請稍後再試。';
          status.className = 'ys-form-status ys-form-error';
          status.style.display = 'block';
        } finally {
          btn.disabled = false;
          btn.textContent = '送出合作提案';
        }
      });
      </script>
    `,
  });
}

function privacyPage() {
  return renderStaticPage({
    title: '隱私政策',
    description: '有鬆島隱私政策——說明我們如何收集、使用和保護您的個人資訊。',
    slug: 'privacy',
    content: `
      <p>最後更新日期：2026 年 10 月</p>
      <h2>資料收集</h2>
      <p>有鬆島（以下簡稱「本平台」）目前不主動收集使用者的個人資料。您瀏覽本平台時，伺服器僅記錄標準的存取日誌（IP 位址、瀏覽器類型、存取時間），用於維護服務穩定性。</p>
      <h2>第三方連結</h2>
      <p>本平台包含連結至合作夥伴的外部網站（如 LINE、Portaly、合作夥伴官網等）。點擊這些連結後，您將離開本平台，其後的資料收集與使用將受該網站自身的隱私政策規範。</p>
      <h2>Cookie</h2>
      <p>本平台目前不使用 Cookie 或任何追蹤技術。</p>
      <h2>資料安全</h2>
      <p>本平台採用 HTTPS 加密傳輸，確保您與伺服器之間的通訊安全。</p>
      <h2>政策變更</h2>
      <p>本隱私政策可能隨服務發展而更新。更新時將於本頁公告，並標註最後更新日期。</p>
      <h2>聯繫方式</h2>
      <p>如有任何隱私相關疑問，請來信 <a href="mailto:gentleyehstudio@gmail.com">gentleyehstudio@gmail.com</a>。</p>
    `,
  });
}

module.exports = { aboutPage, partnersPage, privacyPage };
