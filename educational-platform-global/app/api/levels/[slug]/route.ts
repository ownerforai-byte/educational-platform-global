import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: level, error: levelError } = await supabase
    .from("education_levels")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (levelError || !level) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("*")
    .eq("education_level_id", level.id)
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (classesError) {
    return NextResponse.json({ error: classesError.message }, { status: 500 });
  }

  return NextResponse.json({ level, classes: classes ?? [] });
}
