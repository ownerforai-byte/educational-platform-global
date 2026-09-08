import { supabaseAdmin } from "../db/supabase";

export async function signInWithPassword(email: string, password: string) {
  return supabaseAdmin.auth.signInWithPassword({ email, password });
}

/**
 * Register a new user and auto-confirm their email so they can
 * sign in immediately without clicking a confirmation link.
 */
export async function signUp(email: string, password: string, fullName?: string | null) {
  // Step 1: Create the user (may or may not return a session depending on
  // whether Supabase email confirmation is enabled).
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName ?? null },
    },
  });

  if (error) {
    return { data, error };
  }

  // Step 2: If Supabase returned no session, the user needs email confirmation.
  // Use the Admin API to auto-confirm the email so the user can log in right away.
  if (data.user && !data.session) {
    try {
      await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
        email_confirm: true,
      });

      // Step 3: Sign the user in now that the email is confirmed.
      const signInResult = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

      return {
        data: {
          user: signInResult.data.user,
          session: signInResult.data.session,
        },
        error: signInResult.error,
      };
    } catch {
      // If auto-confirm fails, fall back to the original response
      // (user will see "check your email" message).
    }
  }

  return { data, error };
}

export async function getUser(accessToken: string | undefined) {
  if (!accessToken) return { user: null };
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error) return { user: null };
  return data;
}
