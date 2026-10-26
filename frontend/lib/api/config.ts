import { apiFetch } from "../api-client";

/**
 * Public runtime flags from GET /api/config (no auth, no user data).
 *
 * coin_gate_enabled: owner emails spend content sparks on note unlocks when ON.
 * AI chat is metered separately via AI sparks (not this flag).
 */
export interface PublicConfig {
  /** True when owner emails spend content sparks on unlocks (default). */
  coinGateEnabled: boolean;
  /** Daily content spark pool for signed-in users. */
  dailyCreditPool: number;
  /** Legacy — always 0; AI uses AI sparks. */
  aiMessageCost: number;
  /**
   * Owner-set section minimums (sectionId → rung), from /owner/sections.
   * Empty when the code defaults rule (plan.md §8 P4).
   */
  sectionMinTiers: Record<string, string>;
}

/** Server default when the config read fails: the gate stays ON (billing). */
export const DEFAULT_PUBLIC_CONFIG: PublicConfig = {
  coinGateEnabled: true,
  dailyCreditPool: 4,
  aiMessageCost: 0,
  sectionMinTiers: {},
};

/**
 * Read the public runtime config. Never throws: a failed read falls back to the
 * platform default (gate ON), so a config hiccup cannot silently unlock billing.
 */
export async function getPublicConfig(): Promise<PublicConfig> {
  try {
    const cfg = await apiFetch<Partial<PublicConfig>>("/api/config");
    return {
      coinGateEnabled: cfg?.coinGateEnabled !== false,
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
