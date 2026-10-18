"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { apiFetch, setStoredToken } from "@/lib/api-client";
import { writeCachedSession } from "@/lib/auth/session-store";
import { useAuth } from "@/providers/auth-provider";
import type { OAuthSessionResponse } from "@/types/api";

function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/home";
}

export default function AuthCallbackPage() {
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
        const callbackError = searchParams.get("error_description") ?? searchParams.get("error");
        if (callbackError) throw new Error(callbackError);

        const code = searchParams.get("code");
        if (!code) throw new Error("The provider did not return an authorization code.");
        const state = sessionStorage.getItem("neb_oauth_csrf");
        if (!state || !/^[a-f0-9]{64}$/.test(state)) {
          throw new Error("Sign-in verification failed. Please try again.");
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
        // HttpOnly session/refresh cookies. Clear local SDK state only after
        // exchange succeeds; on failure keep OAuth details for safe retry.
        await client.auth.signOut({ scope: "local" });
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-3">
        {error ? (
          <>
            <h1 className="text-xl font-bold">Sign-in could not be completed</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button className="text-sm font-semibold text-primary underline" onClick={() => router.replace("/login")}>
              Return to sign in
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <h1 className="text-xl font-bold">Finishing sign-in…</h1>
            <p className="text-sm text-muted-foreground">Please wait while we verify your account.</p>
          </>
        )}
      </div>
    </main>
  );
}
