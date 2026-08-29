import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: cls, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (classError || !cls) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: subjects, error: subjectsError } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", cls.id)
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (subjectsError) {
    return NextResponse.json({ error: subjectsError.message }, { status: 500 });
  }

  return NextResponse.json({ class: cls, subjects: subjects ?? [] });
}
