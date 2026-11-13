"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import { signupAction } from "../actions";
import { useAuth } from "@/providers/auth-provider";
import { SocialAuthButtons } from "./social-auth-buttons";
import { VerifyingStatus } from "./verifying-status";
import { tierWelcomePathFor } from "@/lib/core/access-level";
import { rememberPendingSignup } from "../pending-signup-identity";
import { DEVICE_SIGNUP_NOTICE } from "./access-notice";

const PERKS = ["Save progress across subjects", "Bookmark notes & labs", "Veer quiz credits"];

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refresh } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Same as the login form: a failed social consent lands back here with the
  // provider flag so the user sees a hint instead of a blank form.
  const [error, setError] = useState(() => {
    const g = searchParams.get("google_error");
    if (g) return "Google sign-in did not complete. Please try again.";
    return "";
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const result = await signupAction({ fullName, email, password });
    setLoading(false);

    if (result.ok && result.statusToken) {
      // Account creation flow: account created but NOT logged in — hand the
      // signed status token to the /welcome screen, which shows the
      // "created successfully / awaiting approval" state and polls it.
      // The hardcoded pending-signup identity is persisted in three stores so
      // a refresh cannot drop the "account created" state (owner 2026-11-08).
      rememberPendingSignup(result.statusToken);
      router.push("/welcome/pending");
    } else if (result.ok && result.message) {
      setMessage(result.message);
    } else if (result.ok) {
      refresh();
      // Fresh accounts land on their own tier WELCOME page first (2026-10-23) —
      // its Go button opens the tier home with all study materials.
      router.push(tierWelcomePathFor(result.user));
    } else {
      setError(result.error);
    }
  };

  // Same rule as LoginForm: never let a slow session probe hide the signup
  // form (and its Google button). Only a KNOWN signed-in viewer is bounced.
  if (user) {
    return <VerifyingStatus compact label="Opening your plan welcome" />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p
        data-testid="device-signup-notice"
        className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5 text-xs font-semibold leading-relaxed text-amber-600 dark:text-amber-400"
      >
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {DEVICE_SIGNUP_NOTICE}
      </p>
      <AuthField
        id="fullName"
        label="Full name"
        placeholder="Full Name"
        activePlaceholder="Enter Full Name"
        value={fullName}
        onChange={setFullName}
        icon={<User className="h-5 w-5" />}
        autoComplete="name"
      />

      <AuthField
        id="email"
        label="Email Address"
        placeholder="Email Address"
        activePlaceholder="Enter Email Address"
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
        placeholder="Password"
        activePlaceholder="Enter Password"
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
        autoComplete="new-password"
        minLength={8}
        required
      />

      <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Check className="h-3 w-3 text-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {message}
        </p>
      )}

      <Button
        type="submit"
        className="h-[52px] w-full rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 hover:bg-[#B81C33]"
        disabled={loading}
      >
        {loading ? "Creating account…" : "Create Account"}
      </Button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-border/80" />
        <span className="text-xs font-medium text-muted-foreground">Or sign up with</span>
        <div className="h-px flex-1 bg-border/80" />
      </div>

      <SocialAuthButtons mode="signup" disabled={loading} onError={setError} />

      <p className="pt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#D2223D] transition-colors hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
