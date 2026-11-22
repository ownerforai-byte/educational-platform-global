import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The static study documents under public/resources are served straight from
 * disk, so their renderer is a4-document.css plus a4-paginate.js. These are the
 * contract tests for that pairing: one A4 page definition, one paginator, every
 * paper document wired to both, and the three-per-row solved drill present in
 * each Mathematics XI unit.
 */

const ROOT = process.cwd().endsWith("frontend") ? process.cwd() : join(process.cwd(), "frontend");
const REPO = join(ROOT, "..");

const SHEET = "public/resources/a4-document.css";
const PAGER = "public/resources/a4-paginate.js";

/** Every tree a paper document lives in, as [base, subdir] pairs. */
const docsTrees: Array<[string, string]> = [
  [ROOT, "public/resources/physics-xi"],
  [ROOT, "public/resources/mathematics-xi"],
  [ROOT, "public/materials"],
  [REPO, "public/resources"],
  [REPO, "public/resources/physics-xi"],
];

const SKIP = /(?:CHEMISTRY|STUDY)_HUB\.html$|topics-mindmap|mathematics-xi\/(?:a4|chapters)\//;

const LANGUAGE_NOTES = ["WRITING_HUB.html", "NEPALI_HUB.html"]; // English and Nepali

const papers: Array<[string, string]> = []; // [base, rel]
for (const [base, dir] of docsTrees) {
  const abs = join(base, dir);
  if (!existsSync(abs)) continue;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const rel = `${dir}/${entry.name}`;
    if (SKIP.test(rel)) continue;
    papers.push([base, rel]);
  }
}

const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");
const readFrom = (base: string, rel: string) => readFileSync(join(base, rel), "utf8");

