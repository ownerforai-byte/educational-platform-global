import { apiFetch } from "../api-client";

/**
 * Owner console API — every call hits /api/owner/*, which the backend gates
 * to allowlisted owner emails only. A 403 here simply means "not an owner".
 */

export interface OwnerStats {
  totalUsers: number;
  premiumUsers: number;
  pendingPremiumRequests: number;
  totalCreditsGranted: number;
  totalCreditsSpent: number;
  content: {
    levels: number;
    classes: number;
    subjects: number;
    chapters: number;
    topics: number;
    resources: number;
  };
}

export interface OwnerOverview {
  stats: OwnerStats;
  recentTransactions: OwnerTransaction[];
  recentUsers: OwnerUser[];
}

export interface OwnerUser {
  id: string;
  full_name: string | null;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | "OWNER" | null;
  credits: number;
  credits_limit?: number | null;
  premium_status: boolean;
  premium_approved_at?: string | null;
  created_at?: string;
}

export interface OwnerTransaction {
  id: string;
  user_id: string;
  actor_id: string | null;
  amount: number;
  type: "GRANT" | "SPEND" | "ADJUST";
  reason: string | null;
  reference_id: string | null;
  created_at: string;
  userEmail?: string | null;
  actorEmail?: string | null;
}

export interface OwnerPremiumRequest {
  id: string;
  user_id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  profiles?: {
    id: string;
    full_name: string | null;
    email: string;
    role: string;
    credits: number;
  } | null;
}

export interface OwnerSetting {
  key: string;
  value: unknown;
  description?: string | null;
  updated_by?: string | null;
}

export interface OwnerUserDetail {
  profile: OwnerUser & Record<string, unknown>;
  creditHistory: OwnerTransaction[];
  premiumRequests: OwnerPremiumRequest[];
}

export interface OwnerActivity extends OwnerTransaction {}

// ── Endpoints ───────────────────────────────────────────────────────────────

export function getOwnerOverview(): Promise<OwnerOverview> {
  return apiFetch<OwnerOverview>("/api/owner/overview");
}

export function getOwnerUsers(q?: string): Promise<OwnerUser[]> {
  const search = q?.trim();
  return apiFetch<OwnerUser[]>(`/api/owner/users${search ? `?q=${encodeURIComponent(search)}` : ""}`);
}

export function getOwnerUserDetail(userId: string): Promise<OwnerUserDetail> {
  return apiFetch<OwnerUserDetail>(`/api/owner/users/${userId}`);
}

export function adjustOwnerUserCredits(
  userId: string,
  amount: number,
  reason?: string
): Promise<{ success: true; newCredits: number }> {
  return apiFetch(`/api/owner/users/${userId}/credits`, {
    method: "PATCH",
    body: JSON.stringify({ amount, reason }),
  });
}

export function updateOwnerUserRole(
  userId: string,
  role: "STUDENT" | "TEACHER" | "ADMIN" | "OWNER"
): Promise<{ success: true; newRole: string }> {
  return apiFetch(`/api/owner/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export function setOwnerUserPremium(
  userId: string,
  premiumStatus: boolean
): Promise<{ success: true; premiumStatus: boolean }> {
  return apiFetch(`/api/owner/users/${userId}/premium`, {
    method: "PATCH",
    body: JSON.stringify({ premiumStatus }),
  });
}

export function deleteOwnerUser(userId: string): Promise<{ success: true }> {
  return apiFetch(`/api/owner/users/${userId}`, { method: "DELETE" });
}

export function getOwnerPremiumRequests(): Promise<OwnerPremiumRequest[]> {
  return apiFetch<OwnerPremiumRequest[]>("/api/owner/premium-requests");
}

export function approveOwnerPremiumRequest(
  requestId: string
): Promise<{ success: true; creditsGranted: number }> {
  return apiFetch(`/api/owner/premium-requests/${requestId}/approve`, { method: "POST" });
}

export function rejectOwnerPremiumRequest(
  requestId: string
): Promise<{ success: true }> {
  return apiFetch(`/api/owner/premium-requests/${requestId}/reject`, { method: "POST" });
}

export function getOwnerSettings(): Promise<{ settings: OwnerSetting[] }> {
  return apiFetch<{ settings: OwnerSetting[] }>("/api/owner/settings");
}

export function updateOwnerSettings(
  settings: Array<{ key: string; value: unknown }>
): Promise<{ settings: Array<{ key: string; value: unknown }> }> {
  return apiFetch("/api/owner/settings", {
    method: "PATCH",
    body: JSON.stringify({ settings }),
  });
}

export function getOwnerActivity(): Promise<OwnerActivity[]> {
  return apiFetch<OwnerActivity[]>("/api/owner/activity");
}

/** Divide credits across individual Gmails in one call (explicit per-email amounts). */
export function bulkOwnerCredits(
  grants: Array<{ email: string; amount: number }>,
  reason?: string
): Promise<{ applied: Array<{ email: string; userId: string; newCredits: number }>; notFound: string[]; requested: number }> {
  return apiFetch("/api/owner/credits/bulk", {
    method: "POST",
    body: JSON.stringify({ grants, reason }),
  });
}

/** Grant the same credit amount to every user. */
export function creditEveryone(
  amount: number,
  reason?: string
): Promise<{ applied: number; total: number; amount: number }> {
  return apiFetch("/api/owner/credits/everyone", {
    method: "POST",
    body: JSON.stringify({ amount, reason }),
  });
}

export interface OwnerChatSession {
  session: string;
  messages: number;
  lastMessageAt: string;
  preview: string;
}

export interface OwnerChatMessage {
  id?: string;
  session: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

/** Tracking: read any user's AI chat history (sessions, or one session's messages). */
export function getOwnerUserChats(
  userId: string,
  session?: string,
  limit = 200
): Promise<{ sessions: OwnerChatSession[]; messages: OwnerChatMessage[]; migrated: boolean }> {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (session) qs.set("session", session);
  return apiFetch(`/api/owner/users/${userId}/chats?${qs.toString()}`);
}
