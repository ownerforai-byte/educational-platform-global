import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const dir = "frontend/public/resources/mathematics-xi/chapters/hard";
const files = fs.readdirSync(dir).filter((n) => n.endsWith(".html") && n !== "index.html").sort();

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch({ channel: "msedge" });
}
const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

let bad = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8").replace(
    /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
    (_, href) => `<style>${fs.readFileSync(path.join("frontend/public", href.replace(/^\//, "")), "utf8")}</style>`,
  );
  await page.setContent(raw, { waitUntil: "load" });
  const report = await page.evaluate(() => {
    const sheet = document.querySelector(".sheet");
    const cells = [...document.querySelectorAll(".cell")];
    cells.forEach((c) => (c.style.overflow = "visible"));
    const over = cells
      .map((c, i) => ({ i: i + 1, over: c.scrollHeight - c.clientHeight }))
      .filter((x) => x.over > 1);
    return {
      sheets: document.querySelectorAll(".sheet").length,
      cells: cells.length,
      size: sheet ? [Math.round(sheet.getBoundingClientRect().width), Math.round(sheet.getBoundingClientRect().height)] : null,
      over,
    };
  });
  if (report.over.length || report.cells !== 6) bad++;
  console.log(
    file.padEnd(32),
    `${report.cells} cells`,
    `${report.size?.[0]}×${report.size?.[1]}px`,
    report.over.length ? "OVERFLOW " + JSON.stringify(report.over) : "ok",
  );
}
await browser.close();
console.log(bad === 0 ? "\nall hard sheets fit" : `\n${bad} sheets need attention`);