describe("A4 paged documents", () => {
  it("defines one real A4 page, portrait, with printer margins", () => {
    const css = read(SHEET);

    expect(css).toMatch(/@page\s*\{[^}]*size:\s*A4/);
    expect(css).toMatch(/--page-width:\s*210mm/);
    expect(css).toMatch(/--page-height:\s*297mm/);
    // the screen sheet must use the same margins the printer leaves
    expect(css).toMatch(/--page-pad-x:\s*18mm/);
    expect(css).toMatch(/--page-pad-top:\s*20mm/);
    expect(css).toMatch(/--page-pad-bottom:\s*14mm/);
  });

  it("keeps the report type small and the page components complete", () => {
    const css = read(SHEET);

    // small letters: body sits below 10pt, worked algebra smaller still
    const body = css.match(/body\s*\{[^}]*font-size:\s*([\d.]+)pt/);
    expect(body, "body font-size must be declared in pt").not.toBeNull();
    expect(Number(body![1])).toBeLessThan(10);

    for (const part of [".a4-page", ".a4-page__head", ".a4-page__body", ".a4-page__foot"]) {
      expect(css, `missing ${part}`).toContain(`${part} {`);
    }

    // print must not add its own margins on top of the sheet's own
    expect(css).toMatch(/@media print[\s\S]*\.a4-page\s*\{[^}]*width:\s*210mm/);
    expect(css).toMatch(/@media print[\s\S]*break-after:\s*page/);
    // narrow screens drop the sheet instead of forcing a sideways scroll
    expect(css).toMatch(/@media screen and \(max-width: 820px\)/);
  });

  it("ships a paginator that can split tables and wrappers and never lose content", () => {
    const js = read(PAGER);

    expect(js).toContain("function splitTable");
    expect(js).toContain("function splitWrapper");
    expect(js).toContain("function carryHeading");
    // a failure must restore the document rather than clip it
    expect(js).toContain("document.body.innerHTML = snapshot");
    // page numbering
    expect(js).toContain('"page " + (p + 1) + " of "');
  });

  it("mirrors the sheet and the paginator into the published tree byte for byte", () => {
    const pairs: Array<[string, string]> = [
      ["public/resources/a4-document.css", "public/resources/a4-document.css"],
      ["public/resources/a4-paginate.js", "public/resources/a4-paginate.js"],
    ];

    for (const [authored, published] of pairs) {
      const live = join(REPO, published);
      if (!existsSync(live)) continue;
      expect(readFileSync(live, "utf8"), `${published} mirror is stale`).toBe(
        readFrom(ROOT, authored),
      );
    }
  });

  it("wires every paper document to the sheet and the paginator", () => {
    expect(papers.length).toBeGreaterThan(150);

    const broken: string[] = [];
    for (const [base, doc] of papers) {
      const html = readFrom(base, doc);
      if (!/a4-document\.css|physics-xi-solutions\.css|math-xi-solutions\.css|language-notes\.css/.test(html)) {
        broken.push(`${doc}: no A4 sheet`);
      }
      if (!/a4-paginate\.js/.test(html)) broken.push(`${doc}: no paginator`);
    }

    expect(broken, `documents not on the A4 page contract:\n${broken.slice(0, 12).join("\n")}`).toEqual([]);
  });

  it("renders the English and Nepali notes as paper, not as the old dark tab apps", () => {
    const css = read("public/materials/language-notes.css");
    expect(css).toContain('@import url("../resources/a4-document.css")');
    // the sheet keeps page geometry; this file must never redefine it
    expect(css).not.toMatch(/@page\s*\{/);
    expect(css).not.toMatch(/--page-height/);
    expect(css).toContain("#app {");

    const problems: string[] = [];
    for (const name of LANGUAGE_NOTES) {
      const rel = `public/materials/${name}`;
      const html = read(rel);

      if (!html.includes('data-paper="language-notes"')) problems.push(`${name}: not paperized`);
      if (!html.includes("language-notes.css")) problems.push(`${name}: no paper stylesheet`);
      if (!html.includes("a4-paginate.js")) problems.push(`${name}: no paginator`);
      if (/<nav>/.test(html)) problems.push(`${name}: sidebar still present`);
      if (/<script(?![^>]*a4-paginate)/.test(html)) problems.push(`${name}: app scripts still present`);
      if (/on(?:click|input|change)=/.test(html)) problems.push(`${name}: inline handlers still present`);
      if (!/class="notation-toc"/.test(html)) problems.push(`${name}: no printed contents list`);
      if (/<details(?!\s+open)/.test(html)) problems.push(`${name}: collapsed <details> on paper`);
      // the old dark palette must not survive into the paper document
      for (const dark of ["#0a0e17", "#0f1420", "#1d2740", "#cdd6e8", "#8ea0c0"]) {
        if (html.includes(dark)) problems.push(`${name}: dark colour ${dark} left in`);
      }
    }

    expect(problems, problems.join("\n")).toEqual([]);
  });

  it("lays the Mathematics XI rapid drill out as three solved questions in one row", () => {
    const dir = join(ROOT, "public/resources/mathematics-xi");
    const units = readdirSync(dir).filter((f) => /^unit-0\d-.*\.html$/.test(f));
    expect(units.length).toBe(7);

    const problems: string[] = [];
    for (const unit of units) {
      const html = read(`public/resources/mathematics-xi/${unit}`);
      const grid = html.match(/<div class="qgrid">[\s\S]*?(?=<h2|<\/body>)/);
      if (!grid) {
        problems.push(`${unit}: no .qgrid drill`);
        continue;
      }
      const cells = grid[0].match(/<div class="cell">/g) ?? [];
      if (cells.length !== 3) problems.push(`${unit}: ${cells.length} cells, expected 3`);
      const answers = grid[0].match(/<p class="ans">/g) ?? [];
      if (answers.length !== 3) problems.push(`${unit}: ${answers.length} answers, expected 3`);
      if (!/class="work"/.test(grid[0])) problems.push(`${unit}: drill has no working`);
      if (!/class="mk"/.test(grid[0])) problems.push(`${unit}: drill has no mark values`);
    }

    expect(problems, problems.join("\n")).toEqual([]);
  });
});
