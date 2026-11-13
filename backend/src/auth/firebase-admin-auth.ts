/**
 * Firebase Admin Auth — ID token verification and user administration.
 */
import { getFirebaseAuth, type FirebaseAuthAdmin } from "../storage/firebase-admin.js";

export type FirebaseVerifiedUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  providerIds: string[];
};

function auth(): FirebaseAuthAdmin | null {
  return getFirebaseAuth();
}

function providersFromClaims(
  firebase?: { sign_in_provider?: string; identities?: Record<string, string[]> },
): string[] {
  if (!firebase) return [];
  const fromIdentities = firebase.identities ? Object.keys(firebase.identities) : [];
  const primary = firebase.sign_in_provider ? [firebase.sign_in_provider] : [];
  return [...new Set([...primary, ...fromIdentities])];
}

export function isFirebaseAuthReady(): boolean {
  return Boolean(auth());
}

export async function verifyFirebaseIdToken(
  token: string,
  { checkRevoked = false }: { checkRevoked?: boolean } = {},
): Promise<FirebaseVerifiedUser | null> {
  const adminAuth = auth();
  if (!adminAuth) {
    console.warn("[Auth] Firebase Admin Auth not configured");
    return null;
  }
  try {
    const decoded = (await adminAuth.verifyIdToken(token, checkRevoked)) as {
      uid: string;
      email?: string;
      name?: string;
      email_verified?: boolean;
      firebase?: { sign_in_provider?: string; identities?: Record<string, string[]> };
    };
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      emailVerified: decoded.email_verified === true,
      providerIds: providersFromClaims(decoded.firebase),
    };
  } catch (err) {
    console.warn(
      "[Auth] Firebase token validation failed:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

export async function revokeFirebaseSessions(uid: string): Promise<void> {
  const adminAuth = auth();
  if (!adminAuth) return;
  try {
    await adminAuth.revokeRefreshTokens(uid);
  } catch (err) {
    console.warn("[Auth] revokeRefreshTokens failed:", err instanceof Error ? err.message : err);
  }
}

export async function firebaseCreateUser(input: {
  email: string;
  password: string;
  displayName?: string | null;
  emailVerified?: boolean;
}): Promise<{ uid: string; email: string } | null> {
  const adminAuth = auth();
  if (!adminAuth) return null;
  try {
    const record = await adminAuth.createUser({
      email: input.email,
      password: input.password,
      displayName: input.displayName?.trim() || undefined,
      emailVerified: input.emailVerified,
    });
    return { uid: record.uid, email: record.email ?? input.email };
  } catch (err) {
    console.warn("[Auth] firebaseCreateUser failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function firebaseUpdatePassword(uid: string, password: string): Promise<boolean> {
  const adminAuth = auth();
  if (!adminAuth) return false;
  try {
    await adminAuth.updateUser(uid, { password });
    return true;
  } catch {
    return false;
  }
}

export async function firebaseGetUserByEmail(
  email: string,
): Promise<{ uid: string; email: string; displayName: string | null } | null> {
  const adminAuth = auth();
  if (!adminAuth) return null;
  try {
    const user = await adminAuth.getUserByEmail(email);
    return {
      uid: user.uid,
      email: user.email ?? email,
      displayName: user.displayName?.trim() || null,
    };
  } catch {
    return null;
  }
}

export async function firebaseSendPasswordResetEmail(
  email: string,
  continueUrl: string,
): Promise<boolean> {
  const adminAuth = auth();
  if (!adminAuth) return false;
  try {
    await adminAuth.generatePasswordResetLink(email, { url: continueUrl });
    return true;
  } catch (err) {
    console.warn("[Auth] generatePasswordResetLink failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
