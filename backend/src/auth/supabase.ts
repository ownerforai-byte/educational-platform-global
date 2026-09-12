import { supabaseAdmin } from "../db/supabase";

/**
 * Supabase auth service — thin, focused wrappers over the admin client.
 *
 * All Supabase auth calls live here so that route handlers and middleware
 * never talk to `supabaseAdmin.auth` directly.
 */

/** Sign in with email + password. Returns the Supabase result shape. */
export async function signInWithPassword(email: string, password: string) {
  return supabaseAdmin.auth.signInWithPassword({ email, password });
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName?: string | null;
}

export interface SignUpResult {
  /** Present when the user is immediately usable (session confirmed). */
  user: { id: string; email: string } | null;
  session: { access_token: string; expires_in?: number } | null;
  /** Present when the user must confirm by email (no immediate session). */
  needsEmailConfirmation: boolean;
  error: string | null;
}

/**
 * Register a new user.
 *
 * Auto-confirms the email via the admin API when Supabase requires
 * confirmation, so the caller can sign in immediately. Falls back to
 * "check your email" when auto-confirm is not possible.
 */
export async function signUp(input: SignUpInput): Promise<SignUpResult> {
  const { email, password, fullName } = input;

  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName ?? null } },
  });

  if (error) {
    return { user: null, session: null, needsEmailConfirmation: true, error: error.message };
  }

  // Session already returned → confirmed.
  if (data.session && data.user) {
    return {
      user: { id: data.user.id, email: data.user.email ?? email },
      session: data.session,
      needsEmailConfirmation: false,
      error: null,
    };
  }

  // No session → Supabase wants email confirmation. Try to auto-confirm.
  if (data.user) {
    try {
      await (supabaseAdmin.auth.admin.updateUserById as (
        id: string,
        attrs: Record<string, unknown>,
      ) => Promise<unknown>)(data.user.id, { email_confirm: true });

      const signIn = await supabaseAdmin.auth.signInWithPassword({ email, password });
      if (signIn.data.session && signIn.data.user) {
        return {
          user: { id: signIn.data.user.id, email: signIn.data.user.email ?? email },
          session: signIn.data.session,
          needsEmailConfirmation: false,
          error: null,
        };
      }
      return {
        user: { id: data.user.id, email },
        session: null,
        needsEmailConfirmation: true,
        error: signIn.error?.message ?? null,
      };
    } catch {
      // Auto-confirm unavailable → user must click the email link.
      return {
        user: { id: data.user.id, email },
        session: null,
        needsEmailConfirmation: true,
        error: null,
      };
    }
  }

  return { user: null, session: null, needsEmailConfirmation: true, error: null };
}

/** Validate an access token and return the raw Supabase user, or null. */
export async function getUserByToken(accessToken: string) {
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) return null;
  return data.user;
}

/** Best-effort sign-out (invalidate the token server-side). */
export async function signOut(accessToken: string): Promise<void> {
  try {
    await (supabaseAdmin.auth.signOut as (token: string) => Promise<unknown>)(accessToken);
  } catch {
    // Intentionally ignored — the cookie is cleared regardless.
  }
}
