import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * NEB guidance-family integrity gate (pyq-links / blueprint / mistakes).
 *
 * These three families are loaded by the guidance component
 * (`components/content/neb-guidance.tsx`) through per-file reads mirrored to
 * `public/data/content/…` by `scripts/pyq-register.mjs`. The failure mode
 * this file guards against is the classic silent-empty one: a family authored
 * on disk but never mirrored/registered renders as "not authored yet" with no
 * error anywhere.
 *
 * Invariants locked here:
 *  1. every class × subject has all three files on disk under `content/`;
 *  2. every metadata file is mirrored byte-for-byte into `public/data/content`;
 *  3. every metadata file is registered as a key in `content/_index.json`;
 *  4. pyq-links entries stay `rights: "link-only"` with https URLs (NEB papers
 *     are ⚠️ — paper text must never enter the repo);
 *  5. mistakes carry wrong/why/fix and a real syllabus unit slug.
 */

const ROOT = join(process.cwd(), "..");
const SUBJECTS = ["physics", "chemistry", "biology", "mathematics", "english", "nepali"] as const;
const CLASSES = ["class-11", "class-12"] as const;
const FAMILIES = ["practice/pyq-links", "practice/blueprint", "practice/mistakes"] as const;

const index = JSON.parse(
  readFileSync(join(ROOT, "content", "_index.json"), "utf8"),
) as Record<string, unknown>;

function contentPath(family: string, cls: string, subject: string): string {
  return join(ROOT, "content", family, cls, `${subject}.json`);
}

function publicPath(family: string, cls: string, subject: string): string {
  return join(ROOT, "frontend", "public", "data", "content", family, cls, `${subject}.json`);
}

describe("NEB guidance families — every class × subject authored", () => {
  for (const family of FAMILIES) {
    it.each(CLASSES)(`${family}: all 6 subjects present for %s`, (cls) => {
      for (const subject of SUBJECTS) {
        expect(existsSync(contentPath(family, cls, subject)), `${family}/${cls}/${subject}`).toBe(
          true,
        );
      }
    });
  }
});

describe("NEB guidance families — mirrored and registered", () => {
  it.each([...FAMILIES].flatMap((family) => CLASSES.map((cls) => ({ family, cls }))))(
    "$family/$cls: mirrors + index keys for all 6 subjects",
    ({ family, cls }) => {
      for (const subject of SUBJECTS) {
        const source = readFileSync(contentPath(family, cls, subject), "utf8");
        const mirrorPath = publicPath(family, cls, subject);
        expect(existsSync(mirrorPath), `mirror missing: ${family}/${cls}/${subject}`).toBe(true);
        // Byte-stable comparison ignores line endings (mirrors are CRLF).
        const mirror = readFileSync(mirrorPath, "utf8");
        expect(mirror.replace(/\r\n/g, "\n")).toBe(source.replace(/\r\n/g, "\n"));
        const key = `${family}/${cls}/${subject}.json`;
        expect(index[key], `index key missing: ${key}`).toBeTruthy();
      }
    },
  );
});

describe("pyq-links — link-only rights gate", () => {
  it.each(CLASSES)("every entry is link-only with an https URL (%s)", (cls) => {
    for (const subject of SUBJECTS) {
      const file = JSON.parse(readFileSync(contentPath("practice/pyq-links", cls, subject), "utf8")) as {
        papers?: Array<{ url?: string; rights?: string; provider?: string; title?: string }>;
      };
      expect(file.papers?.length ?? 0).toBeGreaterThan(0);
      for (const paper of file.papers ?? []) {
        expect(paper.rights).toBe("link-only");
        expect(paper.url).toMatch(/^https:\/\//);
        expect(paper.provider).toBeTruthy();
        expect(paper.title).toBeTruthy();
        // No question text may ride along in a link-only entry.
        expect(paper).not.toHaveProperty("questions");
      }
    }
  });
});

describe("mistakes — wrong/why/fix with real unit slugs", () => {
  const syllabusSrc = readFileSync(join(ROOT, "frontend", "lib", "syllabus.ts"), "utf8");
  const knownUnits = new Set(syllabusSrc.match(/id: "[a-z0-9-]+"/g)?.map((s) => s.slice(5, -1)) ?? []);

  it.each(CLASSES)("every mistake has wrong/why/fix and a syllabus unit (%s)", (cls) => {
    for (const subject of SUBJECTS) {
      const file = JSON.parse(readFileSync(contentPath("practice/mistakes", cls, subject), "utf8")) as {
        examHall?: string[];
        mistakes?: Array<{ id?: string; wrong?: string; why?: string; fix?: string; unit?: string }>;
      };
      expect(file.examHall?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(file.mistakes?.length ?? 0).toBeGreaterThanOrEqual(8);
      for (const m of file.mistakes ?? []) {
        expect(m.wrong, `${cls}/${subject}/${m.id}: wrong`).toBeTruthy();
        expect(m.why, `${cls}/${subject}/${m.id}: why`).toBeTruthy();
        expect(m.fix, `${cls}/${subject}/${m.id}: fix`).toBeTruthy();
        expect(knownUnits.has(m.unit ?? ""), `${cls}/${subject}/${m.id}: unit "${m.unit}" not in syllabus`).toBe(true);
      }
    }
  });
});

describe("blueprint — structural metadata only", () => {
  it.each(CLASSES)("units carry concepts; unverified numbers stay flagged (%s)", (cls) => {
    for (const subject of SUBJECTS) {
      const file = JSON.parse(readFileSync(contentPath("practice/blueprint", cls, subject), "utf8")) as {
        units?: Array<{ unit?: string; concepts?: string[]; verified?: boolean; marksEstimate?: number }>;
      };
      expect(file.units?.length ?? 0).toBeGreaterThan(0);
      for (const u of file.units ?? []) {
        expect(u.unit).toBeTruthy();
        expect(u.concepts?.length ?? 0).toBeGreaterThan(0);
        // Marks estimates derived from hours (not read off a grid) must stay
        // flagged unverified — no invented CDC numbers.
        if (typeof u.marksEstimate === "number" && !u.verified) {
          expect(u.verified).toBe(false);
        }
      }
    }
  });
});
