import { chromium } from 'playwright';
import path from 'node:path';

const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const docs = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

for (const doc of docs) {
  const errors = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  const url = 'file:///' + path.resolve(doc).split('\\').join('/');
  await page.goto(url);
  await page.waitForFunction(() => window.__a4 && window.__a4.pages > 0, { timeout: 15000 }).catch(() => {});

  const stats = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.a4-page')];
    let overflow = 0;
    const bad = [];
    pages.forEach((p, i) => {
      const body = p.querySelector('.a4-page__body');
      if (body.scrollHeight > body.clientHeight + 1) {
        overflow++;
        bad.push(i + 1);
      }
      const r = p.getBoundingClientRect();
      if (Math.abs(r.width - 793.7) > 1.5) bad.push('w' + (i + 1) + ':' + r.width.toFixed(1));
    });
    return {
      pages: pages.length,
      overflow,
      bad: bad.slice(0, 5),
      heights: pages.slice(0, 3).map((p) => Math.round(p.getBoundingClientRect().height)),
      foot: pages[0]?.querySelector('.a4-page__foot-page')?.textContent || '',
      head: pages[1]?.querySelector('.a4-page__head span')?.textContent || '',
    };
  });

  console.log(
    doc.split('/').slice(-1)[0].slice(0, 56).padEnd(58),
    JSON.stringify(stats),
    errors.length ? 'ERR ' + errors[0].slice(0, 130) : '',
  );
}

await browser.close();
