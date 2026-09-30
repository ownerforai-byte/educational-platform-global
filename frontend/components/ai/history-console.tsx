"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  History,
  Search,
  Loader2,
  Sparkles,
  MessageSquare,
  ArrowRight,
  SignpostBig,
  AlertTriangle,
  LogIn,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  getChatSessions,
  searchHistory,
  type ChatSessionSummary,
  type HistorySearchResponse,
  type HistorySearchSession,
} from "@/lib/api/history-search";

/**
 * HISTORY CONSOLE (owner request 2026-09-30).
 *
 * "Create and route a separate interface for tutor console and history — its
 * work is specially to search chat history and present them as asked."
 *
 * So this page does not teach. You ask it about your OWN saved conversations
 * ("what did we discuss about capacitors?", "where did we leave the lens
 * derivation?") and the AI — Agnes first in the chain, like every other reply —
 * presents what it finds, conversation by conversation. The search itself
 * happens on the server (backend/src/ai/history-search.ts): only matching
 * messages are attached, matched exchanges bring their other half, and when
 * nothing matches the answer comes back without spending a model call at all.
 *
 * Access, per the owner's decision: FREE for signed-in students, guests
 * blocked. No credit is spent here, and the backend enforces the same rule with
 * requireAuth — the gate in this component is only the honest UI for it.
 */

const EXAMPLES = [
  "What did we discuss about capacitors?",
  "Where did we leave the lens derivation?",
  "Summarise everything I asked about chemistry",
  "Which questions did I ask but never finish?",
];

export function HistoryConsole() {
  const { user, isLoading: sessionLoading } = useSession();
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState<HistorySearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [migrated, setMigrated] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    void (async () => {
      try {
        const result = await getChatSessions();
        if (!alive) return;
        setSessions(result.sessions ?? []);
        setMigrated(result.migrated !== false);
      } catch {
        /* history unavailable — the ask box still works and says so */
      }
    })();
    return () => {
      alive = false;
    };
  }, [user, answer]);

  const ask = useCallback(
    async (raw?: string) => {
      const text = (raw ?? question).trim();
      if (text.length < 2 || asking) return;
      setQuestion(text);
      setAsking(true);
      setError(null);
      try {
        setAnswer(await searchHistory(text));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "The history search could not be completed."
        );
      } finally {
        setAsking(false);
      }
    },
    [asking, question]
  );

  // ── Guests are blocked (owner decision) ──────────────────────────────────
  if (!sessionLoading && !user) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
          <LogIn className="h-5 w-5 text-primary" />
        </div>
        <h2 className="mt-3 text-sm font-bold text-foreground">Sign in to search your history</h2>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
          Saved conversations belong to an account, so this console needs one. It costs
          nothing to run here — no coin is spent on a history search.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/chat"
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-border/80 bg-card px-5 text-sm font-bold text-foreground transition-colors hover:bg-muted/40"
          >
            Use Veer as a guest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── The ask box ─────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border/70 bg-gradient-to-br from-fuchsia-500/[0.06] via-card to-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Search className="h-4 w-4 text-fuchsia-500" />
          Ask about your own history
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          It searches your saved conversations and shows what you actually discussed —
          never a lesson invented to fill a gap. If your history does not mention it, it
          says so.
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            ref={inputRef}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") void ask();
            }}
            placeholder="What did we discuss about…"
            aria-label="Search your saved conversations"
            className="h-11 flex-1 rounded-2xl border border-border/80 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => void ask()}
            disabled={asking || question.trim().length < 2}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-60"
          >
            {asking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {asking ? "Searching…" : "Search history"}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => void ask(example)}
              disabled={asking}
              className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-60"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <p className="flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs font-semibold text-destructive">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {/* ── What the search found ───────────────────────────────────────── */}
      {answer && (
        <section className="rounded-2xl border border-border/70 bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-fuchsia-500" />
              What I found in your history
            </h2>
            <span className="text-[11px] font-medium text-muted-foreground">
              searched {answer.searched.messages} message
              {answer.searched.messages === 1 ? "" : "s"} across {answer.searched.sessions}{" "}
              conversation{answer.searched.sessions === 1 ? "" : "s"}
              {typeof answer.searched.attached === "number" && (
                <> · presented {answer.searched.attached}</>
              )}
              {answer.provider ? <> · {answer.provider}</> : null}
            </span>
          </div>

          {answer.sessions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {answer.sessions.map((s: HistorySearchSession) => (
                <Link
                  key={s.session}
                  href="/ai/tutor"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary hover:bg-primary/15"
                >
                  <MessageSquare className="h-3 w-3" />
                  {s.session}
                  <span className="text-primary/70">· {s.messages} msg</span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-3">
            <MathMarkdown content={answer.response} />
          </div>

          <p className="mt-4 flex items-center gap-1.5 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
            <SignpostBig className="h-3.5 w-3.5" />
            Open a thread in the{" "}
            <Link href="/ai/tutor" className="font-semibold text-primary hover:underline">
              tutor console
            </Link>{" "}
            to keep going where it stopped.
          </p>
        </section>
      )}

      {/* ── The conversations themselves ────────────────────────────────── */}
      <section className="rounded-2xl border border-border/70 bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <History className="h-4 w-4 text-fuchsia-500" />
          Saved conversations
        </h2>
        {!migrated ? (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            History storage is not enabled on this deployment, so nothing is being saved yet.
            Your live conversation still works — it just is not searchable here.
          </p>
        ) : sessions.length === 0 ? (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            No saved conversations yet. Ask Veer something in the{" "}
            <Link href="/ai/tutor" className="font-semibold text-primary hover:underline">
              tutor console
            </Link>{" "}
            and it appears here, ready to search.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-border/50">
            {sessions.map((s: ChatSessionSummary) => (
              <li key={s.session} className="flex items-start justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-foreground">{s.session}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {s.preview || "(no preview)"}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                  {s.messages} msg
                </span>
              </li>
            ))}
          </ul>
        )}
        {sessions.length > 0 && (
          <Link
            href="/ai/tutor"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            Open the tutor console
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </section>
    </div>
  );
}
