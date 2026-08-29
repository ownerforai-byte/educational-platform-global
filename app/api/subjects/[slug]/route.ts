import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (subjectError || !subject) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", subject.id)
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (chaptersError) {
    return NextResponse.json({ error: chaptersError.message }, { status: 500 });
  }

  return NextResponse.json({ subject, chapters: chapters ?? [] });
}
