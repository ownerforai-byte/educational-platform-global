import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: topic, error: topicError } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (topicError || !topic) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: resources, error: resourcesError } = await supabase
    .from("resources")
    .select("*")
    .eq("topic_id", topic.id)
    .eq("is_published", true)
    .order("type", { ascending: true });

  if (resourcesError) {
    return NextResponse.json({ error: resourcesError.message }, { status: 500 });
  }

  return NextResponse.json({ topic, resources: resources ?? [] });
}
