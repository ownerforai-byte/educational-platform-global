/** Resolve what the status dot shows. Pure so it is trivially testable. */
export type AiStatus = "online" | "offline" | "checking";

export interface AiStatusInput {
  /** navigator.onLine */
  browserOnline: boolean;
  /** Result of GET /api/ai/status; null while unknown. */
  serverOnline: boolean | null;
}

export function resolveAiStatus({ browserOnline, serverOnline }: AiStatusInput): AiStatus {
  if (!browserOnline) return "offline";
  if (serverOnline === null) return "checking";
  return serverOnline ? "online" : "offline";
}

/**
 * The backend probe reports *configuration* (a wired-up provider), not live
 * provider health. Label it that way so a stale/invalid key never tells a
 * student that Veer is confirmed reachable (CodeRabbit, PR #6).
 */
export function aiStatusLabel(status: AiStatus, browserOnline: boolean): string {
  if (status === "online") return "AI is configured";
  if (status === "checking") return "Checking AI setup…";
  return browserOnline ? "AI is not configured" : "You're offline";
}
