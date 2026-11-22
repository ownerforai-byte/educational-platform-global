import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ?? "frontend/public/resources/mathematics-xi/chapters/limits.html";
const out = process.argv[3] ?? ".a4-preview/math-xi-chapter-limits.png";

const html = fs.readFileSync(target, "utf8").replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => {
  const file = path.join("frontend/public", href.replace(/^\//, ""));
  return `<style>${fs.readFileSync(file, "utf8")}</style>`;
});

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch({ channel: "msedge" });
}
const page = await browser.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: out, fullPage: true });

const report = await page.evaluate(() => {
  const sheet = document.querySelector(".sheet");
  const grid = document.querySelector(".grid");
  const q = document.querySelector(".cell .q");
  const work = document.querySelector(".work");
  const ans = document.querySelector(".ans");
  const cells = [...document.querySelectorAll(".cell")];
  const px = (el) => (el ? getComputedStyle(el) : null);
  return {
    sheets: document.querySelectorAll(".sheet").length,
    cells: cells.length,
    sheetPx: sheet
      ? {
          w: Math.round(sheet.getBoundingClientRect().width),
          h: Math.round(sheet.getBoundingClientRect().height),
        }
      : null,
    gridColumns: grid ? px(grid).gridTemplateColumns.split(" ").length : 0,
    gridRows: grid ? px(grid).gridTemplateRows.split(" ").length : 0,
    questionFontPx: q ? px(q).fontSize : null,
    workFontPx: work ? px(work).fontSize : null,
    answerFontPx: ans ? px(ans).fontSize : null,
    overflowingCells: cells.filter((c) => c.scrollHeight > c.clientHeight + 1).length,
    cellClientHeight: cells[0] ? cells[0].clientHeight : 0,
    tallestCellScroll: cells.length ? Math.max(...cells.map((c) => c.scrollHeight)) : 0,
    firstAnswer: ans ? ans.textContent : null,
  };
});
console.log(JSON.stringify(report, null, 2));
await browser.close();
