import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "../supabase.js";

/** PostgREST / schema-cache errors when a table has not been migrated yet. */
export function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

export function getAdminClient(): SupabaseClient {
  return supabaseAdmin;
}

export type RepositoryError = PostgrestError | null;

export function postgrestCode(error: RepositoryError): string {
  return (error as { code?: string } | null)?.code ?? "";
}
