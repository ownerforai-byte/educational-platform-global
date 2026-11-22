import { NextResponse } from "next/server";
import { FORMULA_SUBJECTS, getSubjectFormulaSheet } from "@/lib/formula-sheet";
import { getSubjectDerivationCounts } from "@/features/formulas/derivation-links";

export const dynamic = "force-dynamic";

/**
 * Compact formulas + derivations summary for the resources page tabs.
 *
 * Server-side only: the formula sheet reads the shipped note tree with
 * node:fs and the derivations bank is a large module — keeping both out of
 * the client bundle is exactly why this route exists (the resources page is
 * a client component and must not import either).
 */
export async function GET() {
  const subjects = [];
  for (const meta of FORMULA_SUBJECTS) {
    const sheet = await getSubjectFormulaSheet(meta.slug);
    if (!sheet) continue;
    const derivationCounts = getSubjectDerivationCounts(meta.slug);
    const units = [
      ...sheet.units,
      ...sheet.extras,
    ]
      .filter((u) => u.formulaCount > 0 || (derivationCounts.get(u.id)?.count ?? 0) > 0)
      .map((u) => ({
        id: u.id,
        title: u.title,
        formulaCount: u.formulaCount,
        derivationCount: derivationCounts.get(u.id)?.count ?? 0,
        solvedCount: derivationCounts.get(u.id)?.solvedCount ?? 0,
      }));
    subjects.push({
      slug: meta.slug,
      name: meta.name,
      emoji: meta.emoji,
      formulaCount: sheet.formulaCount,
      derivationCount: [...derivationCounts.values()].reduce((n, e) => n + e.count, 0),
      solvedCount: [...derivationCounts.values()].reduce((n, e) => n + e.solvedCount, 0),
      units,
    });
  }
  return NextResponse.json({ subjects });
}
