"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  getSupabaseBrowserClient,
  isOAuthProviderEnabled,
  type OAuthProvider,
} from "@/lib/supabase/browser";
import { apiFetch } from "@/lib/api-client";
import {
  isOAuthAccessBlocked,
  oauthAccessBlockedMessage,
  oauthCallbackUrl,
} from "@/lib/supabase/oauth-config";

export function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface SocialAuthButtonsProps {
  mode?: "login" | "signup";
  disabled?: boolean;
  onError?: (error: string) => void;
}

const CSRF_TIMEOUT_MS = 10_000;
const COLD_START_MESSAGE =
  "Sign-in is taking too long to start (the server may be warming up). Please try again in a moment.";

/**
 * The CSRF handshake talks to the Render backend, which can be cold. A bare
 * fetch with no timeout left the Google button spinning forever with no
 * feedback, which reads as "OAuth is blocked". Bound each attempt and retry
 * once so a cold start recovers on its own.
 */
async function requestOAuthCsrf(): Promise<string> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CSRF_TIMEOUT_MS);
    try {
      const csrf = await apiFetch<{ csrfToken: string }>("/api/auth/oauth/csrf", {
        method: "POST",
        signal: controller.signal,
      });
      if (!/^[a-f0-9]{64}$/.test(csrf?.csrfToken ?? "")) {
        throw new Error("Invalid sign-in verification token.");
      }
      return csrf.csrfToken;
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timer);
    }
  }
  const message = lastError instanceof Error ? lastError.message : "";
  if (/abort|aborted|timeout/i.test(message) || !message) {
    throw new Error(COLD_START_MESSAGE);
  }
  throw lastError instanceof Error ? lastError : new Error(COLD_START_MESSAGE);
}

/**
 * Facebook sign-in is temporarily HIDDEN from the login/signup pages because
 * the Supabase ⇄ Meta "exchange external code" step was failing (client
 * id/secret + redirect-URI mismatch across the two Meta apps). The flow, routes
 * and this button are all still in place — flip this flag back to `true` to
 * re-show the Facebook button the moment the Meta app credentials are fixed.
 * Google is unaffected and stays visible.
 */
const SHOW_FACEBOOK = false;

export function SocialAuthButtons({
  mode = "login",
  disabled = false,
  onError,
}: SocialAuthButtonsProps) {
  const [socialLoading, setSocialLoading] = useState<OAuthProvider | null>(null);

  const handleSocialSignIn = async (provider: OAuthProvider) => {
    setSocialLoading(provider);
    onError?.("");
    let redirected = false;
    const label = provider === "google" ? "Google" : "Facebook";

    try {
      if (!(await isOAuthProviderEnabled(provider))) {
        onError?.(
          `${label} sign-in is temporarily unavailable. Please sign in with email or try again later.`,
        );
        return;
      }

      const csrfToken = await requestOAuthCsrf();
      sessionStorage.setItem("neb_oauth_csrf", csrfToken);

      // ONE canonical callback for every deployed host (owner 2026-11-08).
      // Building it from window.location.origin produced a different redirect
      // URI on preview/www/custom hosts — Google rejects every unregistered
      // one with "Access blocked". See lib/supabase/oauth-config.ts.
      const { error: oauthError } = await getSupabaseBrowserClient().auth.signInWithOAuth({
        provider,
        options: { redirectTo: oauthCallbackUrl() },
      });
      if (oauthError) throw oauthError;
      redirected = true;
    } catch (oauthError) {
      sessionStorage.removeItem("neb_oauth_csrf");
      // A blocked/mismatched OAuth client is a CONFIG problem, not a transient
      // one — name the exact URLs to register instead of a vague "unavailable".
      onError?.(
        isOAuthAccessBlocked(oauthError)
          ? oauthAccessBlockedMessage(label)
          : oauthError instanceof Error
            ? oauthError.message
            : `${label} sign-in could not be started.`,
      );
    } finally {
      if (!redirected) setSocialLoading(null);
    }
  };

  const actionText = mode === "signup" ? "Sign up" : "Continue";

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        aria-label={`${actionText} with Google`}
        title={`${actionText} with Google`}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all hover:bg-muted/60 active:scale-95 disabled:opacity-60"
        onClick={() => handleSocialSignIn("google")}
        disabled={disabled || socialLoading !== null}
      >
        {socialLoading === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <GoogleIcon className="h-6 w-6" />
        )}
      </button>

      {SHOW_FACEBOOK && (
        <button
          type="button"
          aria-label={`${actionText} with Facebook`}
          title={`${actionText} with Facebook`}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all hover:bg-muted/60 active:scale-95 disabled:opacity-60"
          onClick={() => handleSocialSignIn("facebook")}
          disabled={disabled || socialLoading !== null}
        >
          {socialLoading === "facebook" ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#1877F2]" />
          ) : (
            <FacebookIcon className="h-6 w-6" />
          )}
        </button>
      )}
    </div>
  );
}

