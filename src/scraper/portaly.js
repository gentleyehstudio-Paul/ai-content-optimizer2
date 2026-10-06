const puppeteer = require('puppeteer-core');

async function scrapePortaly(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/opt/pw-browsers/chromium/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForSelector('body', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));

    const data = await page.evaluate(() => {
      const getText = (sel) => {
        const el = document.querySelector(sel);
        return el ? el.textContent.trim() : '';
      };

      const getImg = (sel) => {
        const el = document.querySelector(sel);
        return el ? (el.src || el.getAttribute('src') || '') : '';
      };

      const profileName = getText('[class*="profile"] [class*="name"], h1, [class*="displayName"]')
        || getText('[class*="header"] h1, [class*="title"]');

      const profileBio = getText('[class*="profile"] [class*="bio"], [class*="description"]');
      const profileImage = getImg('[class*="profile"] img, [class*="avatar"] img');

      const links = [];
      const linkElements = document.querySelectorAll(
        'a[class*="link"], [class*="link-item"] a, [class*="block"] a[href]'
      );
      linkElements.forEach(el => {
        const href = el.href || '';
        const title = el.textContent.trim();
        if (href && title && !href.startsWith('javascript:')) {
          links.push({ title, url: href });
        }
      });

      if (links.length === 0) {
        document.querySelectorAll('a[href]').forEach(el => {
          const href = el.href || '';
          const title = el.textContent.trim();
          if (href && title && title.length > 1
            && !href.includes('portaly.cc')
            && !href.startsWith('javascript:')
            && !href.startsWith('#')) {
            links.push({ title, url: href });
          }
        });
      }

      return { profileName, profileBio, profileImage, links };
    });

    return { success: true, url, ...data };
  } catch (err) {
    return { success: false, url, error: err.message };
  } finally {
    await browser.close();
  }
}

module.exports = { scrapePortaly };
