import { NextResponse } from "next/server";
import { getUnitFormulaSheet, isFormulaSubjectSlug } from "@/lib/formula-sheet";

export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://rn01.onrender.com";

/**
 * Formula bodies are paid content: the caller must present the session plus the
 * spark-unlock grant (`X-Unlock-Grant`) and the unlock key (`X-Unlock-Key`).
 * The backend (POST /api/content/verify) is the authority; anything but a 200
 * from it yields an EMPTY 403 (no JSON, no preview), and the sheet is not read.
 */
async function isUnlocked(request: Request): Promise<boolean> {
  const grant = request.headers.get("x-unlock-grant");
  const moduleKey = request.headers.get("x-unlock-key");
  if (!grant || !moduleKey) return false;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Unlock-Grant": grant,
  };
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");
  if (cookie) headers.Cookie = cookie;
  if (authorization) headers.Authorization = authorization;
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/verify`, {
      method: "POST",
      headers,
      body: JSON.stringify({ moduleKey }),
      cache: "no-store",
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

/** Server-side read of one unit's formula sheet (keeps node:fs out of client chunks). */
export async function GET(request: Request) {
  if (!(await isUnlocked(request))) {
    return new Response(null, { status: 403, headers: { "Cache-Control": "private, no-store" } });
  }
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject") ?? "";
  const unit = searchParams.get("unit") ?? "";
  if (!isFormulaSubjectSlug(subject) || !unit) {
    return NextResponse.json({ unit: null }, { status: 404 });
  }
  const result = await getUnitFormulaSheet(subject, unit);
  return NextResponse.json({ unit: result?.unit ?? null }, { headers: { "Cache-Control": "private, no-store" } });
}
