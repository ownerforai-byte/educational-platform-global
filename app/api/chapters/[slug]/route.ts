import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: chapter, error: chapterError } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (chapterError || !chapter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: topics, error: topicsError } = await supabase
    .from("topics")
    .select("*")
    .eq("chapter_id", chapter.id)
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (topicsError) {
    return NextResponse.json({ error: topicsError.message }, { status: 500 });
  }

  const topicIds = (topics ?? []).map((t) => t.id);
  let completed = 0;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && topicIds.length > 0) {
      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .in("topic_id", topicIds)
        .eq("completed", true);
      completed = count ?? 0;
    }
  } catch {
    // ignore
  }

  return NextResponse.json({
    chapter,
    topics: topics ?? [],
    progress: { completed, total: topicIds.length },
  });
}
