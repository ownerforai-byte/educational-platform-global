"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField } from "./auth-field";
import { forgotPassword } from "@/lib/api/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      // The server answers identically for known and unknown addresses
      // (anti-enumeration) — show the same confirmation either way.
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Could not send the reset email right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15">
            <Send className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-foreground">
            Check your inbox
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            If an account exists for{" "}
            <span className="font-semibold text-foreground">{email}</span>, a
            password reset link is on its way. It can take a minute or two —
            and please check spam as well.
          </p>
        </div>

        <Link
          href="/login"
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#D2223D] text-[15px] font-bold text-white shadow-lg shadow-[#D2223D]/20 transition-colors hover:bg-[#B81C33]"
        >
          Back to sign in
        </Link>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
          className="w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        {loading ? "Sending the link…" : "Send Reset Link"}
      </Button>

      <Link
        href="/login"
        className="block w-full pt-1 text-center text-sm font-bold text-[#D2223D] transition-colors hover:underline"
      >
        Back to sign in
      </Link>
    </form>
  );
}
