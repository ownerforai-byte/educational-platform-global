"use client";

import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/fcm/firebase-app";
import { isFirebaseWebConfigured } from "@/lib/fcm/config";

let db: Firestore | null = null;

/** Shared Firestore instance for client realtime features (chat, presence). */
export function getClientFirestore(): Firestore | null {
  if (typeof window === "undefined") return null;
  if (!isFirebaseWebConfigured()) return null;
  if (db) return db;
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    db = getFirestore(app);
  } catch {
    db = null;
  }
  return db;
}