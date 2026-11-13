import { getUserByToken } from "./supabase.js";
import { useFirebaseAuth } from "./auth-mode.js";
import { verifyFirebaseIdToken } from "./firebase-admin-auth.js";

export type VerifiedTokenUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  /** OAuth / federated provider ids when available. */
  providerIds: string[];
};

/**
 * Provider-agnostic access-token verification used by middleware and routes
 * that cannot rely on `req.user` already being attached.
 */
export async function verifyAccessToken(token: string): Promise<VerifiedTokenUser | null> {
  if (useFirebaseAuth()) {
    const firebaseUser = await verifyFirebaseIdToken(token);
    if (!firebaseUser) return null;
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      fullName: firebaseUser.displayName,
      providerIds: firebaseUser.providerIds,
    };
  }

  const supabaseUser = await getUserByToken(token);
  if (!supabaseUser) return null;

  const providers =
    (supabaseUser.identities ?? [])
      .map((identity) => identity?.provider)
      .filter((p): p is string => typeof p === "string") ?? [];
  const primary = supabaseUser.app_metadata?.provider;
  const providerIds =
    typeof primary === "string" ? [...new Set([primary, ...providers])] : providers;

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? null,
    fullName:
      (typeof supabaseUser.user_metadata?.full_name === "string"
        ? supabaseUser.user_metadata.full_name
        : null) ?? null,
    providerIds,
  };
}
