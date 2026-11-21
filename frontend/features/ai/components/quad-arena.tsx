"use client";

/**
 * THE MODEL QUAD (owner 2026-11-18: "4 square interfaces showing reply (from
 * 4 models — to get the answer properly) from one prompt switchable to all 6
 * subjects with chat history — history also changes with the subject, model
 * remains same … answer deepness veer level of owner").
 *
 * One prompt, four SQUARE model panels in a 2×2 grid, every reply at Veer's
 * owner depth (the deepest rung, pinned server-side by /api/ai/quad). The
 * model lanes never change; switching subject swaps ONLY the conversation:
 * each of the six subjects owns a private history namespace `quad:<slug>:<id>`
 * (the same no-mix-up policy as the subject classrooms), so the Physics desk
 * and the Mathematics desk never share a thread.
 *
 * OWNER ONLY — the page, the rail entry and the API (`requireOwnerEmail`) all
 * agree; this component also renders the owner gate so a direct visit lands on
 * an honest "owner access only" screen instead of a broken console.
 *
 * History format: one turn = one user message + one assistant message per
 * answering model, each headed by `**Label · model-id**` so generic history
 * views stay readable and the squares can be rebuilt on restore.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Atom,
  BookOpen,
  Check,
  Copy,
  Dna,
  FlaskConical,
  Grid2x2,
  History,
  Languages,
  Lock,
  Plus,
  Send,
  ShieldCheck,
  Sigma,
  Sparkles,
  Square,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { StepCards } from "@/components/chat/step-cards";
import { splitStepBlocks } from "@/lib/content/steps-blocks";
import {
  getChatHistory,
  getChatSessions,
  quadReply,
  type ChatHistoryMessage,
  type ChatSession,
  type QuadLaneReply,
} from "@/lib/api/ai";
import { recordAccountChatTurn } from "@/features/ai/account-chat";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount } from "@/lib/owner";
import {
  SUBJECT_CLASSROOMS,
  getSubjectClassroom,
  type SubjectIconName,
  type SubjectSlug,
} from "@/features/ai/subject-classrooms";
import { PLATFORM_SYSTEM_PROMPT } from "@/features/ai/prompts";

// ── Per-subject history plumbing (mirrors subject-classrooms.ts) ─────────────

/** History namespace for one desk row — `quad:physics:` etc. */
export function quadSessionPrefix(slug: SubjectSlug): string {
  return `quad:${slug}:`;
}

