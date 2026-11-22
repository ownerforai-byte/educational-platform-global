/**
 * derivation-links — connects the formula sheets to the curated derivations.
 *
 * The formula sheet (`formula-sheet.ts`) lists every formula per syllabus
 * unit; the derivations bank (`features/derivations/derivations-data.ts`)
 * carries the full NEB-style derivation for many of those same units, each
 * with proof steps, exam traps and difficult board-style solved problems.
 *
 * Both registries key their units by the SAME canonical syllabus unit id
 * (`lib/core/syllabus.ts`), so the join is a straight subject + unitId match —
 * no fuzzy title matching needed. Pure module (no fs), safe to import from
 * server components and route handlers.
 */

import { DERIVATIONS_AND_THEOREMS, type DerivationOrTheorem } from "@/features/derivations/derivations-data";
import type { FormulaSubjectSlug } from "@/features/formulas/formula-sheet";

/** One derivation offered from a formula unit page. */
export interface UnitDerivationLink {
  slug: string;
  title: string;
  /** LaTeX core formula, rendered with MathMarkdown on the page. */
  coreFormula: string;
  /** One-line statement of what is derived. */
  statement: string;
  /** Number of board-style solved problems attached. */
  solvedCount: number;
  /** Distinct exam badges across the solved problems (e.g. "NEB 2080 Board"). */
  examBadges: string[];
  /** True when limiting/edge cases (Special Cases) exist. */
  hasSpecialCases: boolean;
  /** Route to the full derivation page. */
  href: string;
}

const DERIVATION_SUBJECTS = new Set<FormulaSubjectSlug>(["physics", "mathematics", "chemistry"]);

function toLink(derivation: DerivationOrTheorem, classSlug = "class-11"): UnitDerivationLink {
  const badges: string[] = [];
  for (const problem of derivation.solvedProblems ?? []) {
    if (problem.examBadge && !badges.includes(problem.examBadge)) badges.push(problem.examBadge);
  }
  return {
    slug: derivation.slug,
    title: derivation.title,
    coreFormula: derivation.coreFormula,
    statement: derivation.statement,
    solvedCount: (derivation.solvedProblems ?? []).length,
    examBadges: badges.slice(0, 3),
    hasSpecialCases: (derivation.specialCases?.length ?? 0) > 0,
    href: `/derivations/${classSlug}/${derivation.subject}/${derivation.slug}`,
  };
}

/**
 * Every curated grade-11 derivation for one formula-sheet unit, in the order
 * they appear in the derivations bank (which follows the syllabus walk).
 */
export function getUnitDerivationLinks(
  subjectSlug: string,
  unitId: string,
): UnitDerivationLink[] {
  if (!DERIVATION_SUBJECTS.has(subjectSlug as FormulaSubjectSlug)) return [];
  return DERIVATIONS_AND_THEOREMS.filter(
    (d) =>
      d.gradeTrack === "grade-11" &&
      !d.isExtra &&
      d.subject === subjectSlug &&
      d.unitId === unitId,
  ).map((d) => toLink(d));
}

/** Derivation count for one unit (cheap sibling of `getUnitDerivationLinks`). */
export function countUnitDerivations(subjectSlug: string, unitId: string): number {
  if (!DERIVATION_SUBJECTS.has(subjectSlug as FormulaSubjectSlug)) return 0;
  return DERIVATIONS_AND_THEOREMS.filter(
    (d) =>
      d.gradeTrack === "grade-11" &&
      !d.isExtra &&
      d.subject === subjectSlug &&
      d.unitId === unitId,
  ).length;
}

/** Per-unit derivation counts for a whole subject (for the subject page chips). */
export function getSubjectDerivationCounts(
  subjectSlug: string,
): Map<string, { count: number; solvedCount: number }> {
  const map = new Map<string, { count: number; solvedCount: number }>();
  if (!DERIVATION_SUBJECTS.has(subjectSlug as FormulaSubjectSlug)) return map;
  for (const d of DERIVATIONS_AND_THEOREMS) {
    if (d.gradeTrack !== "grade-11" || d.isExtra || d.subject !== subjectSlug) continue;
    const entry = map.get(d.unitId) ?? { count: 0, solvedCount: 0 };
    entry.count += 1;
    entry.solvedCount += (d.solvedProblems ?? []).length;
    map.set(d.unitId, entry);
  }
  return map;
}
