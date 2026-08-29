import { supabaseAdmin } from "../db/supabase";

export async function signInWithPassword(email: string, password: string) {
  return supabaseAdmin.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, fullName?: string | null) {
  return supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName ?? null },
    },
  });
}

export async function getUser(accessToken: string | undefined) {
  if (!accessToken) return { user: null };
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error) return { user: null };
  return data;
}
