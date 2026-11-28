"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  firebaseConsumeRedirectResult,
  firebaseCurrentUserToken,
  firebaseGoogleSignIn,
  isFirebaseAuthEnabled,
  FirebaseMfaRequiredError,
} from "@/lib/firebase/client-auth";
import { apiFetch, setStoredToken } from "@/lib/api-client";
import { writeCachedSession } from "@/lib/auth/session-store";
import { useAuth } from "@/providers/auth-provider";
import { tierHomePathFor } from "@/lib/core/access-level";
import {
  DENIED_ROUTE,
  WAITING_ROUTE,
  clearPendingSignup,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";
import { logAuthFailureDetail } from "@/features/auth/auth-debug";
import { authFailureMessage } from "@/features/auth/public-messages";
import { useAuthFormError } from "@/features/auth/use-auth-form-error";
import type { OAuthSessionResponse } from "@/types/api";

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
        if (isFirebaseAuthEnabled()) {
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
          // Auth is Firebase-only (Supabase auth fully removed 2026-01). If the
          // Firebase client isn't configured, fail loudly rather than fall
          // through to a removed Supabase exchange path.
          throw new Error("Firebase sign-in is not configured on this deployment.");
        }

        const csrfState = sessionStorage.getItem("neb_oauth_csrf");
        if (!csrfState) throw new Error("Sign-in verification expired or failed. Please try again.");

        const response = await apiFetch<OAuthSessionResponse>("/api/auth/oauth/session", {
          method: "POST",
          headers: { "X-CSRF-Token": csrfState },
          body: JSON.stringify({
            accessToken,
            state: csrfState,
          }),
        });
        sessionStorage.removeItem("neb_oauth_csrf");

        // The app's backend validates the access token and sets its own

        // A brand-new Google account can be PENDING. The backend sets the
        // HttpOnly status cookie and returns the waiting-screen code.
        const oauthBody = response as unknown as { code?: string };
        if (oauthBody.code === "PENDING_APPROVAL") {
          rememberPendingSignup();
          router.replace(WAITING_ROUTE);
          return;
        }

        if (!response.accessToken) throw new Error("The server did not issue an application session.");
        clearPendingSignup();
        setStoredToken(response.accessToken);
        writeCachedSession(response.user, response.accessToken);
        refresh();
        router.replace(tierHomePathFor(response.user));
      } catch (callbackError) {
        if (callbackError instanceof FirebaseMfaRequiredError) {
          const mfaMessage =
            "Google sign-in needs your SMS verification code. Use email and password on the login page, then enter the code when prompted.";
          logAuthFailureDetail(callbackError, "oauth", mfaMessage);
          setError(mfaMessage);
          return;
        }
        const authError = callbackError as Error & { code?: string };
        if (authError.code === "PENDING_APPROVAL") {
          rememberPendingSignup();
          router.replace(WAITING_ROUTE);
          return;
        }
        if (authError.code === "ACCOUNT_REJECTED") {
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
