import { NextRequest, NextResponse } from "next/server";
import { loadData } from "@/lib/data-loader";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const rel = request.nextUrl.searchParams.get("path");
  if (!rel) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const safe = rel.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^(\.\.\/)+/, "");

  const index = await loadData<Record<string, unknown>>("ravikishan/_index.json");
  const data = index[safe];
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
