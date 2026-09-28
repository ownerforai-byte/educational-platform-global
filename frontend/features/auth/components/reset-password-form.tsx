"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/api/auth";

type Proof = { code?: string; token?: string } | null;

/**
 * Landing page for the Supabase recovery link. Depending on the project's
 * flow it arrives as ?code=… (PKCE) or #access_token=…&type=recovery
 * (implicit) — whichever form it takes, the proof is forwarded to the
 * backend together with the new password and never stored anywhere else.
 */
export function ResetPasswordForm() {
  const [proof, setProof] = useState<Proof>(undefined as unknown as Proof);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // The proof lives in the URL (query + hash), so it can only be read after
  // mount — the first client paint must match the server render.
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = search.get("code") || hash.get("code") || undefined;
    const token =
      hash.get("access_token") || search.get("access_token") || undefined;
    setProof(code || token ? { code, token } : null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8 || password.length > 72) {
      setError("Password must be between 8 and 72 characters.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    if (!proof) return;

    setLoading(true);
    try {
      await resetPassword({ password, ...proof });
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Could not update the password. Please request a new link."
      );
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-foreground">
            Password updated
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Your new password is live. Sign in with it whenever you're ready.
          </p>
        </div>
        <Link
          href="/login"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-opacity hover:opacity-90"
        >
          Sign in now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  // Still reading the URL on the first paint — render the form (empty) so
  // server and client HTML match; the invalid state lands right after.
  if (proof === null) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-sm font-bold text-foreground">
            This reset link is missing or expired
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Recovery links are single-use and short-lived. Ask for a fresh one
            and open it right away.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-opacity hover:opacity-90"
        >
          Request a new link
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="new-password">
          New password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="new-password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-xl pl-10 pr-10"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
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

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="confirm-password">
          Confirm new password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Repeat the new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-11 rounded-xl pl-10"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
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
        disabled={loading || proof === undefined}
      >
        {loading ? "Updating…" : "Update password"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>

      <Link
        href="/forgot-password"
        className="block w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Request a new link instead
      </Link>
    </form>
  );
}
