import { chromium } from 'playwright';
import path from 'node:path';

const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1100, height: 1300 }, deviceScaleFactor: 1 });

const shots = [
  ['frontend/public/resources/mathematics-xi/unit-04-vectors.html', '.qgrid', 'drill-row'],
  ['frontend/public/resources/mathematics-xi/unit-01-algebra.html', null, 'algebra-p1'],
  ['frontend/public/resources/physics-xi/unit-11-quantity-of-heat.html', null, 'phys-p1'],
];

for (const [doc, sel, name] of shots) {
  await page.goto('file:///' + path.resolve(doc).split('\\').join('/'));
  await page.waitForFunction(() => window.__a4 && window.__a4.pages > 0).catch(() => {});
  const target = sel ? page.locator(sel).first() : page.locator('.a4-page').first();
  await target.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.a4-preview2/${name}.png`, clip: await target.boundingBox() });
  console.log(name, 'shot');
}

await browser.close();
