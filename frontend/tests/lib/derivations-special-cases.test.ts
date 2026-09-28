import { describe, it, expect } from "vitest";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";
import { getSyllabusTheoremItems } from "@/lib/theorem-topics";

/**
 * Content guard for the conceptual-enrichment programme.
 *
 * `DerivationDetailView` renders a dedicated "Special Cases" tab (see
 * components/derivations/derivation-detail-view.tsx) and only shows that tab when
 * `specialCases` is a non-empty array. An entry with `specialCases: []`, a
 * half-written record, or wording duplicated from a sibling entry therefore
 * renders a tab that looks empty or teaches the same thing twice. These checks
 * keep every curated entry usable and stop the enrichment regressing silently.
 */
describe("curated special cases", () => {
  const entries = DERIVATIONS_AND_THEOREMS;

  it("has curated entries to check", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("every special case carries a name, condition, formula and meaning", () => {
    const incomplete: string[] = [];
    for (const d of entries) {
      for (const sc of d.specialCases ?? []) {
        if (!sc.name?.trim() || !sc.condition?.trim() || !sc.formula?.trim() || !sc.meaning?.trim()) {
          incomplete.push(`${d.id}: ${JSON.stringify(sc)}`);
        }
      }
    }
    expect(incomplete, `incomplete special cases: ${incomplete.join(" | ")}`).toEqual([]);
  });

  it("no entry repeats a special-case name within itself", () => {
    const dupes: string[] = [];
    for (const d of entries) {
      const seen = new Set<string>();
      for (const sc of d.specialCases ?? []) {
        const n = sc.name.trim().toLowerCase();
        if (seen.has(n)) dupes.push(`${d.id}: "${n}"`);
        seen.add(n);
      }
    }
    expect(dupes, `duplicate special-case names: ${dupes.join(", ")}`).toEqual([]);
  });

  it("no special case is copy-pasted across two entries", () => {
    // The same case reworded in two files reads as two different lessons to a
    // student; identical name + condition is a straight copy-paste.
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const d of entries) {
      for (const sc of d.specialCases ?? []) {
        const key = `${sc.name.trim().toLowerCase()}|${sc.condition.trim().toLowerCase()}`;
        const prev = seen.get(key);
        if (prev) dupes.push(`${prev} == ${d.id}`);
        else seen.set(key, d.id);
      }
    }
    expect(dupes, `cross-entry duplicates: ${dupes.join(", ")}`).toEqual([]);
  });

  it("special cases survive the syllabus merge with their formulas intact", () => {
    // theorem-topics.ts attaches the curated entry to its syllabus topic; prove
    // the tab still has data after that merge, not just on the raw array.
    const items = getSyllabusTheoremItems("class-11-notes", "chemistry");
    const curated = items.filter((i) => i.curated && (i.curated.specialCases?.length ?? 0) > 0);
    expect(curated.length).toBeGreaterThan(0);
    for (const item of curated) {
      for (const sc of item.curated!.specialCases ?? []) {
        expect(sc.formula.trim(), `${item.curated!.id} lost its formula`).not.toBe("");
      }
    }
  });

  /**
   * Full-coverage guarantee.
   *
   * The enrichment is complete: every one of the curated entries now carries a
   * `specialCases` array, so the "Special Cases" tab that
   * `DerivationDetailView` renders is never empty. This is deliberately a
   * strict equality on the whole set rather than a percentage floor — a new
   * entry added without cases should fail here, not slip through a threshold.
   */
  it("every curated entry is enriched", () => {
    const bare = entries
      .filter((d) => (d.specialCases?.length ?? 0) === 0)
      .map((d) => `${d.subject}/${d.id}`);
    expect(
      bare,
      `${bare.length} of ${entries.length} entries still have no special cases: ${bare.join(", ")}`,
    ).toEqual([]);
  });
});