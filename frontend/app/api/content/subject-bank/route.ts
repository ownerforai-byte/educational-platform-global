import { NextRequest, NextResponse } from "next/server";
import { getSubjectPyqBank } from "@/lib/pyq-bank";

export const dynamic = "force-dynamic";

/**
 * GET /api/content/subject-bank?classSlug=<slug>&subjectSlug=<slug>
 *
 * Server-side wrapper around `getSubjectPyqBank()` so the hook can call it
 * from a client component without importing the server-only lib directly.
 *
 * Auth note: `getSubjectPyqBank` reads from `content/_index.json` and
 * `content/manifest.json` — files that are already served publicly in the
 * current static layout. No extra auth is added here; the caller is
 * responsible for ensuring users have appropriate access to the page that
 * triggers this request. The PYQ bank itself will be fully gated when Commit 2
 * removes the static files.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const classSlug = searchParams.get("classSlug") ?? "";
  const subjectSlug = searchParams.get("subjectSlug") ?? "";

  if (!classSlug || !subjectSlug) {
    return NextResponse.json(
      { error: "classSlug and subjectSlug query params are required" },
      { status: 400 },
    );
  }

  try {
    const bank = await getSubjectPyqBank(classSlug, subjectSlug);
    return NextResponse.json(bank);
  } catch (err: unknown) {
    const e = err as Error;
    console.error("[subject-bank] failed to load bank:", e?.message ?? e);
    return NextResponse.json({ error: "Failed to load subject bank" }, { status: 500 });
  }
}
