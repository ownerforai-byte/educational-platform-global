import { NextResponse } from "next/server";
import { getUnitFormulaSheet, isFormulaSubjectSlug } from "@/lib/formula-sheet";

export const dynamic = "force-dynamic";

/** Server-side read of one unit's formula sheet (keeps node:fs out of client chunks). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject") ?? "";
  const unit = searchParams.get("unit") ?? "";
  if (!isFormulaSubjectSlug(subject) || !unit) {
    return NextResponse.json({ unit: null }, { status: 404 });
  }
  const result = await getUnitFormulaSheet(subject, unit);
  return NextResponse.json({ unit: result?.unit ?? null });
}
