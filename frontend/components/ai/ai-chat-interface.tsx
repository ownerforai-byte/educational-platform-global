"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Coins,
  AlertCircle,
  Atom,
  FlaskConical,
  Binary,
  Loader2,
  Plus,
  MessageSquare,
  History,
  PanelLeftClose,
  PanelLeft,
  UserRound,
} from "lucide-react";
import {
  chat,
  guestChat,
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  getChatSessions,
  enhancePrompt,
  type ChatHistoryMessage,
  type ChatSession,
} from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";
import { MathMarkdown } from "@/components/content/math-markdown";
import { cn } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  {
    category: "Physics",
    icon: Atom,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
    text: "Derive the Lens Maker's formula step by step with sign conventions.",
  },
  {
    category: "Physics",
    icon: Atom,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/30",
    text: "Explain Carnot engine cycle and maximum theoretical efficiency.",
  },
  {
    category: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    text: "Explain the Inert Pair Effect in heavier p-block elements with examples.",
  },
  {
    category: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    text: "Compare SN1 and SN2 reaction mechanisms, kinetics, and stereochemistry.",
  },
  {
    category: "Biology",
    icon: Sparkles,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
    text: "Describe the steps of DNA replication and role of DNA Polymerase III.",
  },
  {
    category: "Mathematics",
    icon: Binary,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    text: "Prove that lim(x->0) [sin(x)/x] = 1 using Sandwich (Squeeze) Theorem.",
  },
];

// Daily credit pools (owner policy 2026-09-26): guests get 5 free
// messages/day, logged users get 8 credits/day — both reset at 12:00 AM.
// The server enforces the real counts; localStorage is display-only.
const MAX_GUEST_MESSAGES = 5;
const DAILY_CREDIT_POOL = 8;
const STORAGE_KEY = "neb_ai_guest_day";
const GUEST_COUNT_KEY = "neb_ai_guest_count";
const ACTIVE_SESSION_KEY = "neb_ai_active_session";

function guestDayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readGuestState(): { day: string; count: number } {
  if (typeof window === "undefined") return { day: guestDayKey(), count: 0 };
  const day = localStorage.getItem(STORAGE_KEY);
  const count = parseInt(localStorage.getItem(GUEST_COUNT_KEY) || "0", 10) || 0;
  // New day (past 12:00 AM) → pool is fresh.
  if (day !== guestDayKey()) return { day: guestDayKey(), count: 0 };
  return { day, count };
}

function writeGuestState(count: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, guestDayKey());
  localStorage.setItem(GUEST_COUNT_KEY, String(count));
}