/** A fresh conversation id inside one subject's private quad history. */
export function newQuadSession(slug: SubjectSlug): string {
  return `${quadSessionPrefix(slug)}t-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

/** Signed-in active-session key — one per subject, never shared. */
export function quadSessionKey(slug: SubjectSlug): string {
  return `neb_quad_session_${slug}`;
}

/** localStorage key holding the last-known lane labels (stable per deploy). */
const QUAD_LANES_KEY = "neb_quad_lanes";

// ── Turn model + history (de)serialisation ──────────────────────────────────

export interface QuadPanel {
  label: string;
  model: string;
  answer: string;
  ok: boolean;
}

export interface QuadTurn {
  prompt: string;
  panels: QuadPanel[];
}

/** `**Label · model-id**\n\n…` — the header every saved panel starts with. */
const PANEL_HEADER_RE = /^\*\*(.+?) · (.+?)\*\*\n\n/;

/** One saved assistant message per answering model (failed lanes unsaved). */
export function serializeQuadPanel(panel: QuadPanel): string {
  return `**${panel.label} · ${panel.model || "model"}**\n\n${panel.answer}`;
}

/**
 * Rebuild the square grid from a saved thread: a user message opens a turn,
 * each assistant message after it is one model square (labelled by its
 * header line). Orphan assistant messages are ignored.
 */
export function parseQuadHistory(messages: ChatHistoryMessage[]): QuadTurn[] {
  const turns: QuadTurn[] = [];
  for (const message of messages) {
    if (message.role === "user") {
      turns.push({ prompt: message.content, panels: [] });
      continue;
    }
    const turn = turns[turns.length - 1];
    if (!turn) continue;
    const header = PANEL_HEADER_RE.exec(message.content);
    turn.panels.push(
      header
        ? {
            label: header[1],
            model: header[2],
            answer: message.content.slice(header[0].length),
            ok: true,
          }
        : {
            label: `Model ${turn.panels.length + 1}`,
            model: "",
            answer: message.content,
            ok: true,
          },
    );
  }
  return turns;
}

// ── Subject identity chips ──────────────────────────────────────────────────

const SUBJECT_ICONS = {
  atom: Atom,
  book: BookOpen,
  dna: Dna,
  flask: FlaskConical,
  languages: Languages,
  sigma: Sigma,
} satisfies Record<SubjectIconName, typeof Atom>;

function readStoredSession(slug: SubjectSlug): string {
  try {
    return localStorage.getItem(quadSessionKey(slug)) || newQuadSession(slug);
  } catch {
    return newQuadSession(slug);
  }
}

function readStoredLanes(): QuadLaneReply[] {
  try {
    const raw = localStorage.getItem(QUAD_LANES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as QuadLaneReply[]) : [];
  } catch {
    return [];
  }
}

export function QuadArena() {
  const { user, isLoading } = useSession();
  const isOwner = isOwnerAccount(user);

  const [activeSlug, setActiveSlug] = useState<SubjectSlug>(SUBJECT_CLASSROOMS[0].slug);
  const [threads, setThreads] = useState<Partial<Record<SubjectSlug, QuadTurn[]>>>({});
  const [sessionIds, setSessionIds] = useState<Partial<Record<SubjectSlug, string>>>({});
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lanes, setLanes] = useState<QuadLaneReply[]>([]);
  // One load per (subject, session) — switching back to a tab shows its cached
  // thread instantly, and openSession()/startNewChat() load their own thread.
  const loadedRef = useRef<Set<string>>(new Set());

  const classroom = getSubjectClassroom(activeSlug)!;
  const Icon = SUBJECT_ICONS[classroom.icon];
  const turns = threads[activeSlug] ?? [];
  const activeSession = sessionIds[activeSlug] ?? "";

  // Panels split once per thread change — never per keystroke.
  const turnSegments = useMemo(
    () => turns.map((turn) => turn.panels.map((panel) => splitStepBlocks(panel.answer))),
    [turns],
  );

  const refreshSessions = useCallback(async (slug: SubjectSlug) => {
    try {
      const { sessions: list } = await getChatSessions(quadSessionPrefix(slug));
      setSessions(list);
    } catch {
      /* the drawer simply stays empty */
    }
  }, []);

  // Restore THIS subject's private thread on first visit to the tab; the other
  // five subjects keep their own histories untouched (owner: "history also
  // changes with the subject — model remains same").
  useEffect(() => {
    if (isLoading || !isOwner) return;
    setLanes((prev) => (prev.length ? prev : readStoredLanes()));
    const stored = sessionIds[activeSlug] ?? readStoredSession(activeSlug);
    if (!sessionIds[activeSlug]) {
      setSessionIds((prev) => ({ ...prev, [activeSlug]: stored }));
    }
    const loadKey = `${activeSlug}:${stored}`;
    if (loadedRef.current.has(loadKey)) return;
    loadedRef.current.add(loadKey);
    void getChatHistory(stored, 200)
      .then(({ messages }) =>
        setThreads((prev) => ({ ...prev, [activeSlug]: parseQuadHistory(messages) })),
      )
      .catch(() => {});
    void refreshSessions(activeSlug);
  }, [activeSlug, isLoading, isOwner, sessionIds, refreshSessions]);

  const persistSession = (slug: SubjectSlug, id: string) => {
    setSessionIds((prev) => ({ ...prev, [slug]: id }));
    try {
      localStorage.setItem(quadSessionKey(slug), id);
    } catch {
      /* storage blocked — the session still works for this visit */
    }
  };

  const startNewChat = () => {
    const id = newQuadSession(activeSlug);
    persistSession(activeSlug, id);
    loadedRef.current.add(`${activeSlug}:${id}`);
    setThreads((prev) => ({ ...prev, [activeSlug]: [] }));
    setError(null);
    setHistoryOpen(false);
  };

  const openSession = (name: string) => {
    persistSession(activeSlug, name);
    loadedRef.current.add(`${activeSlug}:${name}`);
    setHistoryOpen(false);
    setError(null);
    void getChatHistory(name, 200)
      .then(({ messages }) =>
        setThreads((prev) => ({ ...prev, [activeSlug]: parseQuadHistory(messages) })),
      )
      .catch(() => {});
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || sending || !isOwner) return;

    const slug = activeSlug;
    const session = sessionIds[slug] ?? readStoredSession(slug);
    if (!sessionIds[slug]) persistSession(slug, session);

    const prior = threads[slug] ?? [];
    const nextTurn: QuadTurn = { prompt: content, panels: [] };
    setThreads((prev) => ({ ...prev, [slug]: [...prior, nextTurn] }));
    setInput("");
    setSending(true);
    setError(null);

    // Request context: this subject's system identity + the subject's own
    // thread so far (never another subject's), then the new prompt.
    const flat = prior
      .flatMap((turn) => [
        { role: "user" as const, content: turn.prompt },
        ...turn.panels.map((panel) => ({ role: "assistant" as const, content: panel.answer })),
      ])
      .slice(-14);

    try {
      const result = await quadReply({
        prompt: content,
        subject: slug,
        session,
        messages: [
          { role: "system", content: `${PLATFORM_SYSTEM_PROMPT}${classroom.focus}` },
          ...flat,
        ],
      });

      const panels: QuadPanel[] = result.replies.map((reply) => ({
        label: reply.label,
        model: reply.model,
        answer: reply.answer,
        ok: reply.ok,
      }));
      setThreads((prev) => ({
        ...prev,
        [slug]: [...prior, { prompt: content, panels }],
      }));
      setLanes(result.replies);
      try {
        localStorage.setItem(QUAD_LANES_KEY, JSON.stringify(result.replies));
      } catch {
        /* storage blocked — labels just regenerate next time */
      }

      const answered = result.replies.filter((reply) => reply.ok);
      try {
        await recordAccountChatTurn(session, [
          { role: "user", content },
          ...answered.map((reply) => ({
            role: "assistant" as const,
            content: serializeQuadPanel({
              label: reply.label,
              model: reply.model,
              answer: reply.answer,
              ok: true,
            }),
          })),
        ]);
        void refreshSessions(slug);
      } catch {
        setError("The four answers arrived but could not be saved to history.");
      }
      if (answered.length < result.replies.length) {
        setError(
          `${answered.length} of ${result.replies.length} models answered — the rest are marked on their squares.`,
        );
      }
    } catch (err) {
      // The prompt goes back into the composer — never a half-turn in history.
      setThreads((prev) => ({ ...prev, [slug]: prior }));
      setInput(content);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "The model desk could not be reached. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  const handleCopy = async (key: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      /* clipboard blocked — the answer is still on screen */
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ── Owner gate (also the direct-URL landing for everyone else) ───────────
  if (isLoading) {
    return (
      <div className="rounded-3xl border-2 border-border/70 bg-card p-6 text-[12px] text-muted-foreground">
        Checking owner access…
      </div>
    );
  }
  if (!isOwner) {
    return (
      <div
        role="alert"
        className="rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-6 text-center"
      >
        <Lock className="mx-auto h-8 w-8 text-amber-600" aria-hidden="true" />
        <p className="mt-3 text-[15px] font-extrabold text-foreground">Owner access only</p>
        <p className="mx-auto mt-1.5 max-w-md text-[12px] leading-relaxed text-muted-foreground">
          The Model Quad — one prompt answered by four AI models side by side at
          full depth — opens at the Owner rung only for now.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-col gap-4">
      {/* ── Subject switcher — six desks, one per subject history ─────── */}
      <div className="flex flex-wrap items-center gap-2">
        {SUBJECT_CLASSROOMS.map((subject) => {
          const SubjectIcon = SUBJECT_ICONS[subject.icon];
          const active = subject.slug === activeSlug;
          return (
            <button
              key={subject.slug}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveSlug(subject.slug);
                setHistoryOpen(false);
                setError(null);
              }}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-2xl border-2 px-3.5 text-[11px] font-bold transition ${
                active
                  ? `${subject.accentBorder} ${subject.accentBg} ${subject.accent}`
                  : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <SubjectIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {subject.subject}
            </button>
          );
        })}
      </div>

      {/* ── Action bar — private per-subject history + new chat ───────── */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 rounded-3xl border ${classroom.accentBorder} ${classroom.accentBg} p-3 sm:p-4`}
      >
        <p className="flex min-w-0 items-center gap-1.5 text-[11px] text-muted-foreground">
          <Sparkles className={`h-3 w-3 shrink-0 ${classroom.accent}`} aria-hidden="true" />
          {classroom.subject} desk — the four model lanes never change; only this
          subject&apos;s private history switches with the tab.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setHistoryOpen((v) => !v);
              void refreshSessions(activeSlug);
            }}
            aria-expanded={historyOpen}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border-2 border-border/80 bg-background px-3 text-[11px] font-semibold text-foreground transition hover:border-primary/50"
          >
            <History className="h-3.5 w-3.5" />
            {classroom.subject} history
          </button>
          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            New chat
          </button>
        </div>
      </div>

      {/* ── Private history drawer (this subject only) ─────────────────── */}
      {historyOpen && (
        <div className="rounded-2xl border-2 border-border/80 bg-card p-4">
          <p className="text-[11px] font-semibold text-muted-foreground">
            Saved {classroom.subject} quad conversations
          </p>
          {sessions.length === 0 ? (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Nothing saved yet — your four-model comparisons in this subject
              appear here automatically.
            </p>
          ) : (
            <div className="mt-2 max-h-56 space-y-1 overflow-y-auto">
              {sessions.map((s) => (
                <button
                  key={s.session}
                  type="button"
                  onClick={() => openSession(s.session)}
                  className={`block w-full rounded-xl border px-3 py-2 text-left text-[11px] transition ${
                    s.session === activeSession
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/60 hover:border-primary/40"
                  }`}
                >
                  <span className="block truncate font-semibold">
                    {s.preview || "Untitled comparison"}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted-foreground">
                    {s.messages} message{s.messages === 1 ? "" : "s"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Starters (empty thread) ────────────────────────────────────── */}
      {turns.length === 0 && !sending && (
        <div className="flex flex-wrap gap-2">
          {classroom.starters.map((starter) => (
            <button
              key={starter.label}
              type="button"
              onClick={() => void handleSend(starter.text)}
              disabled={sending}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-2xl border ${classroom.accentBorder} ${classroom.accentBg} px-4 py-2 text-left text-[11px] font-semibold text-foreground transition hover:opacity-80 disabled:opacity-50`}
            >
              <span className={`text-[10px] font-bold uppercase ${classroom.accent}`}>
                {starter.label}
              </span>
              <span className="max-w-[260px] truncate">{starter.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Thread — one row per prompt: bubble + four square panels ──── */}
      <div className="min-w-0 space-y-5">
        {turns.map((turn, turnIndex) => {
          const pending = sending && turnIndex === turns.length - 1 && turn.panels.length === 0;
          const placeholderLanes =
            lanes.length > 0
              ? lanes
              : [1, 2, 3, 4].map((n) => ({
                  name: `model-${n}`,
                  label: `Model ${n}`,
                  model: "",
                  configured: true,
                  ok: true,
                  answer: "",
                  ms: 0,
                }));
          return (
            <div key={`${turn.prompt}-${turnIndex}`} className="space-y-3">
              <div className="flex justify-end">
                <p className="max-w-[85%] min-w-0 whitespace-pre-wrap rounded-2xl bg-primary px-4 py-3 text-[13px] text-primary-foreground [overflow-wrap:anywhere]">
                  {turn.prompt}
                </p>
              </div>

              <div
                className="grid grid-cols-2 gap-2 sm:gap-3"
                aria-label="Four model replies"
              >
                {(pending ? placeholderLanes : turn.panels).map((panel, panelIndex) => {
                  const key = `${turnIndex}-${panelIndex}`;
                  const segments = pending ? [] : (turnSegments[turnIndex]?.[panelIndex] ?? []);
                  return (
                    <article
                      key={key}
                      aria-label={`Reply from ${panel.label}`}
                      className={`flex max-h-[70vh] min-h-[280px] min-w-0 flex-col overflow-hidden rounded-2xl border-2 bg-card sm:min-h-[340px] sm:rounded-3xl ${
                        pending
                          ? "border-border/60"
                          : panel.ok
                            ? "border-border/80"
                            : "border-destructive/40"
                      }`}
                    >
                      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border/70 bg-muted/40 px-2.5 py-2 sm:px-3.5">
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-extrabold text-foreground">
                            {panel.label}
                          </p>
                          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                            {panel.model || "model"}
                          </p>
                        </div>
                        {!pending && panel.ok && (
                          <button
                            type="button"
                            onClick={() => void handleCopy(key, panel.answer)}
                            className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground transition hover:text-foreground"
                          >
                            {copiedKey === key ? (
                              <>
                                <Check className="h-3 w-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        )}
                      </header>
                      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
                        {pending ? (
                          <p className="text-[11px] italic text-muted-foreground">
                            {panel.label} is thinking…
                          </p>
                        ) : panel.ok ? (
                          segments.map((segment, segIndex) =>
                            segment.kind === "steps" ? (
                              <StepCards key={segIndex} steps={segment.steps} />
                            ) : (
                              <MathMarkdown
                                key={segIndex}
                                content={segment.text}
                                className="chat-reading"
                              />
                            ),
                          )
                        ) : (
                          <p className="text-[11px] font-semibold text-destructive">
                            {panel.answer || "This model did not answer."}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}

        {sending && turns.length === 0 && (
          <p className="text-[11px] italic text-muted-foreground">
            Asking the four models…
          </p>
        )}
      </div>

      {/* ── Error banner ───────────────────────────────────────────────── */}
      {error && (
        <p
          role="alert"
          className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-[11px] font-semibold text-destructive"
        >
          {error}
        </p>
      )}

      {/* ── Composer — one prompt, owner depth ─────────────────────────── */}
      <div className="rounded-2xl border-2 border-border/80 bg-card p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSend();
            }
          }}
          rows={2}
          placeholder={`Ask one ${classroom.subject} question — four models answer it side by side…`}
          className="w-full resize-none rounded-xl border-2 border-border/80 bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            Answer depth: Veer owner level — the deepest rung, for every square.
          </p>
          {sending ? (
            <button
              type="button"
              disabled
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-destructive px-5 text-[11px] font-bold text-destructive-foreground opacity-80"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Asking 4 models…
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim()}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-5 text-[11px] font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Grid2x2 className="h-3.5 w-3.5" />
              <Send className="h-3.5 w-3.5" />
              Ask all four
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
