import { NextResponse } from "next/server";
import { createClient } from "@/lib/db/server";
import { isUserRole } from "@/lib/auth/roles";
import { loginSchema, signupSchema } from "@/features/auth/schema";
import type { SessionUser } from "@/features/auth/types";

async function buildSessionUser(
  userId: string,
  email: string,
): Promise<SessionUser> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  const rawRole =
    typeof data?.role === "string" ? data.role.toUpperCase() : null;

  return {
    id: userId,
    email,
    fullName: null,
    role: isUserRole(rawRole) ? (rawRole as SessionUser["role"]) : null,
  };
}

export async function handleLogin(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email or password format" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const user = await buildSessionUser(
    data.user.id,
    data.user.email ?? parsed.data.email,
  );
  return NextResponse.json({ user });
}

export async function handleSignup(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid signup details" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName ?? null },
    },
  });

  if (error) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  if (!data.session || !data.user) {
    return NextResponse.json({
      user: null,
      message: "Check your email to confirm your account before logging in.",
    });
  }

  const user = await buildSessionUser(
    data.user.id,
    data.user.email ?? parsed.data.email,
  );
  return NextResponse.json({ user });
}

export async function handleLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}

export async function handleSession() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const sessionUser = await buildSessionUser(user.id, user.email ?? "");
    return NextResponse.json({ user: sessionUser });
  } catch {
    return NextResponse.json({ error: "Session check failed" }, { status: 500 });
  }
}
