import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const roots = ['frontend/public/resources/physics-xi', 'frontend/public/resources/mathematics-xi', 'public/resources', 'frontend/public/materials'];
const skip = /_HUB\.html$|topics-mindmap|mathematics-xi\/(?:a4|chapters)\//;

const files = [];
for (const root of roots) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const rel = root + '/' + entry.name;
    if (skip.test(rel)) continue;
    files.push(rel);
  }
}
files.sort();

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });

let problems = 0;
let totalPages = 0;
const rows = [];

for (const file of files) {
  const errors = [];
  page.removeAllListeners('pageerror');
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('file:///' + path.resolve(file).split('\\').join('/'));
  await page.waitForFunction(() => window.__a4 && window.__a4.pages > 0, { timeout: 8000 }).catch(() => {});

  const r = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.a4-page')];
    const out = { pages: pages.length, overflow: [], width: [], orphan: [], tall: 0, noFoot: 0 };
    pages.forEach((p, i) => {
      const body = p.querySelector('.a4-page__body');
      if (!body) {
        out.noFoot++;
        return;
      }
      if (p.classList.contains('a4-page--tall')) out.tall++;
      if (body.scrollHeight > body.clientHeight + 1) out.overflow.push(i + 1);
      const w = p.getBoundingClientRect().width;
      if (Math.abs(w - 793.7) > 1.5) out.width.push(i + 1 + ':' + w.toFixed(0));
      const lastEl = body.lastElementChild;
      if (i < pages.length - 1 && lastEl && /^H[1-4]$/.test(lastEl.tagName)) out.orphan.push(i + 1);
      const foot = p.querySelector('.a4-page__foot-page');
      if (!foot || !/^page \d+ of \d+$/.test(foot.textContent.trim())) out.noFoot++;
    });
    return out;
  });

  totalPages += r.pages;
  const bad = r.overflow.length || r.width.length || r.orphan.length || r.noFoot || errors.length;
  if (bad) {
    problems++;
    rows.push([file, JSON.stringify({ ...r, err: errors[0] || null })]);
  }
}

for (const [file, info] of rows) console.log('PROBLEM', file, info);
console.log(`\n${files.length} documents · ${totalPages} pages · ${problems} with problems`);
await browser.close();
