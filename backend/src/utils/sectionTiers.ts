import { supabaseAdmin } from "../db/supabase";

/**
 * SECTION MINIMUM OVERRIDES (plan.md §8 P4 / §9: "Owner console can grant or
 * adjust every tier and change section minimums").
 *
 * The section registry's `minTier` values are CODE DEFAULTS. The owner console
 * (/owner/sections) can move any section's rung at runtime; each change is
 * stored as `settings.key = "section_min_tier.<sectionId>"` with the rung as
 * the value, and published on GET /api/config so every viewer's rails, plans
 * matrix and section gates agree with what is actually enforced.
 *
 * Fail-open: a settings read error returns {} — the code defaults are the
 * ladder itself, so a hiccup never loosens or tightens access by accident.
 */

const PREFIX = "section_min_tier.";
const CACHE_TTL_MS = 15_000;

const TIERS = new Set(["guest", "member", "plus", "pro", "owner"]);

/** Retired rung names still present in old settings rows map to the new ladder. */
const LEGACY_TIER: Record<string, string> = { visitor: "guest" };

let cache: { value: Record<string, string>; at: number } | null = null;

/** Drop the cached map so an owner console save takes effect immediately. */
export function invalidateSectionTierCache(): void {
  cache = null;
}

export async function readSectionMinTiers(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_TTL_MS) return cache.value;

  let value: Record<string, string> = {};
  try {
    const { data } = await supabaseAdmin
      .from("settings")
      .select("key, value")
      .like("key", `${PREFIX}%`);

    for (const row of (data ?? []) as Array<{ key: string; value: unknown }>) {
      const sectionId = row.key.slice(PREFIX.length);
      const raw = typeof row.value === "string" ? row.value.trim().toLowerCase() : "";
      const rung = LEGACY_TIER[raw] ?? raw;
      // Only known ladder rungs count — anything else falls back to the code
      // default for that section.
      if (sectionId && TIERS.has(rung)) value[sectionId] = rung;
    }
  } catch {
    // Fail open to the code defaults.
    value = {};
  }

  cache = { value, at: now };
  return value;
}
