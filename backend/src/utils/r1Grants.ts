import { supabaseAdmin } from "../db/supabase";

/**
 * R1 grant registry lookups (migration 009).
 *
 * Grants are stored per EMAIL so an owner can grant before the person signs
 * up. The active-grant set is cached for 60 s (same spirit as
 * `isCoinGateEnabled`) so every R1 request does not page the table.
 *
 * Failure mode: fail CLOSED — if the table cannot be read, nobody outside the
 * owner allowlist gets R1.
 */

const CACHE_TTL_MS = 60_000;

let cache: { at: number; granted: Set<string> } | null = null;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function loadGrantedEmails(): Promise<Set<string>> {
  const granted = new Set<string>();
  try {
    // Revocation is filtered client-side (one small table) so the query stays
    // plain `select` + `eq`-compatible for every PostgREST mock in the suite.
    const { data, error } = await supabaseAdmin
      .from("r1_grants")
      .select("email, revoked_at");
    if (error) {
      console.error("[r1-grants] lookup failed:", error.message);
      return granted;
    }
    for (const row of data ?? []) {
      if (row.revoked_at) continue;
      if (typeof row.email === "string") granted.add(normalizeEmail(row.email));
    }
  } catch (err) {
    console.error("[r1-grants] unexpected failure:", err instanceof Error ? err.message : err);
  }
  return granted;
}

/** Whether this email currently holds an active R1 grant (owner emails excluded — they pass by allowlist). */
export async function isR1GrantedEmail(email?: string | null): Promise<boolean> {
  if (!email) return false;
  const now = Date.now();
  if (!cache || now - cache.at > CACHE_TTL_MS) {
    cache = { at: now, granted: await loadGrantedEmails() };
  }
  return cache.granted.has(normalizeEmail(email));
}

/** Bust the cache after the owner grants/revokes. */
export function invalidateR1GrantCache(): void {
  cache = null;
}
