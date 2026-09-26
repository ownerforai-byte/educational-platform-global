"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Home,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";

/**
 * Post-signup status screen (owner-approval flow, 2026-09-26).
 *
 * After signup the user is NOT logged in — they land here with a signed
 * status token (localStorage) and see exactly one of these states:
 *
 *   PENDING  → "account created successfully" + awaiting approval (polls)
 *   ACTIVE   → access granted → sign in
 *   REJECTED → not approved → contact the owner
 *
 * The screen polls the server every few seconds, so the moment the owner
 * approves in the control panel, this page flips to "Access granted" on its
 * own. Login/signup stay hidden here — those belong to the auth pages, and
 * the profile interface belongs to the signed-in app: three mutually
 * exclusive states.
 */

const TOKEN_KEY = "neb_signup_status_token";
const POLL_MS = 6000;

type StatusState =
  | "loading"
  | "missing"
  | "expired"
  | "error"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

export function WelcomeStatus() {
  const [state, setState] = useState<StatusState>("loading");
  const [fullName, setFullName] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const check = useCallback(async () => {
    let token: string | null = null;
    try {
      token = localStorage.getItem(TOKEN_KEY);
    } catch {
      token = null;
    }
    if (!token) {
      setState("missing");
      return;
    }

    try {
      const res = await apiFetch<{
        accessStatus: "PENDING" | "ACTIVE" | "REJECTED";
        fullName?: string | null;
      }>(`/api/auth/account-status?token=${encodeURIComponent(token)}`);
      setFullName(res.fullName ?? null);
      setState(res.accessStatus);
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 401 || status === 404) {
        setState("expired");
      } else {
        // Transient failure: keep showing the last known state; the poll
        // retries. Only surface an error if we never got an answer.
        setState((prev) => (prev === "loading" ? "error" : prev));
      }
    }
  }, []);

  useEffect(() => {
    void check();
    timerRef.current = window.setInterval(() => void check(), POLL_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [check]);

  const firstName = fullName?.trim().split(/\s+/)[0];

  return (
    <div className="space-y-5" data-testid="account-status">
      {/* ── Success headline: the account EXISTS — always shown first ── */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-4 w-4" />
          Your account was created successfully!
        </p>
        {firstName && (
          <p className="mt-1 text-xs text-muted-foreground">
            Welcome aboard, {firstName} — here&apos;s your access status.
          </p>
        )}
      </div>

      {/* ── The one state that matters right now ── */}
      {state === "loading" && (
        <div className="flex flex-col items-center gap-3 py-6 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs">Checking your account status…</p>
        </div>
      )}

      {state === "missing" && (
        <StateCard
          icon={<Clock3 className="h-6 w-6 text-muted-foreground" />}
          title="No pending signup found"
          body="This screen tracks a freshly created account. Create an account to get a status here, or sign in if you already have one."
          actions={
            <>
              <AuthButton href="/signup" label="Create account" primary />
              <AuthButton href="/login" label="Sign in" />
            </>
          }
        />
      )}

      {state === "expired" && (
        <StateCard
          icon={<ShieldAlert className="h-6 w-6 text-amber-500" />}
          title="This status link is no longer valid"
          body="Status links expire after 7 days. Sign in if your account was approved, or create a fresh account."
          actions={
            <>
              <AuthButton href="/login" label="Sign in" primary />
              <AuthButton href="/signup" label="Create account" />
            </>
          }
        />
      )}

      {state === "error" && (
        <StateCard
          icon={<RefreshCw className="h-6 w-6 text-amber-500" />}
          title="Couldn't reach the server"
          body="We couldn't check your status just now — this page keeps retrying automatically."
          actions={<button
            onClick={() => void check()}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Check now
          </button>}
        />
      )}

      {state === "PENDING" && (
        <StateCard
          icon={
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/40" />
              <Clock3 className="relative h-6 w-6 text-amber-500" />
            </span>
          }
          title="Awaiting approval"
          body="Your account is created and pending review. You can sign in the moment an owner grants access — this page checks automatically, so keep it open or come back anytime."
          badge={<StatusPill status="PENDING" />}
          actions={
            <>
              <button
                onClick={() => void check()}
                className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Check now
              </button>
              <AuthButton href="/" label="Back to home" />
            </>
          }
        />
      )}

      {state === "ACTIVE" && (
        <StateCard
          icon={<BadgeCheck className="h-6 w-6 text-emerald-500" />}
          title="Access granted!"
          body="Your account has been approved. Sign in to jump into your classes, saved chats and daily credits."
          badge={<StatusPill status="ACTIVE" />}
          actions={
            <AuthButton href="/login" label="Sign in now" primary big />
          }
        />
      )}

      {state === "REJECTED" && (
        <StateCard
          icon={<ShieldAlert className="h-6 w-6 text-destructive" />}
          title="Account not approved"
          body="This account wasn't approved for access. If you believe this is a mistake, contact the platform owner."
          badge={<StatusPill status="REJECTED" />}
          actions={<AuthButton href="/" label="Back to home" />}
        />
      )}
    </div>
  );
}

function StateCard({
  icon,
  title,
  body,
  badge,
  actions,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-muted/20 p-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background border border-border/60 shadow-sm">
        {icon}
      </span>
      <div className="space-y-1.5">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-base font-extrabold tracking-tight">{title}</h2>
          {badge}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">{body}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center justify-center gap-2 pt-1">{actions}</div>}
    </div>
  );
}

function StatusPill({ status }: { status: "PENDING" | "ACTIVE" | "REJECTED" }) {
  const styles = {
    PENDING: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
    ACTIVE: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    REJECTED: "bg-destructive/15 border-destructive/30 text-destructive",
  } as const;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}

function AuthButton({
  href,
  label,
  primary,
  big,
}: {
  href: string;
  label: string;
  primary?: boolean;
  big?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? `inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${
              big ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs"
            }`
          : `inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card font-medium text-foreground hover:bg-muted transition-colors ${
              big ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs"
            }`
      }
    >
      {label}
      {primary && <ArrowRight className={big ? "h-4 w-4" : "h-3.5 w-3.5"} />}
    </Link>
  );
}
