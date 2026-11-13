"use client";

import { useEffect, useState } from "react";
import { getPublicConfig } from "@/lib/api/config";
import { ACCESS_LEVELS, type AccessLevel } from "@/lib/core/access-level";
import type { SectionTierOverrides } from "@/lib/sections";

/**
 * LIVE SECTION MINIMUMS (plan.md §8 P4 / §9: "Owner console can … change
 * section minimums").
 *
 * One shared read of GET /api/config's `sectionMinTiers`, cached at module
 * level so the rails, the /plans matrix and every section gate all apply the
 * same owner overrides without each firing their own request. `refresh()` is
 * what an owner console save calls so the change lands everywhere at once.
 */

let cache: SectionTierOverrides = {};
let loaded = false;
let inflight: Promise<SectionTierOverrides> | null = null;
const listeners = new Set<() => void>();

/** Keep only real section keys mapped to real ladder rungs. */
function sanitize(raw: Record<string, string>): SectionTierOverrides {
  const out: SectionTierOverrides = {};
  for (const [id, rung] of Object.entries(raw ?? {})) {
    if (
      typeof id === "string" &&
      id &&
      typeof rung === "string" &&
      (ACCESS_LEVELS as readonly string[]).includes(rung)
    ) {
      out[id] = rung as AccessLevel;
    }
  }
  return out;
}

function load(force = false): Promise<SectionTierOverrides> {
  if (inflight) return inflight;
  if (loaded && !force) return Promise.resolve(cache);
  inflight = (async () => {
    try {
      const cfg = await getPublicConfig();
      cache = sanitize(cfg.sectionMinTiers);
    } catch {
      // Keep the previous map (code defaults on first load) — never throw into
      // a render because the config read failed.
      cache = loaded ? cache : {};
    }
    loaded = true;
    inflight = null;
    listeners.forEach((listener) => listener());
    return cache;
  })();
  return inflight;
}

/** Re-read the overrides (after an owner console save). */
export function refreshSectionTierOverrides(): Promise<SectionTierOverrides> {
  return load(true);
}

/** The live owner overrides; `{}` while they load or when defaults rule. */
export function useSectionTierOverrides(): SectionTierOverrides {
  const [overrides, setOverrides] = useState<SectionTierOverrides>(cache);

  useEffect(() => {
    const listener = () => setOverrides(cache);
    listeners.add(listener);
    void load().then(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return overrides;
}
