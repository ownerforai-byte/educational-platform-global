"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Home,
  Mail,
  RefreshCw,
  ShieldAlert,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { VisitorExitNote } from "@/components/layout/visitor-exit-note";
import { VerifyingStatus } from "./verifying-status";
import {
  APPROVED_ROUTE,
  NORMAL_ROUTE,
  REJECTED_ROUTE,
  clearPendingSignup,
  readStatusToken,
  rememberAccessOutcome,
  rememberPendingSignup,
} from "../pending-signup-identity";

/**
 * WAITING screen body — polls live access for this device's status token.
 *
 *   PENDING  → stay here (awaiting approval)
 *   ACTIVE   → remember outcome + open /welcome/approved
 *   REJECTED → remember outcome + open /welcome/rejected
 */

const POLL_MS = 6000;

type StatusState =
  | "loading"
  | "missing"
  | "expired"
  | "error"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

/** Which step of the approval pipeline the current state maps to. */
const STEP_INDEX: Record<StatusState, number> = {
  loading: 0,
  missing: 0,
  expired: 0,
  error: 0,
  PENDING: 1,
  ACTIVE: 2,
  REJECTED: 1,
};

const STEPS = [
  { icon: UserCheck, label: "Account created", hint: "Your details are saved" },
  { icon: Clock3, label: "Awaiting approval", hint: "Administrative review" },
  { icon: BadgeCheck, label: "Access granted", hint: "Sign in and start learning" },
];

/**
 * Seed the status token from `?status_token=...` when the Google OAuth
 * callback hands a PENDING account straight here. Persist it to localStorage
 * so the polling works on reload, then clear the query string so a manual
 * refresh doesn't reseed an expired token.
 */
function useUrlStatusToken() {
  useEffect(() => {
    // Read the status token the Google callback hands over (?status_token=...).
    // Done from window.location (not useSearchParams) so the /welcome page
    // stays prerender-safe — no Suspense boundary required.
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("status_token");
    if (!fromUrl) return;
    // Persist to all three hardcoded mirrors before dropping the query string.
    rememberPendingSignup(fromUrl);
    // Drop the query string so a manual refresh doesn't reseed an old token.
    window.history.replaceState(null, "", window.location.pathname);
  }, []);
}

