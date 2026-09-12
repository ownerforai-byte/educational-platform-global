import { apiFetch } from "../api-client";

export interface UserCreditInfo {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  credits: number;
  creditsLimit: number;
  premiumStatus: boolean;
  premiumApprovedAt: string | null;
  pendingRequests: Array<{
    id: string;
    status: string;
    created_at: string;
  }>;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  actor_id: string | null;
  amount: number;
  type: "GRANT" | "SPEND" | "ADJUST";
  reason: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface AdminUser extends UserCreditInfo {
  pendingPremiumRequests: number;
}

export interface PremiumRequest {
  id: string;
  user_id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  profiles?: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    credits: number;
  };
}

export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  pendingPremiumRequests: number;
  totalCreditsGranted: number;
  totalCreditsSpent: number;
}

export async function getUserCredits(): Promise<UserCreditInfo> {
  return apiFetch<UserCreditInfo>("/api/user/me");
}

export async function requestPremium(message?: string): Promise<{ id: string; status: string }> {
  return apiFetch<{ id: string; status: string }>("/api/user/credits/request", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export async function getUserTransactions(): Promise<CreditTransaction[]> {
  return apiFetch<CreditTransaction[]>("/api/user/credits/transactions");
}

// Admin endpoints
export async function getAdminUsers(): Promise<AdminUser[]> {
  return apiFetch<AdminUser[]>("/api/admin/users");
}

export async function getAdminUserDetails(userId: string): Promise<any> {
  return apiFetch<any>(`/api/admin/users/${userId}`);
}

export async function adjustUserCredits(
  userId: string,
  amount: number,
  reason?: string
): Promise<any> {
  return apiFetch<any>(`/api/admin/users/${userId}/credits`, {
    method: "PATCH",
    body: JSON.stringify({ amount, reason }),
  });
}

export async function updateUserRole(
  userId: string,
  role: string
): Promise<any> {
  return apiFetch<any>(`/api/admin/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export async function getPremiumRequests(): Promise<PremiumRequest[]> {
  return apiFetch<PremiumRequest[]>("/api/admin/premium-requests");
}

export async function approvePremiumRequest(requestId: string): Promise<any> {
  return apiFetch<any>(`/api/admin/premium-requests/${requestId}/approve`, {
    method: "POST",
  });
}

export async function rejectPremiumRequest(requestId: string): Promise<any> {
  return apiFetch<any>(`/api/admin/premium-requests/${requestId}/reject`, {
    method: "POST",
  });
}

export async function getAdminStats(): Promise<AdminStats> {
  return apiFetch<AdminStats>("/api/admin/stats");
}
