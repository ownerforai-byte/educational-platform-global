"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import { resetPassword } from "@/lib/api/auth";

type Proof = { code?: string; token?: string; oobCode?: string } | null;

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
    const oobCode = search.get("oobCode") || hash.get("oobCode") || undefined;
    const code = oobCode || search.get("code") || hash.get("code") || undefined;
    const token =
      hash.get("access_token") || search.get("access_token") || undefined;
    setProof(code || token ? { code, token, ...(oobCode ? { oobCode } : {}) } : null);
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
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 transition-colors hover:bg-[#B81C33]"
        >
          Sign in now
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
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 transition-colors hover:bg-[#B81C33]"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthField
        id="new-password"
        label="New password"
        placeholder="New Password"
        activePlaceholder="At least 8 characters"
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
        maxLength={72}
        required
      />

      <AuthField
        id="confirm-password"
        label="Confirm new password"
        placeholder="Confirm New Password"
        activePlaceholder="Repeat the new password"
        type={showPassword ? "text" : "password"}
        value={confirm}
        onChange={setConfirm}
        icon={<Lock className="h-5 w-5" />}
        autoComplete="new-password"
        minLength={8}
        maxLength={72}
        required
      />

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="h-[52px] w-full rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 hover:bg-[#B81C33]"
        disabled={loading || proof === undefined}
      >
        {loading ? "Updating…" : "Update Password"}
      </Button>

      <Link
        href="/forgot-password"
        className="block w-full pt-1 text-center text-sm font-bold text-[#D2223D] transition-colors hover:underline"
      >
        Request a new link instead
      </Link>
    </form>
  );
}
