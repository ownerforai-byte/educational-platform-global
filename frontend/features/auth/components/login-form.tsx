"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions";
import { useAuth } from "@/providers/auth-provider";
import { getSupabaseBrowserClient, isOAuthProviderEnabled, type OAuthProvider } from "@/lib/supabase/browser";
import { apiFetch } from "@/lib/api-client";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<OAuthProvider | null>(null);

  const handleSocialSignIn = async (provider: OAuthProvider) => {
    setError("");
    setSocialLoading(provider);
    let redirected = false;
    const label = provider === "google" ? "Google" : "Facebook";

    try {
      if (!(await isOAuthProviderEnabled(provider))) {
        setError(`${label} sign-in is not enabled yet. Please use email and password or try again later.`);
        return;
      }

      const csrf = await apiFetch<{ csrfToken: string }>("/api/auth/oauth/csrf", { method: "POST" });
      sessionStorage.setItem("neb_oauth_csrf", csrf.csrfToken);
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      const next = searchParams.get("next");
      if (next && next.startsWith("/") && !next.startsWith("//")) {
        callbackUrl.searchParams.set("next", next);
      }

      const { error: oauthError } = await getSupabaseBrowserClient().auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl.toString() },
      });
      if (oauthError) throw oauthError;
      redirected = true;
    } catch (oauthError) {
      sessionStorage.removeItem("neb_oauth_csrf");
      const authError = oauthError as Error & { code?: string };
      setError(
        authError.code === "validation_failed"
          ? `Supabase ${label} OAuth is disabled or missing provider credentials. Complete ${label} provider setup in Supabase Auth.`
          : oauthError instanceof Error
            ? oauthError.message
            : `${label} sign-in could not be started.`,
      );
    } finally {
      if (!redirected) setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAction({ email, password });
    setLoading(false);

    if (result.ok) {
      refresh();
      // Honor ?next= (e.g. /login?next=/owner) but never allow off-site redirects.
      const next = searchParams.get("next");
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/home";
      router.push(target);
    } else if (result.code === "PENDING_APPROVAL" && result.statusToken) {
      // Waiting for approval → MUST land on the pending-status screen, not
      // stranded on this form with an error the student cannot act on.
      try {
        localStorage.setItem("neb_signup_status_token", result.statusToken);
      } catch {
        /* storage blocked — /welcome falls back to its missing-token state */
      }
      router.push("/welcome");
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl pl-10"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-xl pl-10 pr-10"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" className="h-11 w-full rounded-xl text-sm font-bold shadow-md shadow-primary/20" disabled={loading || socialLoading !== null}>
        {loading ? "Signing in…" : "Sign In"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-xl text-sm font-semibold"
        onClick={() => handleSocialSignIn("facebook")}
        disabled={loading || socialLoading !== null}
      >
        <Facebook className="h-4 w-4" />
        {socialLoading === "facebook" ? "Connecting to Facebook…" : "Continue with Facebook"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-xl text-sm font-semibold"
        onClick={() => handleSocialSignIn("google")}
        disabled={loading || socialLoading !== null}
      >
        <GoogleIcon className="h-4 w-4" />
        {socialLoading === "google" ? "Connecting to Google…" : "Continue with Google"}
      </Button>

      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          New here?
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Link
        href="/signup"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border/70 bg-card text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
      >
        <GraduationCap className="h-4 w-4 text-primary" />
        Create a free account
      </Link>
    </form>
  );
}
