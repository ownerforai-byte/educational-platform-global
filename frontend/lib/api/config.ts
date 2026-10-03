import { apiFetch } from "../api-client";

/**
 * Public runtime flags from GET /api/config (no auth, no user data).
 *
 * The coin gate is an owner setting: when it is OFF, AI chat is free for
 * everyone. The chat surfaces read it so they lock the composer on a zero
 * balance only while the gate is actually ON.
 */
export interface PublicConfig {
  /** True when AI chat bills credits (platform default). */
  coinGateEnabled: boolean;
  /** Daily signed-in credit pool, mirrored by the UI copy. */
  dailyCreditPool: number;
  /** Cost of one AI message, in credits. */
  aiMessageCost: number;
}

/** Server default when the config read fails: the gate stays ON (billing). */
export const DEFAULT_PUBLIC_CONFIG: PublicConfig = {
  coinGateEnabled: true,
  dailyCreditPool: 4,
  aiMessageCost: 1,
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
    };
  } catch {
    return DEFAULT_PUBLIC_CONFIG;
  }
}
