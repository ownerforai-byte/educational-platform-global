/**
 * Coin gate shared helpers — the owner toggle in /profile controls OWNERS ONLY.
 *
 * One `settings.coin_gate_enabled` row controls ALL owner-allowlist emails:
 *   button ON  → owners are billed 1 coin per AI message (like all students).
 *   button OFF → owners chat free (no deduction, no lock).
 * Students/customers are ALWAYS billed regardless of the toggle — they must
 * purchase/earn coins (PRO/premium stays unlimited).
 *
 * The settings.value column is untyped, so every reader must accept boolean,
 * numeric, and string encodings of OFF.
 */

export const COIN_GATE_KEY = "coin_gate_enabled";

/** Event fired on window after the profile toggle saves (detail: { enabled }). */
export const COIN_GATE_EVENT = "coin-gate-changed";

/** True when a stored settings value means "gate OFF / free mode". */
export function isCoinGateOffValue(value: unknown): boolean {
  if (value === false) return true;
  if (value === 0) return true;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "false" || v === "0" || v === "off" || v === "no" || v === "disabled";
  }
  if (value !== null && typeof value === "object") {
    const rec = value as Record<string, unknown>;
    if ("enabled" in rec) return isCoinGateOffValue(rec.enabled);
    if ("value" in rec) return isCoinGateOffValue(rec.value);
  }
  return false;
}

/** Resolve a settings list to the gate boolean (default ON when missing). */
export function parseCoinGateEnabled(
  settings: Array<{ key: string; value: unknown }> | undefined | null,
): boolean {
  const row = (settings ?? []).find((s) => s.key === COIN_GATE_KEY);
  if (!row) return true;
  return !isCoinGateOffValue(row.value);
}

/** Broadcast a toggle so every chat surface updates without a reload. */
export function broadcastCoinGate(enabled: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(COIN_GATE_EVENT, { detail: { enabled } }),
  );
}
