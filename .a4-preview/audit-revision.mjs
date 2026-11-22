import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

/* Print audit for the revision papers: each document must be exactly two A4
 * pages, with the two-column question flow and the answer key both fitting. */

const dir = "frontend/public/resources/mathematics-xi/chapters/revision";
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

const PAGE_W = 794;
const PAGE_H = 1013;
let bad = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const inline = raw.replace(
    /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
    (_, href) => {
      const css = path.join("frontend/public", href.replace(/^\//, ""));
      return `<style>${fs.readFileSync(css, "utf8")}</style>`;
    },
  );
  const page = await browser.newPage({ viewport: { width: PAGE_W, height: PAGE_H } });
  await page.setContent(inline, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.waitForTimeout(120);

  const report = await page.evaluate(() => {
    const sheets = [...document.querySelectorAll(".sheet")];
    return {
      sheets: sheets.length,
      overflow: sheets.map((s) => ({
        h: Math.round(s.getBoundingClientRect().height),
        over: s.scrollHeight - s.clientHeight > 2,
      })),
      columns: [...document.querySelectorAll(".paper")].map(
        (p) => getComputedStyle(p).columnCount,
      ),
      slack: [...document.querySelectorAll(".paper")].map((p) => {
        const foot = p.closest(".sheet").querySelector(".foot");
        return Math.round(foot.getBoundingClientRect().top - p.getBoundingClientRect().bottom);
      }),
      clipped: [...document.querySelectorAll(".paper")].filter(
        (p) => p.scrollHeight - p.clientHeight > 2 || p.scrollWidth - p.clientWidth > 2,
      ).length,
      extraCols: [...document.querySelectorAll(".paper")].map(
        (p) => p.scrollWidth - p.clientWidth,
      ),
      questions: document.querySelectorAll(".paper:not(.answers) .rq").length,
      answers: document.querySelectorAll(".paper.answers .rq").length,
      wide: document.documentElement.scrollWidth - 794,
    };
  });

  const fitted =
    report.sheets === 2 &&
    report.overflow.every((row) => !row.over) &&
    report.wide <= 0 &&
    report.clipped === 0 &&
    report.slack.every((gap) => gap > 0);
  if (!fitted) bad += 1;
  console.log(
    `${file.padEnd(28)} ${report.sheets} pages  Q${report.questions}/A${report.answers}  ` +
      `heights ${report.overflow.map((row) => row.h).join("/")}  ` +
      `cols ${report.columns.join(",")}  slack ${report.slack.join("/")}px  colOver ${report.extraCols.join("/")}  ` +
      `${fitted ? "ok" : "OVERFLOW"}`,
  );
  await page.close();
}

console.log(bad === 0 ? "\nall revision papers fit two pages" : `\n${bad} papers need attention`);
await browser.close();
process.exitCode = bad === 0 ? 0 : 1;
