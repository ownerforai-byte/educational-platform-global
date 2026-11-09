"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Atom,
  BookOpen,
  Check,
  Copy,
  Dna,
  FlaskConical,
  History,
  Languages,
  Plus,
  Send,
  Square,
  Sigma,
  Sparkles,
  Wand2,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { StepCards } from "@/components/chat/step-cards";
import { splitStepBlocks } from "@/lib/content/steps-blocks";
import {
  enhancePrompt,
  getChatHistory,
  getChatSessions,
  saveChatHistory,
  streamChat,
  type ChatSession,
} from "@/lib/api/ai";
import type { AIChatMessage } from "@/types/api";
import {
  readGuestCount,
  writeGuestCount,
  GUEST_DAILY_LIMIT,
} from "@/lib/ai/guest-quota";
import { useSession } from "@/features/auth/hooks/use-session";
import type { SubjectIconName } from "@/lib/ai/subject-classrooms";
import {
  newSubjectSession,
  subjectSessionKey,
  subjectSessionPrefix,
  subjectThreadKey,
  type SubjectClassroom,
} from "@/lib/ai/subject-classrooms";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { recordAiSparkUse } from "@/components/ai/ai-spark-badge";

/**
 * THE SUBJECT CLASSROOM (owner 2026-10-25: "one interface per subject with
 * their own history — no mix up, for clarity" and "dont remove the existing,
 * keep it with its history and create a new for all subject with their chat
 * history").
 *
 * One dedicated teaching interface per NEB subject. History is PRIVATE to the
 * classroom: signed-in conversations are saved under `subj:<slug>:<id>` and
 * listed only for this prefix (the general consoles keep their own history,
 * untouched); signed-out threads mirror to their own localStorage key.
 *
 * Replies render through the shared pipeline — ```steps fences become step
 * cards (each step on its own line) and ```svg fences become detailed labelled
 * figures — so no raw code ever reaches the student.
 */

const SUBJECT_ICONS = {
  atom: Atom,
  book: BookOpen,
  dna: Dna,
  flask: FlaskConical,
  languages: Languages,
  sigma: Sigma,
} satisfies Record<SubjectIconName, typeof Atom>;

function parseStoredThread(raw: string | null): AIChatMessage[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: AIChatMessage[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const role = (item as { role?: unknown }).role;
      const content = (item as { content?: unknown }).content;
      if ((role === "user" || role === "assistant") && typeof content === "string") {
        out.push({ role, content });
      }
    }
    return out;
  } catch {
    return [];
  }
}

