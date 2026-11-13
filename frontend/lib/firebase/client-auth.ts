"use client";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseApp } from "@/lib/fcm/firebase-app";
import { getPublicEnv } from "@/lib/env";

export function useFirebaseClientAuth(): boolean {
  const flag = getPublicEnv().NEXT_PUBLIC_USE_FIREBASE_AUTH?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

export async function firebaseEmailLogin(email: string, password: string): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user.getIdToken();
}

export async function firebaseEmailSignup(email: string, password: string): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user.getIdToken();
}

export async function firebaseRefreshIdToken(): Promise<string | null> {
  const auth = getFirebaseAuth();
  const user = auth?.currentUser;
  if (!user) return null;
  return user.getIdToken(true);
}

export async function firebaseGoogleSignIn(mode: "popup" | "redirect"): Promise<string | null> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const provider = new GoogleAuthProvider();
  if (mode === "redirect") {
    await signInWithRedirect(auth, provider);
    return null;
  }
  const result = await signInWithPopup(auth, provider);
  return result.user.getIdToken();
}

export async function firebaseConsumeRedirectResult(): Promise<string | null> {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  const result = await getRedirectResult(auth);
  if (!result?.user) return null;
  return result.user.getIdToken();
}

export async function firebaseClientLogout(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await firebaseSignOut(auth);
}

export async function firebaseClientForgotPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const base = (getPublicEnv().NEXT_PUBLIC_SITE_URL || window.location.origin).replace(/\/+$/, "");
  await sendPasswordResetEmail(auth, email, { url: `${base}/reset-password`, handleCodeInApp: true });
}

export async function firebaseClientConfirmPasswordReset(oobCode: string, password: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  await confirmPasswordReset(auth, oobCode, password);
}

export function subscribeFirebaseUser(cb: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  if (!auth) return () => {};
  return onAuthStateChanged(auth, cb);
}
