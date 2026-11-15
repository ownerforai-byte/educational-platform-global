"use client";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import { getPublicEnv } from "@/lib/env";
import { getFirebaseApp } from "@/lib/fcm/firebase-app";
import { isFirebaseWebConfigured } from "@/lib/fcm/config";
import { publicOrigin } from "@/lib/site-url";

export function useFirebaseClientAuth(): boolean {
  const flag = getPublicEnv().NEXT_PUBLIC_USE_FIREBASE_AUTH?.trim().toLowerCase();
  const enabled = flag === "1" || flag === "true" || flag === "yes";
  if (!enabled) return false;
  // Flag without NEXT_PUBLIC_FIREBASE_* values must not hijack email/password
  // or Google into the Firebase SDK — fall back to the Supabase client path.
  if (typeof window !== "undefined" && !isFirebaseWebConfigured()) return false;
  return true;
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

/**
 * Fallback token read for the OAuth redirect return. `getRedirectResult` can
 * resolve empty even after a successful `signInWithRedirect` (the credential
 * was already consumed, or the SDK restored the user from persistence). The
 * signed-in user is still on `auth.currentUser` once auth state settles, so
 * wait for it and read the token there instead of failing the sign-in.
 */
export async function firebaseCurrentUserToken(): Promise<string | null> {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  const user = await new Promise<User | null>((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      unsub();
      resolve(u);
    });
  });
  return user ? user.getIdToken() : null;
}

export async function firebaseClientLogout(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await firebaseSignOut(auth);
}

export async function firebaseClientForgotPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const base = publicOrigin().replace(/\/+$/, "");
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

let phoneRecaptcha: RecaptchaVerifier | null = null;

async function getPhoneRecaptcha(containerId: string): Promise<RecaptchaVerifier> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  if (phoneRecaptcha) {
    try {
      phoneRecaptcha.clear();
    } catch {
      // stale widget — replace below
    }
    phoneRecaptcha = null;
  }
  phoneRecaptcha = new RecaptchaVerifier(auth, containerId, { size: "invisible" });
  // Invisible reCAPTCHA must render into a real (non–display:none) container before send.
  await phoneRecaptcha.render();
  return phoneRecaptcha;
}

/** E.164 recommended (e.g. +9779812345678). Returns an object to pass to {@link firebasePhoneConfirm}. */
export async function firebasePhoneSendCode(
  phoneNumber: string,
  recaptchaContainerId: string,
): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const verifier = await getPhoneRecaptcha(recaptchaContainerId);
  return signInWithPhoneNumber(auth, phoneNumber.trim(), verifier);
}

export async function firebasePhoneConfirm(confirmation: ConfirmationResult, smsCode: string): Promise<string> {
  const cred = await confirmation.confirm(smsCode.trim());
  return cred.user.getIdToken();
}

export function clearPhoneRecaptcha(): void {
  if (!phoneRecaptcha) return;
  try {
    phoneRecaptcha.clear();
  } catch {
    // ignore
  }
  phoneRecaptcha = null;
}
