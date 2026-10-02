const puppeteer = require('puppeteer-core');

const PORTALY_CATEGORIES = {
  'A': { label: '課程教學類', table: 'facilitators' },
  'B': { label: '身體調理類', table: 'facilitators' },
  'C': { label: '空間能量類', table: 'venues' },
  'D': { label: '心靈茶飲類', table: 'venues' },
  'E': { label: '商品販售類', table: 'herbals' },
  'F': { label: '個案諮詢類', table: 'facilitators' },
  'G': { label: '頌缽療育類', table: 'facilitators' },
  'H': { label: '瑜伽教室類', table: 'facilitators' },
  'I': { label: '場地租借類', table: 'venues' },
  'J': { label: '其他類', table: 'venues' },
};

function parseListingText(text) {
  const regionMatch = text.match(/[（(]([^）)]+區?)[）)]/);
  const region = regionMatch ? regionMatch[1] : null;

  const nameMatch = text.match(/[【\[]([^\]】]+)[】\]]/);
  const name = nameMatch ? nameMatch[1] : text.split('\n')[0].trim();

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const description = lines.slice(1).join(' ').trim() || null;

  const priceMatch = text.match(/(?:NT\.?\s*)?(\$?\d[\d,]*(?:~\d[\d,]*)?\s*元?)/);
  const priceInfo = priceMatch ? priceMatch[0] : null;

  return { name, region, description, priceInfo };
}

function guessCategory(text) {
  const keywords = {
    'A': ['課程', '教學', '工作坊'],
    'B': ['調理', '按摩', '推拿', '靈氣', '能量療'],
    'C': ['空間', '能量場'],
    'D': ['茶', '茶飲', '茶室', '奉茶'],
    'E': ['商品', '販售', '購買'],
    'F': ['諮詢', '占卜', '塔羅', '占星', '聊療'],
    'G': ['頌缽', '音療', '聲音'],
    'H': ['瑜伽', '瑜珈', '氣功'],
    'I': ['場地', '租借', '空間租'],
    'J': [],
  };
  for (const [cat, kws] of Object.entries(keywords)) {
    if (kws.some(kw => text.includes(kw))) return cat;
  }
  return 'J';
}

async function scrapePortalyMap(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    const maxScrolls = 20;
    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 500));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));

    const listings = await page.evaluate(() => {
      const results = [];

      const linkBlocks = document.querySelectorAll('a[href]');
      linkBlocks.forEach(el => {
        const text = el.textContent.trim();
        const href = el.href || '';
        if (text.includes('預約') && text.includes('【')) {
          results.push({
            text,
            url: href,
            type: 'booking',
          });
        }
      });

      const categoryBtns = [];
      document.querySelectorAll('a[href], button').forEach(el => {
        const text = el.textContent.trim();
        if (/^[A-J]\./.test(text)) {
          categoryBtns.push({ text, url: el.href || '' });
        }
      });

      return { listings: results, categories: categoryBtns };
    });

    const parsed = listings.listings.map(item => {
      const info = parseListingText(item.text);
      const category = guessCategory(item.text);
      return {
        ...info,
        bookingUrl: item.url,
        portalyCategory: category,
        table: PORTALY_CATEGORIES[category]?.table || 'venues',
        rawText: item.text,
      };
    });

    return {
      success: true,
      url,
      totalFound: parsed.length,
      categories: listings.categories,
      listings: parsed,
    };
  } catch (err) {
    return { success: false, url, error: err.message };
  } finally {
    await browser.close();
  }
}

module.exports = { scrapePortalyMap, parseListingText, guessCategory, PORTALY_CATEGORIES };