function newSessionId(): string {
  return `c-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function readActiveSession(): string {
  if (typeof window === "undefined") return "default";
  return localStorage.getItem(ACTIVE_SESSION_KEY) || "default";
}

function writeActiveSession(session: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_SESSION_KEY, session);
}

export function AIChatInterface() {
  const { user } = useSession();
  const isLoggedIn = !!user;

  const [messages, setMessages] = useState<AIChatMessage[]>([
    { role: "system", content: PLATFORM_SYSTEM_PROMPT },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // Guest usage lives in localStorage — it must NEVER be read during render,
  // or the server HTML (always 0) won't match the hydrated client (the
  // 2026-09-26 hydration error on /chat: "7" vs "6"). Seed after mount.
  const [guestCount, setGuestCount] = useState(0);
  const [dailyCredits, setDailyCredits] = useState<number | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [historyState, setHistoryState] = useState<"idle" | "loading" | "ready">("idle");
  const historyLoadedRef = useRef(false);

  // Individual chat histories (per-session conversations, signed-in only).
  const [session, setSession] = useState<string>("default");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [restoredCount, setRestoredCount] = useState<number | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const guestCredits = Math.max(0, MAX_GUEST_MESSAGES - guestCount);
  const isGuestLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;

  const refreshSessions = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const { sessions: list } = await getChatSessions();
      setSessions(list);
    } catch {
      // history unavailable — sidebar just stays empty
    }
  }, [isLoggedIn]);

  const loadSessionHistory = useCallback(
    async (sessionName: string) => {
      setHistoryState("loading");
      try {
        const { messages: restored } = await getChatHistory(sessionName, 200);
        const system: AIChatMessage = { role: "system", content: PLATFORM_SYSTEM_PROMPT };
        if (restored.length) {
          setMessages([
            system,
            ...restored.map((m: ChatHistoryMessage) => ({ role: m.role, content: m.content })),
          ]);
          setRestoredCount(restored.length);
        } else {
          setMessages([system]);
          setRestoredCount(null);
        }
      } catch {
        setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
      } finally {
        setHistoryState("ready");
      }
    },
    []
  );

  useEffect(() => {
    if (!isLoggedIn) {
      // Post-mount only: localStorage is unavailable on the server, so the
      // first client render must match the server's count of 0 exactly.
      setGuestCount(readGuestState().count);
      setHistoryState("ready");
      return;
    }
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    const active = readActiveSession();
    setSession(active);
    loadSessionHistory(active);
    refreshSessions();
    // Signed-in header shows the live daily pool (8 credits/day, resets
    // at 12:00 AM) — /api/auth/me already applied the lazy midnight reset.
    if (user && typeof user.credits === "number") setDailyCredits(user.credits);
  }, [isLoggedIn, loadSessionHistory, refreshSessions, user]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || sending) return;
    if (historyState === "loading") return;

    if (isGuestLimited) {
      setError("You've used all 5 free guest messages for today. Your pool resets to 5 at 12:00 AM — or sign in for 8 daily credits & saved histories.");
      return;
    }

    const userMsg: AIChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    const targetSession = sessionRef.current;

    try {
      if (isLoggedIn) {
        const res = await chat([...messages, userMsg]);
        const assistantMsg: AIChatMessage = { role: "assistant", content: res.response };
        setMessages((prev) => [...prev, assistantMsg]);
        // Server reports the balance after this message's 1-credit spend.
        if (typeof res.credits === "number") setDailyCredits(res.credits);
        saveChatHistory(targetSession, [
          { role: "user", content: textToSend },
          { role: "assistant", content: res.response },
        ]).catch(() => {});
        // New conversation gets a session row as soon as it has content.
        setSessions((prev) => {
          if (prev.some((s) => s.session === targetSession)) {
            return prev.map((s) =>
              s.session === targetSession
                ? {
                    ...s,
                    messages: s.messages + 2,
                    lastMessageAt: new Date().toISOString(),
                    preview: s.preview || textToSend.slice(0, 80),
                  }
                : s
            );
          }
          return [
            {
              session: targetSession,
              messages: 2,
              lastMessageAt: new Date().toISOString(),
              preview: textToSend.slice(0, 80),
            },
            ...prev,
          ];
        });
      } else {
        const res = await guestChat([...messages, userMsg]);
        const assistantMsg: AIChatMessage = { role: "assistant", content: res.response };
        setMessages((prev) => [...prev, assistantMsg]);
        // Server-side count is the source of truth; mirror it locally.
        const used = MAX_GUEST_MESSAGES - (res.remaining ?? MAX_GUEST_MESSAGES - guestCount - 1);
        const next = Math.min(MAX_GUEST_MESSAGES, Math.max(guestCount + 1, used));
        writeGuestState(next);
        setGuestCount(next);
      }
    } catch (err: any) {
      console.error("AI chat error:", err);
      const msg = err.message || "Failed to reach AI Tutor. Please try again.";
      setError(msg);
      // 402 = the server has counted this guest's daily pool as empty (another
      // tab/device) — sync local state so the composer locks immediately.
      if (!isLoggedIn && err?.status === 402) {
        writeGuestState(MAX_GUEST_MESSAGES);
        setGuestCount(MAX_GUEST_MESSAGES);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered a connection difficulty. Please verify your connection or try rephrasing your question.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = content;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        console.warn("Clipboard copy unavailable");
      }
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  /** Start a fresh conversation (its own chat history). */
  const startNewChat = () => {
    const id = newSessionId();
    setSession(id);
    writeActiveSession(id);
    setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
    setError(null);
    setRestoredCount(null);
    if (window.innerWidth < 1024) setSidebarOpen(false);
    inputRef.current?.focus();
  };

  /** Switch to an existing conversation and restore its history. */
  const openChat = (sessionName: string) => {
    if (sessionName === session) return;
    setSession(sessionName);
    writeActiveSession(sessionName);
    setError(null);
    loadSessionHistory(sessionName);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  /** Delete one conversation's history (falls back to a fresh chat). */
  const deleteChat = async (e: React.MouseEvent, sessionName: string) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation permanently?")) return;
    await clearChatHistory(sessionName).catch(() => {});
    setSessions((prev) => prev.filter((s) => s.session !== sessionName));
    if (sessionName === session) {
      const next = sessions.find((s) => s.session !== sessionName);
      if (next) {
        openChat(next.session);
      } else {
        const id = newSessionId();
        setSession(id);
        writeActiveSession(id);
        setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
        setRestoredCount(null);
      }
    }
    refreshSessions();
  };

  /** Clear the ACTIVE conversation (keeps the session, empties its messages). */
  const clearChat = () => {
    setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
    setError(null);
    setRestoredCount(null);
    if (isLoggedIn) clearChatHistory(sessionRef.current).catch(() => {});
    setSessions((prev) => prev.filter((s) => s.session !== sessionRef.current));
  };

  /** Rewrite the drafted prompt into a sharper study question before sending. */
  const handleEnhance = async () => {
    const text = input.trim();
    if (!text || sending || enhancing) return;
    setEnhancing(true);
    setError(null);
    try {
      const { prompt } = await enhancePrompt(text);
      if (prompt) setInput(prompt);
    } catch {
      setError("Could not enhance right now — your original prompt is kept.");
    } finally {
      setEnhancing(false);
      inputRef.current?.focus();
    }
  };

  const displayMessages = messages.filter((m) => m.role !== "system");

  return (
    <div className="flex h-[calc(100vh-10rem)] max-h-[850px] min-h-[500px] rounded-3xl border border-border/80 bg-card shadow-lg overflow-hidden">
      {/* ── Conversations sidebar (individual chat histories) ─────── */}
      {isLoggedIn && (
        <aside
          className={cn(
            "shrink-0 border-r border-border/60 bg-muted/20 flex flex-col transition-all duration-200",
            sidebarOpen ? "w-64" : "w-0 overflow-hidden border-r-0"
          )}
          aria-hidden={!sidebarOpen}
        >
          <div className="p-3 border-b border-border/50">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold py-2.5 hover:opacity-90 transition-opacity"
            >
              <Plus className="h-3.5 w-3.5" />
              New conversation
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <p className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <History className="h-3 w-3" />
              Your chat histories
            </p>
            {sessions.length === 0 ? (
              <p className="px-2 text-[11px] text-muted-foreground leading-relaxed">
                No saved conversations yet. Your first chat will appear here.
              </p>
            ) : (
              sessions.map((s) => (
                <button
                  key={s.session}
                  onClick={() => openChat(s.session)}
                  className={cn(
                    "group w-full text-left rounded-xl px-2.5 py-2 transition-colors flex items-start gap-2",
                    s.session === session
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/60 border border-transparent"
                  )}
                >
                  <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium truncate">
                      {s.preview || "Conversation"}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {s.messages} msgs · {new Date(s.lastMessageAt).toLocaleDateString()}
                    </span>
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Delete conversation"
                    onClick={(e) => deleteChat(e, s.session)}
                    onKeyDown={(e) => e.key === "Enter" && deleteChat(e as any, s.session)}
                    className="opacity-0 group-hover:opacity-100 shrink-0 p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </span>
                </button>
              ))
            )}
          </div>
          <div className="p-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-semibold">
                {Math.min(dailyCredits ?? user?.credits ?? DAILY_CREDIT_POOL, DAILY_CREDIT_POOL)}/{DAILY_CREDIT_POOL} credits today
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* ── Main column ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-border/60 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {isLoggedIn && (
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title={sidebarOpen ? "Hide conversations" : "Show conversations"}
                aria-label="Toggle conversations sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </button>
            )}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-md shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-foreground truncate">Ravikisan&apos;s AI Tutor</h2>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                Professor mode · grounded in the NEB Class 11 &amp; 12 syllabus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isLoggedIn && (
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-semibold">
                <Coins className="h-3 w-3" />
                {guestCredits}/{MAX_GUEST_MESSAGES} free today
              </span>
            )}
            {isLoggedIn && (
              <span
                className="hidden sm:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-muted border border-border/60 font-semibold"
                title={`1 credit per message · daily pool resets to ${DAILY_CREDIT_POOL} at 12:00 AM`}
              >
                <Coins className="h-3 w-3 text-amber-500" />
                {Math.min(dailyCredits ?? user?.credits ?? DAILY_CREDIT_POOL, DAILY_CREDIT_POOL)}/{DAILY_CREDIT_POOL} credits today
              </span>
            )}
            {displayMessages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Clear this conversation"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          {historyState === "loading" ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-xs">Loading conversation…</p>
            </div>
          ) : displayMessages.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 py-6">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/15 to-violet-500/15 text-primary mx-auto flex items-center justify-center">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">What are we learning today?</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Ask anything from Physics, Chemistry, Biology or Mathematics — derivations, mechanisms,
                  misconceptions, or past NEB questions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUGGESTED_PROMPTS.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt.text)}
                      className="p-3 rounded-2xl border border-border/70 bg-muted/15 hover:bg-muted/40 hover:border-primary/50 text-left transition-all group flex flex-col justify-between space-y-1.5"
                    >
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit flex items-center gap-1 ${prompt.color}`}>
                        <Icon className="h-2.5 w-2.5" />
                        <span>{prompt.category}</span>
                      </span>
                      <p className="text-xs text-foreground/90 font-medium group-hover:text-primary transition-colors leading-relaxed">
                        {prompt.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active thread — assistant answers are full-width, user asks are right-aligned */
            displayMessages.map((msg, index) => {
              const isUser = msg.role === "user";
              if (isUser) {
                return (
                  <div key={index} className="flex justify-end">
                    <div className="flex items-end gap-2.5 max-w-[85%]">
                      <div className="rounded-2xl rounded-br-md bg-primary text-primary-foreground px-4 py-2.5 shadow-sm">
                        <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={index} className="group flex gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/25 text-primary flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-border/60 bg-muted/20 px-4 py-3">
                    <div className="text-xs leading-relaxed">
                      <MathMarkdown content={msg.content} />
                    </div>
                    <div className="pt-2 mt-2 border-t border-border/40 flex items-center justify-end">
                      <button
                        onClick={() => handleCopy(msg.content, index)}
                        className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground font-semibold"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Thinking indicator */}
          {sending && (
            <div className="flex gap-3 animate-fade-in">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/25 text-primary flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-md border border-border/60 bg-muted/20 px-4 py-3 flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                </span>
                <span>Thinking through the syllabus…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <div className="flex-1">
                <span>{error}</span>
                {!isLoggedIn && (
                  <Link href="/login" className="ml-2 font-bold underline hover:opacity-80">
                    Log in here &rarr;
                  </Link>
                )}
              </div>
            </div>
          )}

          {restoredCount !== null && restoredCount > 0 && (
            <div className="flex justify-center">
              <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-medium text-muted-foreground">
                Restored {restoredCount} earlier message{restoredCount === 1 ? "" : "s"} from this conversation
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Composer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/60 bg-muted/10 shrink-0">
          <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending || isGuestLimited}
              placeholder={
                isGuestLimited
                  ? "Guest limit reached — please log in to ask more questions."
                  : "Ask a question… (Enter to send, Shift+Enter for a new line)"
              }
              className="flex-1 max-h-32 min-h-[44px] py-2.5 px-4 rounded-2xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none font-medium"
            />

            <button
              onClick={handleEnhance}
              disabled={!input.trim() || sending || enhancing || isGuestLimited}
              className="h-11 w-11 rounded-2xl border border-violet-500/40 bg-violet-500/10 text-violet-600 font-semibold flex items-center justify-center hover:bg-violet-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
              title="Enhance my prompt — rewrite it into a sharper study question"
              aria-label="Enhance prompt"
            >
              {enhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </button>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || sending || isGuestLimited}
              className="h-11 px-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
              aria-label="Send message"
            >
              <span>Send</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-muted-foreground/60 flex items-center justify-center gap-3 flex-wrap">
            {isLoggedIn ? (
              <span className="flex items-center gap-1">
                <UserRound className="h-3 w-3" />
                Each conversation is saved as its own chat history.
              </span>
            ) : (
              <span>
                Free guest mode ({Math.max(0, MAX_GUEST_MESSAGES - guestCount)} messages left) ·{" "}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign in for unlimited questions &amp; saved histories
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
