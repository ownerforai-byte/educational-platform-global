import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export type AccessStatus = "PENDING" | "ACTIVE" | "REJECTED";

/**
 * Firestore `profiles` document (doc id = Firebase uid) — Supabase→Firebase
 * auth migration contract. Keep in sync with the signup writer.
 */
export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  access_status: AccessStatus;
  role: string;
  plan: string;
  premium_status: boolean;
  created_at: string;
}

export const PROFILES_COLLECTION = "profiles";

let db: Firestore | null = null;

/** Admin Firestore client — never ship this to the browser. */
export function getFirestoreAdmin(): Firestore {
  if (db) return db;
  if (getApps().length === 0) {
    initializeApp();
  }
  db = getFirestore();
  return db;
}

/**
 * Best-effort epoch millis from a profile `created_at`. Accepts ISO strings
 * (the contract), epoch millis, Date, and Firestore Timestamps. Returns null
 * when the value is missing or unparseable so callers can skip safely.
 */
export function createdAtMillis(value: unknown): number | null {
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? null : ms;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (value instanceof Date) {
    const ms = value.getTime();
    return Number.isFinite(ms) ? ms : null;
  }
  if (value && typeof value === "object") {
    const toDate = (value as { toDate?: unknown }).toDate;
    if (typeof toDate === "function") {
      const ms = (toDate as () => Date).call(value).getTime();
      return Number.isFinite(ms) ? ms : null;
    }
  }
  return null;
}
