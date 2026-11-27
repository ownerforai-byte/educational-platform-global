/**
 * Firebase Admin Auth — ID token verification and user administration.
 */
import { getFirebaseAuth, type FirebaseAuthAdmin } from "../storage/firebase-admin.js";
import { sendMail } from "../utils/mailer.js";

export type FirebaseVerifiedUser = {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  emailVerified: boolean;
  providerIds: string[];
};

/** Stable profile/session email when Firebase phone sign-in has no email claim. */
export function firebaseSessionEmail(verified: Pick<FirebaseVerifiedUser, "email" | "phoneNumber" | "uid">): string | null {
  const email = verified.email?.trim();
  if (email) return email;
  const phone = verified.phoneNumber?.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits) return `phone+${digits}@phone.signin.harindrasah.com.np`;
  }
  return null;
}

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
      phone_number?: string;
      name?: string;
      email_verified?: boolean;
      firebase?: { sign_in_provider?: string; identities?: Record<string, string[]> };
    };
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      phoneNumber: decoded.phone_number ?? null,
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

export async function firebaseDeleteUser(uid: string): Promise<boolean> {
  const adminAuth = auth();
  if (!adminAuth) return false;
  try {
    await adminAuth.deleteUser(uid);
    return true;
  } catch (err) {
    console.warn("[Auth] firebaseDeleteUser failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

function emailActionHtml(heading: string, link: string): string {
  const safeLink = link.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111827;padding:24px"><h1 style="font-size:20px">${heading}</h1><p><a href="${safeLink}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none">Continue</a></p><p>If the button does not work, open this link directly:</p><p><a href="${safeLink}">${safeLink}</a></p></body></html>`;
}

export async function firebaseSendPasswordResetEmail(
  email: string,
  continueUrl: string,
): Promise<boolean> {
  const adminAuth = auth();
  if (!adminAuth) return false;
  try {
    const link = await adminAuth.generatePasswordResetLink(email, { url: continueUrl });
    const result = await sendMail({
      to: email,
      subject: "Reset your Ravikisan password",
      html: emailActionHtml("Reset your password", link),
      text: `Reset your password: ${link}`,
    });
    return result.sent;
  } catch (err) {
    console.warn("[Auth] generatePasswordResetLink failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function firebaseSendEmailVerificationEmail(
  email: string,
  continueUrl: string,
): Promise<boolean> {
  const adminAuth = auth();
  if (!adminAuth || typeof adminAuth.generateEmailVerificationLink !== "function") return false;
  try {
    const link = await adminAuth.generateEmailVerificationLink(email, { url: continueUrl });
    const result = await sendMail({
      to: email,
      subject: "Confirm your Ravikisan email",
      html: emailActionHtml("Confirm your email", link),
      text: `Confirm your email: ${link}`,
    });
    return result.sent;
  } catch (err) {
    console.warn("[Auth] generateEmailVerificationLink failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
