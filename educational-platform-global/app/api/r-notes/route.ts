import { NextRequest, NextResponse } from "next/server";
import { loadData } from "@/lib/data-loader";

type ManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const subject = request.nextUrl.searchParams.get("subject");
  const chapter = request.nextUrl.searchParams.get("chapter");

  const manifest = await loadData<ManifestItem[]>("r-export/manifest.json");
  const filtered = manifest.filter((item) => {
    if (subject && item.subject !== subject) return false;
    if (chapter && item.chapter !== chapter) return false;
    return true;
  });

  return NextResponse.json(filtered);
}
