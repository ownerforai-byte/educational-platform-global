"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Eye, EyeOff, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions";
import { useAuth } from "@/providers/auth-provider";
import { SocialAuthButtons } from "./social-auth-buttons";
import { VerifyingStatus } from "./verifying-status";
import { tierWelcomePathFor } from "@/lib/access-level";

export function LoginForm() {
  const router = useRouter();
  const { user, refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAction({ email, password });
    setLoading(false);

    if (result.ok) {
      refresh();
      // Go on the visitor welcome is the one step that opens login. Once
      // authenticated, always show the user's own tier welcome before home;
      // do not let a stale or supplied ?next= skip that screen.
      router.push(tierWelcomePathFor(result.user));
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

  // A slow or hanging /api/auth/me (Render cold start, offline, proxy timeout)
  // used to hide this ENTIRE form behind "Checking your session" — which also
  // hid "Continue with Google", making OAuth look blocked even though Supabase
  // was healthy. Render the form immediately; only a KNOWN signed-in session
  // shows the redirect placeholder. LoggedInRedirect still bounces that user
  // once the session resolves.
  if (user) {
    return <VerifyingStatus compact label="Opening your plan welcome" />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-xl pl-3.5 pr-10"
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

      <Button
        type="submit"
        className="h-11 w-full rounded-xl text-sm font-bold shadow-md shadow-primary/20"
        disabled={loading}
      >
        {loading ? "Signing in…" : "Sign In"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-border/80" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or continue with
        </span>
        <div className="h-px flex-1 bg-border/80" />
      </div>

      <SocialAuthButtons mode="login" disabled={loading} onError={setError} />

      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-border/80" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          New here?
        </span>
        <div className="h-px flex-1 bg-border/80" />
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
