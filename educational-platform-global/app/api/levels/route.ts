import { createClient } from "@/lib/db/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("education_levels")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