export function WelcomeStatus() {
  useUrlStatusToken();
  const [state, setState] = useState<StatusState>("loading");
  const [fullName, setFullName] = useState<string | null>(null);
  /** Live tally — bumps only on "Check now" (profiles.status_check_count). */
  const [checkCount, setCheckCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const check = useCallback(async (opts?: { bump?: boolean }) => {
    // Recover from localStorage / sessionStorage / the hardcoded cookie, so a
    // refresh or a cleared store cannot lose the "account created" identity.
    const token = readStatusToken();
    if (!token) {
      clearPendingSignup();
      setState("missing");
      return;
    }

    const bump = opts?.bump === true;
    const qs = new URLSearchParams({ token });
    if (bump) qs.set("bump", "1");

    try {
      const res = await apiFetch<{
        accessStatus: "PENDING" | "ACTIVE" | "REJECTED";
        fullName?: string | null;
        checkCount?: number;
      }>(`/api/auth/account-status?${qs.toString()}`);
      setFullName(res.fullName ?? null);
      if (typeof res.checkCount === "number" && Number.isFinite(res.checkCount)) {
        setCheckCount(res.checkCount);
      }
      rememberAccessOutcome(res.accessStatus);
      setState(res.accessStatus);
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 401 || status === 404) {
        // Deleted / expired signup — wipe local mirrors so no coded screen sticks.
        clearPendingSignup();
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

  // Terminal / empty outcomes leave the waiting page for the live screen.
  useEffect(() => {
    if (state === "ACTIVE") {
      window.location.replace(APPROVED_ROUTE);
      return;
    }
    if (state === "REJECTED") {
      window.location.replace(REJECTED_ROUTE);
      return;
    }
    if (state === "missing" || state === "expired") {
      window.location.replace(NORMAL_ROUTE);
    }
  }, [state]);

  const firstName = fullName?.trim().split(/\s+/)[0];
  const step = STEP_INDEX[state];
  const accountConfirmed = state === "PENDING";

  if (
    state === "ACTIVE" ||
    state === "REJECTED" ||
    state === "missing" ||
    state === "expired"
  ) {
    const label =
      state === "ACTIVE"
        ? "Opening approved screen"
        : state === "REJECTED"
          ? "Opening rejected screen"
          : "Opening no-account screen";
    return (
      <div className="flex justify-center py-6" data-testid="account-status-handoff">
        <VerifyingStatus compact label={label} />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="account-status">
      {/* ── Success headline: shown ONLY when an account really exists ── */}
      {accountConfirmed && (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-4 w-4" />
          Your account was created successfully!
        </p>
        {fullName ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Welcome aboard, {firstName} — checking the approval status of{" "}
            <span className="font-semibold text-foreground">{fullName}</span>.
          </p>
        ) : null}
      </div>
      )}

      {/* ── Approval pipeline stepper ──────────────────────────────── */}
      <ol className="grid grid-cols-3 gap-2" aria-label="Approval progress">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          // ACTIVE/REJECTED hand off above — this stepper only renders wait states.
          const done = i < step;
          const current = i === step;
          return (
            <li
              key={s.label}
              className={`relative rounded-2xl border p-3 text-center transition-colors ${
                done
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : current
                    ? "border-primary/40 bg-primary/10"
                    : "border-border/60 bg-muted/30"
              }`}
            >
              <span
                className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${
                  done
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : current
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {current && state === "PENDING" ? (
                  // Infinite yellow "outgoing" pulse radiating from the
                  // awaiting-approval clock (owner request 2026-10-17). The
                  // clock stays put in the middle while a yellow ring expands
                  // outward forever — the "something is on its way" signal.
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/50" />
                    <Clock3 className="relative h-5 w-5 text-amber-500" />
                  </span>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </span>
              <p className="text-[11px] font-bold leading-tight">{s.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {s.hint}
              </p>
            </li>
          );
        })}
      </ol>

      {/* ── The one state that matters right now ── */}
      {state === "loading" && (
        <VerifyingStatus compact label="Checking your account status" />
      )}

      {state === "error" && (
        <StateCard
          icon={<RefreshCw className="h-5 w-5 text-amber-500" />}
          title="Couldn't reach the server"
          body="We couldn't check your status just now — this page keeps retrying automatically."
          actions={
            <button
              onClick={() => void check({ bump: true })}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Check now
            </button>
          }
        />
      )}

      {state === "PENDING" && (
        <StateCard
          icon={
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/40" />
              <span
                className="relative text-[9px] font-extrabold uppercase tracking-wider text-amber-500"
                aria-hidden="true"
              >
                Pending
              </span>
            </span>
          }
          title="Awaiting approval"
          badge={<StatusPill status="PENDING" />}
          body={`Your account was created and is awaiting approval. You can sign in after administrative and system approval — this page checks live every few seconds (checked ${checkCount}×), so keep it open or come back anytime.`}
          actions={
            <>
              <button
                onClick={() => void check({ bump: true })}
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

      {/* While waiting: the pending user can still send the owner a message. */}
      {state === "PENDING" && <MessageOwnerBox name={fullName} />}

      {/* Owner request 2026-10-17: a candid exit note for visitors. */}
      {state === "PENDING" && <VisitorExitNote />}

      {/* ── Trust footer — kept, with its sign, below the note (owner 2026-10-17) ── */}
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        Approval is handled manually by the platform owner — usually within a day.
      </p>
    </div>
  );
}

/**
 * A pending user can write to the owner while they wait (owner request
 * 2026-10-17: "also sending message do available"). The composer opens the
 * sender's own mail app addressed to the owner, with their identity and the
 * note prefilled — honest "sending" with no backend inbox to wire up.
 */
function MessageOwnerBox({ name }: { name: string | null }) {
  const [message, setMessage] = useState("");
  const first = name?.trim().split(/\s+/)[0] ?? "there";
  const send = () => {
    const subject = encodeURIComponent("Account approval — a note while I wait");
    const body = encodeURIComponent(
      `Hi Ravikisan,\n\nI'm waiting for account approval and wanted to send a quick note.\n\n${
        message.trim() || "(no message)"
      }\n\n— ${name ?? "A new student"}`,
    );
    window.location.href = `mailto:sahrocky81@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
      <p className="flex items-center gap-1.5 text-xs font-bold text-foreground">
        <Mail className="h-3.5 w-3.5 text-amber-500" />
        Send a message while you wait
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {name ? (
          <>
            Signed as{" "}
            <span className="font-semibold text-foreground">{name}</span>.{" "}
          </>
        ) : null}
        The owner reads every note — say hello, ask a question, or tell us what
        you need.
      </p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Hi ${first} — write your message here…`}
        rows={3}
        className="mt-2 w-full rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
      />
      <button
        type="button"
        onClick={send}
        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <Send className="h-3.5 w-3.5" />
        Send to owner
      </button>
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
    <div className="animate-pop-in flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-muted/20 p-6 text-center">
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

function StatusPill({ status }: { status: "PENDING" | "ACTIVE" }) {
  const styles = {
    PENDING: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
    ACTIVE: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
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
          ? `inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${big ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs"}`
          : `inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card font-medium text-foreground hover:bg-muted transition-colors ${big ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs"}`
      }
    >
      {label}
      {primary && <ArrowRight className={big ? "h-4 w-4" : "h-3.5 w-3.5"} />}
    </Link>
  );
}
