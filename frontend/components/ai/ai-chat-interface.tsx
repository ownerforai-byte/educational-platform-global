"use client";

import React, { useState, useRef, useEffect } from "react";
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
  GraduationCap,
  Atom,
  FlaskConical,
  Binary,
  RotateCcw,
} from "lucide-react";
import { chat, guestChat } from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";
import { MathMarkdown } from "@/components/content/math-markdown";

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

const MAX_GUEST_MESSAGES = 7;
const STORAGE_KEY = "neb_ai_guest_count";
const CREDITS_STORAGE_KEY = "neb_guest_credits";

function getGuestCount(): number {
  if (typeof window === "undefined") return 0;
  const v = localStorage.getItem(STORAGE_KEY);
  return v ? parseInt(v, 10) : 0;
}

function incGuestCount(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(getGuestCount() + 1));
}

function getGuestCredits(): number {
  if (typeof window === "undefined") return 50;
  const v = localStorage.getItem(CREDITS_STORAGE_KEY);
  return v ? parseInt(v, 10) : 50;
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
  const [guestCredits, setGuestCredits] = useState<number>(50);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const guestCount = getGuestCount();
  const isGuestLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;

  useEffect(() => {
    if (!isLoggedIn) {
      setGuestCredits(getGuestCredits());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || sending) return;

    if (isGuestLimited) {
      setError("You've reached the free guest message limit. Please sign in to continue unlimited AI tutoring!");
      return;
    }

    const userMsg: AIChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      if (isLoggedIn) {
        const res = await chat([...messages, userMsg], "agnes");
        const assistantMsg: AIChatMessage = { role: "assistant", content: res.response };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const res = await guestChat([...messages, userMsg], "agnes");
        const assistantMsg: AIChatMessage = { role: "assistant", content: res.response };
        setMessages((prev) => [...prev, assistantMsg]);
        const newCredits = res.remaining ?? Math.max(0, getGuestCredits() - 2);
        setGuestCredits(newCredits);
        localStorage.setItem(CREDITS_STORAGE_KEY, String(newCredits));
        incGuestCount();
      }
    } catch (err: any) {
      console.error("AI chat error:", err);
      const msg = err.message || "Failed to reach AI Tutor. Please try again.";
      setError(msg);
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

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([{ role: "system", content: PLATFORM_SYSTEM_PROMPT }]);
    setError(null);
  };

  const displayMessages = messages.filter((m) => m.role !== "system");

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[850px] min-h-[500px] rounded-3xl border border-border/80 bg-card shadow-lg overflow-hidden">
      {/* ── Chat Header ─────────────────────────────────────────────── */}
      <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-md shadow-primary/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-foreground">Ravikisan AI Tutor</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                Professor Mode
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              NEB Class 11 &amp; 12 syllabus-grounded assistant with LaTeX math &amp; CEE insights
            </p>
          </div>
        </div>

        {/* Top Controls: credits + clear */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl bg-muted border border-border/60 text-foreground">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              <span>{user?.credits ?? 0} Credits</span>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/60 border border-border/50">
              <span>Guest messages:</span>
              <strong className="text-primary">{guestCount}/{MAX_GUEST_MESSAGES}</strong>
            </span>
          )}

          {displayMessages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Clear conversation"
              aria-label="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Message Stream Area ──────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {displayMessages.length === 0 ? (
          /* Empty State: Suggested Prompts */
          <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 py-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">How can I assist your studies today?</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Ask any question from Physics, Chemistry, Biology, or Mathematics. I can derive formulas, explain reaction mechanisms, clarify misconceptions, and solve past questions.
              </p>
            </div>

            {/* Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUGGESTED_PROMPTS.map((prompt, i) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="p-3 rounded-2xl border border-border/70 bg-muted/15 hover:bg-muted/40 hover:border-primary/50 text-left transition-all group flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${prompt.color} flex items-center gap-1`}>
                        <Icon className="h-2.5 w-2.5" />
                        <span>{prompt.category}</span>
                      </span>
                    </div>
                    <p className="text-xs text-foreground/90 font-medium group-hover:text-primary transition-colors leading-relaxed">
                      {prompt.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Chat Thread */
          displayMessages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex gap-3.5 max-w-3xl ${isUser ? "ml-auto justify-end" : "mr-auto"}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed relative group ${
                    isUser
                      ? "bg-primary text-primary-foreground shadow-sm max-w-[85%]"
                      : "bg-muted/25 border border-border/70 text-foreground max-w-[95%] sm:max-w-[90%]"
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                  ) : (
                    <div className="space-y-2">
                      <MathMarkdown content={msg.content} />

                      {/* Copy Action Button */}
                      <div className="pt-2 flex justify-end border-t border-border/30 opacity-60 group-hover:opacity-100 transition-opacity">
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
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="h-8 w-8 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Thinking / Streaming Indicator */}
        {sending && (
          <div className="flex gap-3 max-w-2xl mr-auto animate-fade-in">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl p-4 bg-muted/20 border border-border/70 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span>Analyzing curriculum &amp; deriving answer...</span>
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

        <div ref={chatBottomRef} />
      </div>

      {/* ── Input Box Footer ─────────────────────────────────────────── */}
      <div className="p-4 border-t border-border/60 bg-muted/10 shrink-0">
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
                : "Ask about any NEB concept, derivation, or formula (Enter to send, Shift+Enter for newline)..."
            }
            className="flex-1 max-h-32 min-h-[44px] py-2.5 px-4 rounded-2xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none font-medium"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || sending || isGuestLimited}
            className="h-11 px-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
            aria-label="Send message"
          >
            <span>Ask</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-2 text-center text-[10px] text-muted-foreground/60 flex items-center justify-center gap-3">
          <span>AI Tutor responses are grounded in NEB Class 11 &amp; 12 CDC syllabi.</span>
          {!isLoggedIn && (
            <span>
              Free Guest Mode ·{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in for unlimited questions
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
