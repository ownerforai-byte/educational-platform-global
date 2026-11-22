import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [, , target, out] = process.argv;
if (!target || !out) {
  console.error("usage: node .a4-preview/shot-paper.mjs <paper.html> <out.png> [which]");
  process.exit(1);
}

const raw = fs
  .readFileSync(target, "utf8")
  .replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => {
    const css = fs.readFileSync(path.join("frontend/public", href.replace(/^\//, "")), "utf8");
    return `<style>${css}</style>`;
  });

const PAGE_W = 688; // 210mm − 2×14mm at 96 dpi
const PAGE_H = 1013; // 297mm − 29mm of margins at 96 dpi

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch({ channel: "msedge" });
}
const page = await browser.newPage({ viewport: { width: PAGE_W, height: PAGE_H } });
await page.setContent(raw, { waitUntil: "load" });
await page.emulateMedia({ media: "print" });

const report = await page.evaluate(
  ([pageH]) => {
    const papers = [...document.querySelectorAll(".paper")];
    return papers.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        h: Math.round(r.height),
        printedPages: Math.ceil(r.height / pageH),
        overflowX: el.scrollWidth - el.clientWidth,
      };
    });
  },
  [PAGE_H],
);
console.log(JSON.stringify(report));

const papers = await page.$$(".paper");
const which = Number(process.argv[4] ?? 0);
const target0 = papers[which] ?? papers[0];
await target0.screenshot({ path: out });
await browser.close();
