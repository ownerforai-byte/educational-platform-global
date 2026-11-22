import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

/* Print audit for the Physics XI chapter sheets: 794 × 1123, 12 cells, 3 × 4,
 * and no cell whose content is taller than the cell. */

const dir = "frontend/public/resources/physics-xi/chapters";
const files = fs
  .readdirSync(dir)
  .filter((name) => name.endsWith(".html") && name !== "index.html")
  .sort();

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch({ channel: "msedge" });
}

let bad = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const html = raw.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => {
    const css = path.join("frontend/public", href.replace(/^\//, ""));
    return `<style>${fs.readFileSync(css, "utf8")}</style>`;
  });
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.setContent(html, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.waitForTimeout(120);
  const report = await page.evaluate(() => {
    const cells = [...document.querySelectorAll(".cell")];
    const grid = document.querySelector(".grid");
    return {
      sheets: document.querySelectorAll(".sheet").length,
      cells: cells.length,
      cols: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0,
      rows: grid ? getComputedStyle(grid).gridTemplateRows.split(" ").length : 0,
      over: cells.filter((c) => c.scrollHeight > c.clientHeight + 1).length,
      wide: document.documentElement.scrollWidth - 794,
      first: document.querySelector(".cell .ans")?.textContent?.slice(0, 28) ?? "",
    };
  });
  const ok = report.cells === 12 && report.cols === 3 && report.rows === 4 && report.over === 0 && report.wide <= 0;
  if (!ok) bad += 1;
  console.log(
    `${file.padEnd(40)} ${report.sheets} sheet  ${report.cells} cells  ${report.cols}×${report.rows}  over ${report.over}  wide ${report.wide}  ${ok ? "ok" : "CHECK"}`,
  );
  await page.close();
}
console.log(bad === 0 ? "\nall physics sheets fit" : `\n${bad} sheets need attention`);
await browser.close();
process.exitCode = bad === 0 ? 0 : 1;
