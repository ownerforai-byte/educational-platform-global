"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  firebaseConsumeRedirectResult,
  firebaseCurrentUserToken,
  firebaseGoogleSignIn,
  useFirebaseClientAuth,
} from "@/lib/firebase/client-auth";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { PUBLIC_SUPABASE_URL } from "@/lib/supabase/public-config";
import { apiFetch, setStoredToken } from "@/lib/api-client";
import { writeCachedSession } from "@/lib/auth/session-store";
import { useAuth } from "@/providers/auth-provider";
import { tierWelcomePathFor } from "@/lib/core/access-level";
import {
  DENIED_ROUTE,
  WAITING_ROUTE,
  clearPendingSignup,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";
import { authFailureMessage } from "@/features/auth/public-messages";
import { useAuthFormError } from "@/features/auth/use-auth-form-error";
import type { OAuthSessionResponse } from "@/types/api";

/**
 * Drop the supabase-js session record WITHOUT hitting its logout endpoint.
 * `signOut({ scope: "local" })` still POSTs /auth/v1/logout — and Supabase
 * GoTrue deletes the server-side session on any logout, killing the exact
 * access + refresh tokens this page just handed to the app backend. The
 * backend's own /me then 401s and a successful OAuth sign-in ends signed out.
 */
function clearSupabaseLocalSession(): void {
  try {
    const projectRef = new URL(PUBLIC_SUPABASE_URL).hostname.split(".")[0];
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
  const { error, setError } = useAuthFormError("", {
    onTemporaryCleared: () => router.replace("/login"),
  });

  useEffect(() => {
    if (callbackStarted.current) return;
    callbackStarted.current = true;
    const finishSignIn = async () => {
      try {
        const errorCode = searchParams.get("error");
        const errorDesc = searchParams.get("error_description");
        if (errorCode || errorDesc) {
          throw new Error("oauth_denied");
        }

        let accessToken: string;
        let refreshToken: string | undefined;
        if (useFirebaseClientAuth()) {
          const state = sessionStorage.getItem("neb_oauth_csrf");
          if (!state || !/^[a-f0-9]{64}$/.test(state)) {
            throw new Error("Sign-in verification expired or failed. Please try again.");
          }

          // Consume any pending Google redirect result FIRST. `getRedirectResult`
          // resolves the credential exactly once — when Firebase lands back on
          // this URL after the provider round-trip — regardless of the query
          // string that round-trip preserved. Deciding on ?firebase_start alone
          // re-triggered signInWithRedirect on the post-redirect land (the
          // marker was never stripped), looping "Finishing sign-in…" forever.
          let idToken = await firebaseConsumeRedirectResult();
          if (!idToken && searchParams.get("firebase_start") === "1") {
            // Initial handoff: no result yet and the caller asked us to start
            // the redirect. Drop the marker before leaving so Firebase's return
            // URL is clean and this branch can never fire again on the way back.
            window.history.replaceState(null, "", window.location.pathname);
            await firebaseGoogleSignIn("redirect");
            return;
          }
          if (!idToken) {
            // Return trip where `getRedirectResult` came back empty (already
            // consumed, or the SDK restored the user from persistence): read the
            // token from the signed-in user instead of failing the sign-in.
            idToken = await firebaseCurrentUserToken();
          }
          if (!idToken) throw new Error("The provider did not return a valid session.");
          accessToken = idToken;
        } else {
          const state = sessionStorage.getItem("neb_oauth_csrf");
          if (!state || !/^[a-f0-9]{64}$/.test(state)) {
            throw new Error("Sign-in verification expired or failed. Please try again.");
          }
          const code = searchParams.get("code");
          if (!code) throw new Error("The provider did not return an authorization code.");
          const client = getSupabaseBrowserClient();
          const { data, error: exchangeError } = await client.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          if (!data.session?.access_token) throw new Error("The provider did not return a valid session.");
          accessToken = data.session.access_token;
          refreshToken = data.session.refresh_token;
        }

        const csrfState = sessionStorage.getItem("neb_oauth_csrf");
        if (!csrfState) throw new Error("Sign-in verification expired or failed. Please try again.");

        const response = await apiFetch<OAuthSessionResponse>("/api/auth/oauth/session", {
          method: "POST",
          headers: { "X-CSRF-Token": csrfState },
          body: JSON.stringify({
            accessToken,
            ...(refreshToken ? { refreshToken } : {}),
            state: csrfState,
          }),
        });
        sessionStorage.removeItem("neb_oauth_csrf");

        // The app's backend validates the access token and sets its own
        // HttpOnly session/refresh cookies. Drop the local SDK record only
        // after the exchange succeeds; on failure keep OAuth details for a
        // safe retry.
        clearSupabaseLocalSession();

        // A brand-new Google account is PENDING (bot auto-approves in ~5 min).
        // The backend answers 200 + { code: "PENDING_APPROVAL", statusToken }
        // with NO accessToken — that is not a failure, it's the waiting-screen
        // handoff. The login form handles this in pendingApprovalResult; the
        // OAuth path must too or every new Google sign-in dies on the generic
        // "did not issue a session" error below.
        const oauthBody = response as unknown as { code?: string; statusToken?: string };
        if (oauthBody.code === "PENDING_APPROVAL") {
          if (oauthBody.statusToken) rememberPendingSignup(oauthBody.statusToken);
          rememberAccessOutcome("PENDING");
          router.replace(WAITING_ROUTE);
          return;
        }

        if (!response.accessToken) throw new Error("The server did not issue an application session.");
        clearPendingSignup();
        setStoredToken(response.accessToken);
        writeCachedSession(response.user, response.accessToken);
        refresh();
        router.replace(tierWelcomePathFor(response.user));
      } catch (callbackError) {
        const authError = callbackError as Error & { code?: string; statusToken?: string };
        if (authError.code === "PENDING_APPROVAL" && authError.statusToken) {
          rememberPendingSignup(authError.statusToken);
          rememberAccessOutcome("PENDING");
          router.replace(WAITING_ROUTE);
          return;
        }
        if (authError.code === "ACCOUNT_REJECTED") {
          if (authError.statusToken) rememberPendingSignup(authError.statusToken);
          rememberAccessOutcome("REJECTED");
          router.replace(DENIED_ROUTE);
          return;
        }
        setError(authFailureMessage(callbackError, "oauth"));
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
              <h1 className="text-xl font-bold tracking-tight text-foreground">Sign-in did not complete</h1>
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
