"use client";

import { continueWithGoogle, continueWithFacebook } from "@/lib/api/auth";

/**
 * The multicolor Google "G" mark. It's a brand asset, so an inline SVG keeps
 * the component self-contained (no new dependency, no external image).
 */
function GoogleGMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M45.12 24.5c0-1.6-.14-3.1-.42-4.55H24v9.08h11.74c-.51 2.77-2.15 5.15-4.58 6.72v5.59h7.41c4.33-3.89 6.55-9.56 6.55-16.84Z"
        fill="#4285F4"
      />
      <path
        d="M24 46c6.27 0 11.55-2.07 15.49-5.59l-7.41-5.59c-2.03 1.35-4.64 2.15-8.08 2.15-6.19 0-11.44-4.17-13.37-9.78H3.09v5.74C5.08 40.93 13.78 46 24 46Z"
        fill="#34A853"
      />
      <path
        d="M10.63 27.18C10.34 25.97 10.2 24.5 10.2 23c0-1.5.14-2.97.43-4.18v-5.74H3.09A19.86 19.86 0 0 0 2 23c0 3.65.86 7.11 2.41 10.14l7.22-5.96Z"
        fill="#FBBC05"
      />
      <path
        d="M24 10.75c3.54 0 6.71 1.22 9.22 3.61l6.65-6.65C35.45 3.98 29.9 2 24 2 13.78 2 5.08 7.07 3.09 14.32l7.55 5.74C12.56 14.92 17.81 10.75 24 10.75Z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * "Continue with Google" button.
 *
 * Top-level navigation into the backend-driven Supabase OAuth flow:
 * `GET /api/auth/google` → Supabase Google authorize → user grants consent →
 * `GET /api/auth/callback/google` sets the session cookies and lands on /home.
 * Because it navigates away and back, callers must not rely on post-click
 * local React state — the reloaded app re-hydrates the session itself.
 */
export function GoogleSignInButton({ label = "Continue with Google" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => continueWithGoogle()}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border/70 bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      aria-label={label}
    >
      <GoogleGMark className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

/**
 * "Continue with Facebook" button — same top-level navigation pattern as the
 * Google button, into `GET /api/auth/facebook` → Supabase Facebook authorize →
 * consent → `GET /api/auth/callback/facebook` → session cookies → /home.
 */
function FacebookFMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 23.96V15.86H7.08V12.07H10.13V9.38C10.13 6.3 11.82 4.68 14.66 4.68C16.04 4.68 17.44 4.91 17.44 4.91V7.96H15.92C14.49 7.96 14.01 8.83 14.01 9.74V12.07H17.34L16.89 15.86H14.01V23.96C19.75 23.09 24 18.1 24 12.07Z"
        fill="#1877F2"
      />
    </svg>
  );
}

export function FacebookSignInButton({ label = "Continue with Facebook" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => continueWithFacebook()}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border/70 bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      aria-label={label}
    >
      <FacebookFMark className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}