export function SubjectClassroom({ classroom }: { classroom: SubjectClassroom }) {
  const { user, isLoading } = useSession();
  const isLoggedIn = !!user;
  const Icon = SUBJECT_ICONS[classroom.icon];

  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [enhancing, setEnhancing] = useState(false);

  // ── Private history for THIS subject only ─────────────────────────────────
  const [sessionName, setSessionName] = useState<string>(() =>
    newSubjectSession(classroom.slug),
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

  const sessionRef = useRef(sessionName);
  sessionRef.current = sessionName;
  const streamRef = useRef<HTMLDivElement>(null);
  const historyLoadedRef = useRef(false);

  // Splitting every assistant reply on each render (composer keystrokes
  // re-render the whole thread) is a long task on long threads; memoize so
  // segments are recomputed only when the message list actually changes.
  const messageSegments = useMemo(
    () =>
      messages.map((m) =>
        m.role === "assistant" ? splitStepBlocks(m.content) : null,
      ),
    [messages],
  );

  const refreshSessions = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const { sessions: list } = await getChatSessions(
        subjectSessionPrefix(classroom.slug),
      );
      setSessions(list);
    } catch {
      /* sidebar simply stays empty */
    }
  }, [classroom.slug, isLoggedIn]);

  // Restore: guests read their own device thread; signed-in users read only
  // this subject's saved conversations (never another subject's).
  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      setGuestCount(readGuestCount());
      try {
        const restored = parseStoredThread(
          localStorage.getItem(subjectThreadKey(classroom.slug)),
        );
        if (restored.length) setMessages(restored);
      } catch {
        /* storage blocked — start fresh */
      }
      return;
    }
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    try {
      const active =
        localStorage.getItem(subjectSessionKey(classroom.slug)) ||
        newSubjectSession(classroom.slug);
      setSessionName(active);
      sessionRef.current = active;
      void getChatHistory(active, 200)
        .then(({ messages: restored }) => {
          if (restored.length) {
            setMessages(restored.map((m) => ({ role: m.role, content: m.content })));
          }
        })
        .catch(() => {});
      void refreshSessions();
    } catch {
      /* storage blocked — the session still works for this visit */
    }
  }, [isLoggedIn, isLoading, classroom.slug, refreshSessions]);

  // Signed-out mirror: keep the thread on this device, per subject.
  useEffect(() => {
    if (isLoggedIn) return;
    try {
      if (messages.length === 0) {
        localStorage.removeItem(subjectThreadKey(classroom.slug));
      } else {
        localStorage.setItem(
          subjectThreadKey(classroom.slug),
          JSON.stringify(messages),
        );
      }
    } catch {
      /* storage blocked — the thread just won't survive a reload */
    }
  }, [isLoggedIn, messages, classroom.slug]);

  const startNewChat = () => {
    const id = newSubjectSession(classroom.slug);
    setSessionName(id);
    sessionRef.current = id;
    try {
      localStorage.setItem(subjectSessionKey(classroom.slug), id);
    } catch {
      /* storage blocked — the session still works for this visit */
    }
    setMessages([]);
    setError(null);
    setHistoryOpen(false);
  };

  const openSession = (name: string) => {
    setSessionName(name);
    sessionRef.current = name;
    try {
      localStorage.setItem(subjectSessionKey(classroom.slug), name);
    } catch {
      /* storage blocked */
    }
    setHistoryOpen(false);
    setError(null);
    void getChatHistory(name, 200)
      .then(({ messages: restored }) =>
        setMessages(restored.map((m) => ({ role: m.role, content: m.content }))),
      )
      .catch(() => {});
  };

  const handleEnhance = async () => {
    const text = input.trim();
    if (!text || enhancing) return;
    setEnhancing(true);
    try {
      const { prompt } = await enhancePrompt(text);
      setInput(prompt);
    } catch {
      /* keep the original question — enhancing is a nicety, not a gate */
    } finally {
      setEnhancing(false);
    }
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    if (!isLoggedIn && guestCount >= GUEST_DAILY_LIMIT) {
      setError(
        "You've used all your free classroom messages for today. Sign in to keep learning with your own saved history.",
      );
      return;
    }

    const targetSession = sessionRef.current;
    const userMsg: AIChatMessage = { role: "user", content };
    const outbound = [...messages, userMsg];
    setMessages(outbound);
    setInput("");
    setSending(true);
    setError(null);
    const controller = new AbortController();
    abortRef.current = controller;

    // Hoisted above the try so the Stop branch in `catch` can settle the turn.
    let liveAcc = "";
    let sawToken = false;
    let liveRemaining: number | null = null;
    let lastPaint = 0;
    const paintLive = (force: boolean) => {
      const now = Date.now();
      if (!force && now - lastPaint < 40) return;
      lastPaint = now;
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant") {
          next[next.length - 1] = { role: "assistant", content: liveAcc };
        }
        return next;
      });
    };

    try {
      const payload: AIChatMessage[] = [
        {
          role: "system",
          content: `${PLATFORM_SYSTEM_PROMPT}${classroom.focus}`,
        },
        ...outbound,
      ];

      for await (const chunk of streamChat(payload, undefined, {
        session: targetSession,
        isGuest: !isLoggedIn,
        signal: controller.signal,
      })) {
        if (typeof chunk === "string") {
          if (!sawToken) {
            sawToken = true;
            liveAcc = chunk;
            setStreaming(true);
            setMessages((prev) => [...prev, { role: "assistant", content: chunk }]);
          } else {
            liveAcc += chunk;
            paintLive(false);
          }
        } else if (
          typeof chunk === "object" &&
          chunk !== null &&
          "remaining" in chunk &&
          typeof chunk.remaining === "number"
        ) {
          liveRemaining = chunk.remaining;
        }
      }

      if (!liveAcc.trim()) {
        throw new Error("No reply received. Please try again.");
      }
      paintLive(true);
      setStreaming(false);

      if (isLoggedIn) {
        try {
          const saved = await saveChatHistory(targetSession, [
            { role: "user", content },
            { role: "assistant", content: liveAcc },
          ]);
          if (!saved.migrated || saved.saved !== 2) setError("Your answer could not be saved to history.");
          else void refreshSessions();
        } catch {
          setError("Your answer could not be saved to history.");
        }
      } else {
        const used =
          liveRemaining !== null
            ? Math.min(GUEST_DAILY_LIMIT, Math.max(0, GUEST_DAILY_LIMIT - liveRemaining))
            : Math.min(GUEST_DAILY_LIMIT, guestCount + 1);
        writeGuestCount(used);
        setGuestCount(used);
      }
      recordAiSparkUse();
    } catch (err: unknown) {
      // Stop pressed: the partial answer stays on screen, no error banner.
      if (controller.signal.aborted) {
        // CodeRabbit: settle the turn. With no token at all the unanswered
        // question must go back into the composer instead of polluting the
        // next request's context; with tokens, force the final throttled paint.
        if (sawToken) {
          paintLive(true);
        } else {
          setMessages((prev) => (prev[prev.length - 1]?.role === "user" ? prev.slice(0, -1) : prev));
          setInput(content);
        }
        return;
      }
      const msg =
        err instanceof Error && err.message
          ? err.message
          : `Couldn't reach the ${classroom.subject} classroom. Please try again.`;
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I hit a connection difficulty — please try again, or rephrase the question.",
        },
      ]);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setSending(false);
      setStreaming(false);
    }
  };

  const handleCopy = async (index: number, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
          }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-col gap-4 px-3 py-4 sm:px-4 sm:py-6">
      {/* ── Subject header ─────────────────────────────────────────────── */}
      <div
        className={`rounded-3xl border ${classroom.accentBorder} ${classroom.accentBg} p-5 sm:p-6`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${classroom.accentBg} border ${classroom.accentBorder}`}
            >
              <Icon className={`h-5 w-5 ${classroom.accent}`} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                {classroom.title}
              </h1>
              <p className="text-[11px] text-muted-foreground">{classroom.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHistoryOpen((v) => !v)}
              aria-expanded={historyOpen}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 text-[11px] font-semibold text-foreground transition hover:border-primary/50"
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

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Sparkles className={`h-3 w-3 ${classroom.accent}`} aria-hidden="true" />
          Private {classroom.subject} history — conversations here never mix with
          other subjects or the main Veer chat.
        </p>
      </div>

      {/* ── Private history drawer (this subject only) ─────────────────── */}
      {isLoggedIn && historyOpen && (
        <div className="rounded-2xl border-2 border-border/80 bg-card p-4">
          <p className="text-[11px] font-semibold text-muted-foreground">
            Saved {classroom.subject} conversations
          </p>
          {sessions.length === 0 ? (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Nothing saved yet — your conversations in this classroom appear
              here automatically.
            </p>
          ) : (
            <div className="mt-2 max-h-56 space-y-1 overflow-y-auto">
              {sessions.map((s) => (
                <button
                  key={s.session}
                  type="button"
                  onClick={() => openSession(s.session)}
                  className={`block w-full rounded-xl border px-3 py-2 text-left text-[11px] transition ${
                    s.session === sessionName
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/60 hover:border-primary/40"
                  }`}
                >
                  <span className="block truncate font-semibold">
                    {s.preview || "Untitled conversation"}
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
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {classroom.starters.map((starter) => (
            <button
              key={starter.label}
              type="button"
              onClick={() => handleSend(starter.text)}
              disabled={sending || (!isLoggedIn && guestCount >= GUEST_DAILY_LIMIT)}
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

      {/* ── Thread ─────────────────────────────────────────────────────── */}
      <div ref={streamRef} className="min-w-0 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                message.role === "user"
                  ? "max-w-[85%] min-w-0 rounded-2xl bg-primary px-4 py-3 text-[13px] text-primary-foreground [overflow-wrap:anywhere]"
                  : "min-w-0 w-full rounded-2xl border-2 border-border/80 bg-card px-3 py-4 shadow-sm sm:px-6 sm:py-6"
              }
            >
              {message.role === "assistant" ? (
                <div className="space-y-2">
                  {(messageSegments[index] ?? []).map((segment, segIndex) =>
                    segment.kind === "steps" ? (
                      <StepCards key={segIndex} steps={segment.steps} />
                    ) : (
                      <MathMarkdown key={segIndex} content={segment.text} className="chat-reading" />
                    ),
                  )}
                  {!streaming && (
                    <button
                      type="button"
                      onClick={() => handleCopy(index, message.content)}
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground transition hover:text-foreground"
                    >
                      {copiedIndex === index ? (
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
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {sending && !streaming && (
          <p className="text-[11px] italic text-muted-foreground">
            {classroom.subject} teacher is thinking…
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

      {/* ── Composer (normal chat box + enhancer) ──────────────────────── */}
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
          placeholder={`Ask your ${classroom.subject} question…`}
          className="w-full resize-none rounded-xl border border-border/60 bg-background px-3 py-2 text-[13px] sm:text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleEnhance}
            disabled={enhancing || !input.trim()}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/70 px-3 text-[11px] font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50"
          >
            <Wand2 className="h-3.5 w-3.5" />
            {enhancing ? "Enhancing…" : "Enhance"}
          </button>
          {sending ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              aria-label="Stop reply"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-destructive px-5 text-[11px] font-bold text-destructive-foreground transition hover:opacity-90"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim()}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-5 text-[11px] font-bold text-white transition disabled:opacity-50 ${classroom.accentBg.replace("/10", "")}`}
            >
              <Send className="h-3.5 w-3.5" />
              Ask
            </button>
          )}
        </div>
        {!isLoggedIn && (
          <p className="mt-2 text-[10px] text-muted-foreground">
            Free messages left today:{" "}
            {Math.max(0, GUEST_DAILY_LIMIT - guestCount)} — sign in for unlimited
            questions and your own saved {classroom.subject} history.
          </p>
        )}
      </div>
    </div>
  );
}
