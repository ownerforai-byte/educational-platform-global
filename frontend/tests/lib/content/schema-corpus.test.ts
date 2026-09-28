/**
 * Corpus gate — the whole `content/ravikishan` concept tree against the strict
 * `ConceptNoteSchema`, with the baseline ratchet from
 * `scripts/content-schema-baseline.json` (files recorded as pre-existing
 * INVALID are allowed; anything NEW fails the suite).
 *
 * This is what makes `npm run test:run` (and therefore CI's frontend-test job)
 * enforce the content schema — the tsx CLI (`validate.ts --strict`) covers the
 * terminal, CI covers the merge.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { ConceptNoteSchema } from "@/lib/content/schema/concept";

/**
 * The gated corpus is the repo-root `content/ravikishan` tree — the same one
 * `scripts/content/validate.ts` assesses. Resolved explicitly (frontend/../..)
 * because a small app-side copy also exists at `frontend/content/ravikishan`
 * and must NOT be swept into this gate.
 */
function findCorpus(): string {
  const candidates = [
    join(process.cwd(), "..", "content", "ravikishan"),
    join(process.cwd(), "content", "ravikishan"),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  throw new Error("content/ravikishan corpus not found — run vitest from the frontend workspace");
}

const CORPUS = findCorpus();
const REPO = dirname(dirname(CORPUS)); // …/content/ravikishan → repo root

const PLACEHOLDER_MARKERS = ["class 11 concept", "key point 1", "key formula 1", "[insert", "placeholder — run content generation", "mindmap placeholder"];

function collect(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) collect(f, out);
    else if (e.name.endsWith(".json") && e.name !== "plan.json" && !e.name.startsWith("_")) out.push(f);
  }
  return out;
}

describe("concept corpus vs strict schema", () => {
  const files = collect(CORPUS).filter((f) =>
    /[/\\]class-\d+-notes[/\\][^/\\]+[/\\][^/\\]+[/\\]concepts[/\\]/.test(f),
  );

  it("finds the concept corpus", () => {
    expect(files.length).toBeGreaterThan(500);
  });

  it("every concept note parses clean against ConceptNoteSchema (beyond the baseline)", () => {
    const baselineRaw = JSON.parse(readFileSync(join(REPO, "scripts", "content-schema-baseline.json"), "utf8")) as {
      invalid?: string[];
    };
    const baselined = new Set(baselineRaw.invalid ?? []);

    const invalid: string[] = [];
    for (const file of files) {
      const rel = relative(REPO, file).replaceAll("\\", "/");
      const raw = readFileSync(file, "utf8");
      if (PLACEHOLDER_MARKERS.some((m) => raw.toLowerCase().includes(m))) continue; // generator stub
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        invalid.push(`${rel}: unparseable JSON`);
        continue;
      }
      const res = ConceptNoteSchema.safeParse(parsed);
      if (!res.success && !baselined.has(rel)) {
        invalid.push(`${rel}: ${res.error.issues.slice(0, 2).map((i) => `${i.path.join(".") || "(root)"} ${i.message}`).join("; ")}`);
      }
    }

    expect(
      invalid,
      `new schema violations beyond the ${baselined.size}-file baseline:\n${invalid.slice(0, 10).join("\n")}`,
    ).toEqual([]);
  });
});
