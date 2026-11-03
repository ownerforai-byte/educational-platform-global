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

export function aiStatusLabel(status: AiStatus, browserOnline: boolean): string {
  if (status === "online") return "Veer is online";
  if (status === "checking") return "Checking Veer…";
  return browserOnline ? "Veer is unavailable right now" : "You're offline";
}
