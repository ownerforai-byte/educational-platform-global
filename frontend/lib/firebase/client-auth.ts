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
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  type MultiFactorError,
  type MultiFactorResolver,
  type User,
} from "firebase/auth";
import { getPublicEnv } from "@/lib/env";
import { getFirebaseApp } from "@/lib/fcm/firebase-app";
import { isFirebaseWebConfigured } from "@/lib/fcm/config";
import { publicOrigin } from "@/lib/site-url";

export function isFirebaseAuthEnabled(): boolean {
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

export class FirebaseMfaRequiredError extends Error {
  readonly code = "auth/multi-factor-auth-required" as const;
  constructor(readonly resolver: MultiFactorResolver) {
    super("Multi-factor authentication required");
    this.name = "FirebaseMfaRequiredError";
  }
}

function isMultiFactorError(err: unknown): err is MultiFactorError {
  return (err as MultiFactorError)?.code === "auth/multi-factor-auth-required";
}

async function throwOnMfa(auth: NonNullable<ReturnType<typeof getFirebaseAuth>>, err: unknown): Promise<never> {
  if (isMultiFactorError(err)) {
    throw new FirebaseMfaRequiredError(getMultiFactorResolver(auth, err));
  }
  throw err;
}

export async function firebaseEmailLogin(email: string, password: string): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user.getIdToken();
  } catch (err) {
    return throwOnMfa(auth, err);
  }
}

export async function firebaseEmailSignup(
  email: string,
  password: string,
  displayName?: string | null,
): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName?.trim() && cred.user) {
    try {
      const { updateProfile } = await import("firebase/auth");
      await updateProfile(cred.user, { displayName: displayName.trim() });
    } catch {
      /* ignore display name update failure */
    }
  }
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
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.getIdToken();
  } catch (err) {
    return throwOnMfa(auth, err);
  }
}

export async function firebaseConsumeRedirectResult(): Promise<string | null> {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    if (!result?.user) return null;
    return result.user.getIdToken();
  } catch (err) {
    return throwOnMfa(auth, err);
  }
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
  if (auth.currentUser) {
    try {
      return await auth.currentUser.getIdToken();
    } catch {
      return null;
    }
  }
  return new Promise<string | null>((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        unsub();
        resolve(auth.currentUser ? auth.currentUser.getIdToken().catch(() => null) : null);
      }
    }, 4000);
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u && !settled) {
        settled = true;
        clearTimeout(timer);
        unsub();
        try {
          resolve(await u.getIdToken());
        } catch {
          resolve(null);
        }
      }
    });
  });
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

/** E.164 phone sign-in/sign-up was removed (auth is email + Google + MFA OTP only).
 *  The reCAPTCHA helper below is kept for the enrolled-phone MFA factor. */

export function clearPhoneRecaptcha(): void {
  if (!phoneRecaptcha) return;
  try {
    phoneRecaptcha.clear();
  } catch {
    // ignore
  }
  phoneRecaptcha = null;
}

/** Send SMS for an enrolled phone MFA factor after email/password or Google popup. */
export async function firebaseMfaSendSmsCode(
  resolver: MultiFactorResolver,
  recaptchaContainerId: string,
): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const hint = resolver.hints.find((h) => h.factorId === PhoneMultiFactorGenerator.FACTOR_ID);
  if (!hint) throw new Error("No phone second factor is enrolled on this account");
  const verifier = await getPhoneRecaptcha(recaptchaContainerId);
  const provider = new PhoneAuthProvider(auth);
  return provider.verifyPhoneNumber({ multiFactorHint: hint, session: resolver.session }, verifier);
}

export async function firebaseMfaConfirmSmsAndFinish(
  resolver: MultiFactorResolver,
  verificationId: string,
  smsCode: string,
): Promise<string> {
  const assertion = PhoneMultiFactorGenerator.assertion(
    PhoneAuthProvider.credential(verificationId, smsCode.trim()),
  );
  const result = await resolver.resolveSignIn(assertion);
  return result.user.getIdToken();
}
