import { createClient } from "@/lib/db/server";

export type SettingValue = string | number | boolean | Record<string, unknown> | null;

export async function getSetting(key: string): Promise<SettingValue> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) {
    return null;
  }

  return data.value as SettingValue;
}
