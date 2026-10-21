"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { apiFetch, setStoredToken } from "@/lib/api-client";
import { writeCachedSession } from "@/lib/auth/session-store";
import { useAuth } from "@/providers/auth-provider";
import type { OAuthSessionResponse } from "@/types/api";

function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/home";
}

/**
 * Drop the supabase-js session record WITHOUT hitting its logout endpoint.
 * `signOut({ scope: "local" })` still POSTs /auth/v1/logout — and Supabase
 * GoTrue deletes the server-side session on any logout, killing the exact
 * access + refresh tokens this page just handed to the app backend. The
 * backend's own /me then 401s and a successful OAuth sign-in ends signed out.
 */
function clearSupabaseLocalSession(): void {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) return;
    const projectRef = new URL(url).hostname.split(".")[0];
    // supabase-js keeps the session under `sb-<ref>-auth-token` and PKCE
    // verifiers under per-flow variants of that key — sweep the whole prefix.
    const prefix = `sb-${projectRef}-auth-token`;
    for (const key of Object.keys(localStorage)) {
      if (key === prefix || key.startsWith(`${prefix}-`)) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Best-effort hygiene: an orphaned SDK record is inert (auto-refresh off).
  }
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const callbackStarted = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (callbackStarted.current) return;
    callbackStarted.current = true;
    const finishSignIn = async () => {
      try {
        const errorCode = searchParams.get("error");
        const errorDesc = searchParams.get("error_description");
        if (errorCode || errorDesc) {
          if (errorCode === "access_denied" || errorDesc?.toLowerCase().includes("denied")) {
            throw new Error("Sign-in was cancelled. You can sign in with email and password or try again.");
          }
          throw new Error(errorDesc || errorCode || "Sign-in could not be completed.");
        }

        const code = searchParams.get("code");
        if (!code) throw new Error("The provider did not return an authorization code.");
        const state = sessionStorage.getItem("neb_oauth_csrf");
        if (!state || !/^[a-f0-9]{64}$/.test(state)) {
          throw new Error("Sign-in verification expired or failed. Please try again.");
        }

        const client = getSupabaseBrowserClient();
        const { data, error: exchangeError } = await client.auth.exchangeCodeForSession(code);
        if (exchangeError) throw exchangeError;
        if (!data.session?.access_token) throw new Error("The provider did not return a valid session.");

        const response = await apiFetch<OAuthSessionResponse>("/api/auth/oauth/session", {
          method: "POST",
          headers: { "X-CSRF-Token": state },
          body: JSON.stringify({
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            state,
          }),
        });
        sessionStorage.removeItem("neb_oauth_csrf");

        // The app's backend validates the access token and sets its own
        // HttpOnly session/refresh cookies. Drop the local SDK record only
        // after the exchange succeeds; on failure keep OAuth details for a
        // safe retry.
        clearSupabaseLocalSession();
        if (!response.accessToken) throw new Error("The server did not issue an application session.");
        setStoredToken(response.accessToken);
        writeCachedSession(response.user, response.accessToken);
        refresh();
        router.replace(safeNext(searchParams.get("next")));
      } catch (callbackError) {
        const authError = callbackError as Error & { code?: string; statusToken?: string };
        if (authError.code === "PENDING_APPROVAL" && authError.statusToken) {
          localStorage.setItem("neb_signup_status_token", authError.statusToken);
          router.replace("/welcome");
          return;
        }
        setError(callbackError instanceof Error ? callbackError.message : "Sign-in could not be completed.");
      }
    };

    void finishSignIn();
  }, [refresh, router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-center">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-xl shadow-primary/5 space-y-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25">
          R
        </div>

        {error ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">Sign-in could not be completed</h1>
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
                {error}
              </p>
            </div>
            <Button
              className="h-11 w-full rounded-xl text-sm font-semibold shadow-md shadow-primary/20"
              onClick={() => router.replace("/login")}
            >
              Return to sign in
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <div className="space-y-1.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground">Finishing sign-in…</h1>
              <p className="text-xs text-muted-foreground">Please wait a moment while we verify your account.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-center">
          <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-xl shadow-primary/5 space-y-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25">
              R
            </div>
            <div className="space-y-4 py-4">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <div className="space-y-1.5">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Finishing sign-in…</h1>
                <p className="text-xs text-muted-foreground">Please wait a moment while we verify your account.</p>
              </div>
            </div>
          </div>
        </main>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
