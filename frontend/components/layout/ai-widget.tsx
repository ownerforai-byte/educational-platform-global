"use client";

/**
 * AIWidget — the floating Veer sheet, one tap from any page.
 *
 * Opens onto the shared ChatHome frame (greeting card, Recent Chats, starter
 * chips) and keeps the owner's quick/deep chain (2026-10-27): quick questions
 * are answered right here in a few words, while deep ones carry the question
 * to the full console, pre-filled. Conversations stay in the shared chat
 * history store, namespaced per session — nothing mixes across interfaces.
 *
 * Built low-data on purpose: the conversation list loads lazily on first
 * open (one small request, only when the sheet is opened), everything is
 * text-only, and the frame paints instantly on a saver connection.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUp, History, Plus, UserRound, X } from "lucide-react";
import { CaptainAvatar, CaptainMark } from "@/components/ai/captain-logo";
import { recordAiSparkUse } from "@/components/ai/ai-spark-badge";
import { buildChatHomeGroups, ChatHome } from "@/components/ai/chat-home";
import { VoiceMicButton } from "@/components/ai/voice-mic-button";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  chat,
  getChatHistory,
  getChatSessions,
  saveChatHistory,
  type ChatHistoryMessage,
  type ChatSession,
} from "@/lib/api/ai";
import { useVoiceInput } from "@/lib/hooks/use-voice-input";
import { isDeepQuestion, isFollowUpAsk } from "@/lib/ai/question-depth";
import {
  CHAT_SUGGESTION_CATEGORIES,
  suggestionGroups,
} from "@/lib/ai/study-suggestions";
import type { AIChatMessage } from "@/types/api";

type Line = { role: "user" | "assistant"; content: string };

/** Starter chips for the quick panel (pure, computed once at module load). */
const STARTER_GROUPS = buildChatHomeGroups(
  suggestionGroups(CHAT_SUGGESTION_CATEGORIES),
);

/**
 * Left-side Veer panel for approved accounts only. Visitors keep the plain
 * home chat. This one talks to the signed-in Veer route and spends AI sparks.
 */
