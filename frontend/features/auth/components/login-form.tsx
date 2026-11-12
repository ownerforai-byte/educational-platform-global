"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import { loginAction } from "../actions";
import { useAuth } from "@/providers/auth-provider";
import { SocialAuthButtons } from "./social-auth-buttons";
import { VerifyingStatus } from "./verifying-status";
import { tierWelcomePathFor } from "@/lib/access-level";
import {
  clearPendingSignup,
  rememberPendingSignup,
} from "../pending-signup-identity";
import { DEVICE_SIGNUP_NOTICE } from "./access-notice";

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
      // Persist the hardcoded identity so the status screen survives refresh.
      rememberPendingSignup(result.statusToken);
      router.push("/welcome");
    } else if (result.code === "ACCOUNT_REJECTED") {
      // Rejection ends the waiting flow — back to normal guest browsing.
      // Do not open /welcome (that duplicated the rejected experience).
      clearPendingSignup();
      router.replace("/");
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <p
        data-testid="device-signup-notice"
        className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5 text-xs font-semibold leading-relaxed text-amber-600 dark:text-amber-400"
      >
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {DEVICE_SIGNUP_NOTICE}
      </p>

      <AuthField
        id="email"
        label="Email Address"
        placeholder="Verner"
        activePlaceholder="Verner"
        type="email"
        value={email}
        onChange={setEmail}
        icon={<Mail className="h-5 w-5" />}
        autoComplete="email"
        required
      />

      <AuthField
        id="password"
        label="Password"
        placeholder="Verner"
        activePlaceholder="Verner"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        icon={<Lock className="h-5 w-5" />}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
        autoComplete="current-password"
        required
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-bold text-[#D2223D] transition-colors hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="h-[52px] w-full rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 hover:bg-[#B81C33]"
        disabled={loading}
      >
        {loading ? "Signing in…" : "Sign In"}
      </Button>

      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1 bg-border/80" />
        <span className="text-xs font-medium text-muted-foreground">Or continue with</span>
        <div className="h-px flex-1 bg-border/80" />
      </div>

      <SocialAuthButtons mode="login" disabled={loading} onError={setError} />

      <p className="pt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-[#D2223D] transition-colors hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}