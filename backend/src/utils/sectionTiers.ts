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

const TIERS = new Set(["guest", "member", "plus", "pro", "owner"]);

/** Retired rung names still present in old settings rows map to the new ladder. */
const LEGACY_TIER: Record<string, string> = { visitor: "guest" };

/** Drop any in-process copy. Reads always hit the settings table. */
export function invalidateSectionTierCache(): void {
  /* no process cache — a save must be visible on the next read */
}

function rungValue(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().replace(/^"|"$/g, "");
}

export async function readSectionMinTiers(): Promise<Record<string, string>> {
  let value: Record<string, string> = {};
  try {
    const { data } = await supabaseAdmin
      .from("settings")
      .select("key, value")
      .like("key", `${PREFIX}%`);

    for (const row of (data ?? []) as Array<{ key: string; value: unknown }>) {
      const sectionId = row.key.slice(PREFIX.length);
      const raw = rungValue(row.value);
      const rung = LEGACY_TIER[raw] ?? raw;
      // Only known ladder rungs count — anything else falls back to the code
      // default for that section.
      if (sectionId && TIERS.has(rung)) value[sectionId] = rung;
    }
  } catch {
    // Fail open to the code defaults.
    value = {};
  }

  return value;
}
