/**
 * Offline study packs: a presentation of existing readers for one unit.
 *
 * Nothing is authored here. Concept notes + PYQs + drills come from the
 * pyq-bank reader, formulas from the formula-sheet reader, and unit matching
 * uses the syllabus-notes-manifest slug resolver. Output is a plain Markdown
 * file the student downloads in the browser (no server write).
 */

import type { SubjectPyqBank } from "@/lib/pyq-bank";
import type { FormulaSheetUnit } from "@/lib/formula-sheet";
import { resolveUnitSlug } from "@/lib/syllabus-notes-manifest";

export interface OfflinePack {
  title: string;
  /** Concept notes of the subject (the bank does not tag theory by unit). */
  theory: SubjectPyqBank["theory"];
  pyqs: Array<{ year: number; title: string; questions: SubjectPyqBank["pyqs"][number]["questions"] }>;
  drills: SubjectPyqBank["drills"];
  formulas: string[];
}

export function sameUnit(a: string, b: string): boolean {
  return resolveUnitSlug(a) === resolveUnitSlug(b);
}

/** Pure: slice a subject bank (and optional formula unit) down to one unit. */
export function buildUnitPack(
  title: string,
  unitId: string,
  bank: SubjectPyqBank,
  formulaUnit: FormulaSheetUnit | null,
): OfflinePack {
  const pyqs = bank.pyqs
    .filter((y) => y.units.some((u) => sameUnit(u, unitId)))
    .map((y) => ({ year: y.year, title: y.title, questions: y.questions }));
  return {
    title,
    theory: bank.theory,
    pyqs,
    drills: bank.drills.filter((d) => sameUnit(d.unit, unitId)),
    formulas: formulaUnit ? formulaUnit.topics.flatMap((t) => t.formulas) : [],
  };
}

export function packItemCount(pack: OfflinePack): number {
  return (
    pack.theory.length +
    pack.formulas.length +
    pack.drills.length +
    pack.pyqs.reduce((n, y) => n + y.questions.length, 0)
  );
}

export function packFilename(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return `${slug || "study-pack"}.md`;
}

export function packToMarkdown(pack: OfflinePack): string {
  const out: string[] = [`# ${pack.title}`, ""];
  if (pack.theory.length > 0) {
    out.push("## Concept notes", "");
    for (const t of pack.theory) {
      out.push(`### ${t.title}`, "");
      for (const n of t.notes) out.push(`- ${n}`);
      if (t.detail) out.push("", t.detail);
      out.push("");
    }
  }
  if (pack.formulas.length > 0) {
    out.push("## Formulas", "");
    for (const f of pack.formulas) out.push(`- ${f}`);
    out.push("");
  }
  if (pack.pyqs.length > 0) {
    out.push("## Past questions", "");
    for (const y of pack.pyqs) {
      out.push(`### ${y.title || y.year}`, "");
      y.questions.forEach((q, i) => {
        out.push(`${i + 1}. ${q.question}${q.marks != null ? ` [${q.marks}]` : ""}`);
        if (q.solution) out.push(`   - Answer: ${q.solution}`);
      });
      out.push("");
    }
  }
  if (pack.drills.length > 0) {
    out.push("## Concept drills", "");
    pack.drills.forEach((d, i) => {
      out.push(`${i + 1}. ${d.question}`);
      if (d.solution) out.push(`   - Answer: ${d.solution}`);
    });
    out.push("");
  }
  return out.join("\n");
}
