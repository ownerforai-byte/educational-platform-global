/**
 * Three-tier storage classification — free-tier layout (Spark + R2 + Supabase).
 *
 * Tier 1 — Supabase Postgres (≤500MB): relational CRUD only. Never binaries.
 * Tier 2 — Firebase Firestore (Spark free DB quota): FCM tokens, notification
 *          logs, access-session mirrors. Firebase Storage is NOT used
 *          (Blaze-only; free-tier policy is final).
 * Tier 3 — Cloudflare R2 (10GB free): ALL binaries (PDF, images, AV, uploads).
 */

export type StorageTier = 1 | 2 | 3;
export type StorageProvider = "supabase" | "firebase" | "r2" | "firestore";

export const TIER_PROVIDER = {
  1: "supabase" as const,
  2: "firestore" as const,
  3: "r2" as const,
};

export type UploadClassInput = {
  contentType: string;
  byteLength: number;
  path?: string;
};

/** Binary uploads always go to Tier 3 (R2) on the free-tier policy. */
export function classifyBinaryUpload(_input: UploadClassInput): 3 {
  return 3;
}

export type FirestoreDocKind =
  | "fcm_token"
  | "notification_log"
  | "access_session";

export function classifyRealtimeDoc(_kind: FirestoreDocKind): 2 {
  return 2;
}

export type RelationalKind =
  | "profile"
  | "journey"
  | "quiz_score"
  | "bookmark"
  | "credits"
  | "community"
  | "curriculum";

export function classifyRelational(_kind: RelationalKind): 1 {
  return 1;
}