export function AIWidget() {
  const { user, isLoading } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"home" | "thread">("home");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [session, setSession] = useState("default");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sessionsLoadedRef = useRef(false);

  // Composer dictation — same mic contract as the full chat surfaces.
  const {
    supported: voiceSupported,
    listening: voiceListening,
    interim: voiceInterim,
    transcript: voiceTranscript,
    start: voiceStart,
    stop: voiceStop,
    clear: voiceClear,
  } = useVoiceInput({ onError: (message) => setError(message) });

  useEffect(() => {
    if (!voiceTranscript) return;
    voiceClear();
    setInput((prev) => (prev.trim() ? `${prev.trim()} ${voiceTranscript}` : voiceTranscript));
  }, [voiceTranscript, voiceClear]);

  useEffect(() => setMounted(true), []);

  // Recent chats load lazily — one small request, the first time the sheet
  // opens (never while it stays closed).
  useEffect(() => {
    if (!open || !user || sessionsLoadedRef.current) return;
    sessionsLoadedRef.current = true;
    getChatSessions()
      .then(({ sessions: list }) => setSessions(list))
      .catch(() => {});
  }, [open, user]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, sending, open, loadingThread]);

  if (!mounted || isLoading || !user) return null;
  if (pathname === "/chat" || pathname.startsWith("/chat/") || pathname?.startsWith("/home/")) return null;

  /** Resume a saved conversation here in the sheet. */
  async function openConversation(name: string) {
    setSession(name);
    setView("thread");
    setLoadingThread(true);
    setError(null);
    try {
      const { messages } = await getChatHistory(name, 50);
      setLines(
        messages.map((m: ChatHistoryMessage) => ({
          role: m.role as Line["role"],
          content: m.content,
        })),
      );
    } catch {
      setLines([]);
      setError("That conversation could not be loaded.");
    } finally {
      setLoadingThread(false);
    }
  }

  /** Back to the home frame (greeting card + recent chats). */
  function goHome() {
    setView("home");
    setError(null);
  }

  /** A fresh conversation of its own. */
  function startNewChat() {
    setSession(`w-${Date.now().toString(36)}`);
    setLines([]);
    setInput("");
    setError(null);
    setView("home");
  }

  async function send(override?: string) {
    const text = (override ?? input).trim();
    if (!text || sending) return;
    // Owner 2026-10-27: deep questions auto-lead to the main interface — the
    // quick panel answers quick questions only. The question rides along,
    // pre-filled in the full console's composer (no spark is spent here).
    // Bare follow-ups ("explain more") stay here: their context is this
    // panel's own thread, so the main console would answer them contextless.
    if (isDeepQuestion(text) && !isFollowUpAsk(text)) {
      setInput("");
      setError(null);
      setView("thread");
      setLines((prev) => [
        ...prev,
        { role: "user", content: text },
        {
          role: "assistant",
          content:
            "That one deserves the full console — opening the main Veer chat with your question, ready to send.",
        },
      ]);
      router.push(`/chat?q=${encodeURIComponent(text)}`);
      return;
    }
    const history: AIChatMessage[] = [
      ...lines.map((line) => ({ role: line.role, content: line.content })),
      { role: "user", content: text },
    ];
    setInput("");
    setError(null);
    setView("thread");
    setLines((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const res = await chat(history);
      recordAiSparkUse();
      setLines((prev) => [...prev, { role: "assistant", content: res.response }]);
      // Keep this thread in the shared conversation store under its own
      // session, so the full console's history shows the same conversation.
      saveChatHistory(session, [
        { role: "user", content: text },
        { role: "assistant", content: res.response },
      ]).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veer could not answer. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed left-4 bottom-[calc(env(safe-area-inset-bottom)_+_5rem)] z-50 flex flex-col items-start gap-2 lg:bottom-safe">
      {open && (
        <section
          aria-label="Veer chat"
          className="flex h-[min(calc(100dvh-10rem),860px)] w-[min(100vw-2rem,42rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl lg:h-[min(88vh,860px)]"
        >
          <header className="flex items-center justify-between gap-2 border-b border-border bg-foreground px-3 py-2.5 text-background">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/10"
                aria-hidden="true"
              >
                <CaptainAvatar className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">Veer</p>
                <p className="flex items-center gap-1.5 text-[10px] text-background/70">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                    aria-hidden="true"
                  />
                  Quick answers here · deep dives in the full chat
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goHome}
                title="Recent chats"
                className="rounded-lg p-1.5 hover:bg-background/10"
                aria-label="Recent chats"
              >
                <History className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={startNewChat}
                title="New chat"
                className="rounded-lg p-1.5 hover:bg-background/10"
                aria-label="New chat"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-background/10"
                aria-label="Close Veer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div
            ref={scrollerRef}
            className="min-h-0 flex-1 overflow-y-auto bg-muted/20 px-4 py-4"
          >
            {view === "home" ? (
              <div className="space-y-4">
                {lines.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setView("thread")}
                    className="flex w-full items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    Resume current conversation
                    <span aria-hidden="true">›</span>
                  </button>
                )}
                <ChatHome
                  recent={sessions}
                  onOpenRecent={(name) => void openConversation(name)}
                  seeAllHref="/chat"
                  groups={STARTER_GROUPS}
                  onSend={(text) => void send(text)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {loadingThread && (
                  <p className="text-sm font-semibold text-muted-foreground">
                    Loading conversation…
                  </p>
                )}
                {lines.map((line, i) => {
                  const mine = line.role === "user";
                  if (mine) {
                    return (
                      <article key={`${line.role}-${i}`} className="flex items-end justify-end gap-2">
                        <div className="flex max-w-[85%] flex-col items-end gap-1">
                          <span className="px-1 text-[10px] font-bold uppercase tracking-wide text-primary">You</span>
                          <p className="rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                            {line.content}
                          </p>
                        </div>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                          <UserRound className="h-3.5 w-3.5" />
                        </span>
                      </article>
                    );
                  }
                  return (
                    <article key={`${line.role}-${i}`} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background" aria-hidden="true">
                          <CaptainAvatar className="h-4 w-4" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-foreground">Veer</span>
                      </div>
                      <div className="rounded-2xl border border-border bg-card px-4 py-4 sm:px-5 sm:py-5">
                        <InteractiveMarkdown content={line.content} className="chat-reading" />
                      </div>
                    </article>
                  );
                })}
                {sending && (
                  <p className="text-sm font-semibold text-foreground">Veer is writing…</p>
                )}
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label className="sr-only" htmlFor="veer-widget-message">
              Message to Veer
            </label>
            <input
              id="veer-widget-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Veer — quick questions get quick answers"
              disabled={sending}
              className="min-h-11 flex-1 rounded-2xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <VoiceMicButton
              supported={voiceSupported}
              listening={voiceListening}
              interim={voiceInterim}
              onStart={voiceStart}
              onStop={voiceStop}
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-primary to-violet-500 text-primary-foreground shadow-md shadow-primary/30 transition hover:scale-[1.03] disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <div className="border-t border-border px-3 py-2">
            <Link href="/chat" className="text-xs font-semibold text-primary hover:underline">
              Open the full Veer chat
            </Link>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close Veer" : "Open Veer"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-lg transition hover:scale-105"
      >
        <CaptainMark className="h-7 w-7 text-white" />
      </button>
    </div>
  );
}
