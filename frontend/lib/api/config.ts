import type { PublicConfigDto } from "@rn/shared/api";
import { apiFetch } from "../api-client";

/**
 * Public runtime flags from GET /api/config (no auth, no user data).
 *
 * The owner ON/OFF coin gate is gone (removed 2026-11-06): access is decided by
 * the tier section registry and SparkGate, so this payload only carries the pool
 * constants and the owner-set section minimums. AI chat is metered separately
 * via AI sparks, not here.
 */
export type PublicConfig = PublicConfigDto;

/** Server default when the config read fails. */
export const DEFAULT_PUBLIC_CONFIG: PublicConfig = {
  dailyCreditPool: 4,
  aiMessageCost: 0,
  sectionMinTiers: {},
};

/**
 * Read the public runtime config. Never throws: a failed read falls back to the
 * platform defaults, so a config hiccup cannot blank the section minimums.
 */
export async function getPublicConfig(): Promise<PublicConfig> {
  try {
    const cfg = await apiFetch<Partial<PublicConfig>>("/api/config");
    return {
      dailyCreditPool:
        typeof cfg?.dailyCreditPool === "number"
          ? cfg.dailyCreditPool
          : DEFAULT_PUBLIC_CONFIG.dailyCreditPool,
      aiMessageCost:
        typeof cfg?.aiMessageCost === "number"
          ? cfg.aiMessageCost
          : DEFAULT_PUBLIC_CONFIG.aiMessageCost,
      sectionMinTiers:
        cfg?.sectionMinTiers && typeof cfg.sectionMinTiers === "object"
          ? cfg.sectionMinTiers
          : {},
    };
  } catch {
    return DEFAULT_PUBLIC_CONFIG;
  }
}
