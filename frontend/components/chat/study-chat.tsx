"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  Coins,
  BookOpen,
  FlaskConical,
  MessageSquareText,
  ArrowRight,
} from "lucide-react";
import { chat, guestChat } from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";

const MAX_GUEST_MESSAGES = 7;

const SUGGESTIONS = [
  { icon: BookOpen, label: "Explain photosynthesis simply", text: "Explain photosynthesis simply, with why plants need it." },
  { icon: FlaskConical, label: "What is a mole in chemistry?", text: "What is a mole in chemistry? Explain it like I'm new." },
  { icon: Sparkles, label: "Make me a physics study plan", text: "Make me a short weekly study plan for Class 11 physics." },
  { icon: MessageSquareText, label: "Newton's laws with examples", text: "Explain Newton's three laws using everyday examples." },
];

export function StudyChat({ compact = false }: { compact?: boolean }) {
  const { user } = useSession();
  const isLoggedIn = !!user;
  const [messages, setMessages] = useState<AIChatMessage[]>([
    { role: "system", content: PLATFORM_SYSTEM_PROMPT },
    {
      role: "assistant",
      content:
        "Hey! I'm your Ravikishan Study Assistant 👋\n\nAsk me anything about your NEB lessons, labs, past questions, or even life advice. I'll answer and point you to the right notes and tools on the platform.\n\nWhat are we studying today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const v = localStorage.getItem("neb_ai_guest_count");
      setGuestCount(v ? parseInt(v, 10) : 0);
    }
  }, []);

  const isLimited = !isLoggedIn && guestCount >= MAX_GUEST_MESSAGES;

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending, scrollToBottom]);

  useEffect(() => {
    if (!compact) inputRef.current?.focus();
  }, [compact]);

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || sending) return;
    if (isLimited) return;

    const userMsg: AIChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      if (isLoggedIn) {
        const res = await chat([...messages, userMsg], "agnes");
        setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
      } else {
        const res = await guestChat([...messages, userMsg], "agnes");
        setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
        if (typeof window !== "undefined") {
          const next = guestCount + 1;
          setGuestCount(next);
          localStorage.setItem("neb_ai_guest_count", String(next));
        }
      }
    } catch (e: any) {
      const errText =
        e.message?.includes("429") || e.message?.includes("limit reached")
          ? "Message limit reached. Sign in to continue."
          : e.message?.includes("Insufficient") || e.message?.includes("402")
            ? "Guest credits exhausted. Sign in to continue."
            : "Something went wrong. Please try again.";
      setError(errText);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const visibleMessages = messages.filter((m) => m.role !== "system");
  const hasStarted = visibleMessages.length > 1;

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold leading-none">Ravikishan Study Assistant</h2>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            Online · answers + points you to notes, labs &amp; PYQs
          </p>
        </div>
        {!isLoggedIn && (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
            <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
              <Coins className="h-3 w-3 text-amber-500" />
              <span>{MAX_GUEST_MESSAGES - guestCount} free</span>
            </div>
            <Link href="/signup" className="flex items-center gap-1 text-primary font-semibold hover:underline">
              <ShieldCheck className="h-3.5 w-3.5" />
              Sign in
            </Link>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
        {!hasStarted && (
          <div className="max-w-2xl mx-auto space-y-6 pt-6">
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 mb-3">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl font-bold">Learn with your AI study buddy</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Ask anything about Class 11 &amp; 12 science — I&apos;ll explain it and send you to the right notes.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.text}
                    onClick={() => sendMessage(s.text)}
                    disabled={sending}
                    className="group flex items-start gap-3 rounded-xl border border-border p-3.5 text-left hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-foreground">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto space-y-4">
          {visibleMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking…
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{error}</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 sm:px-6 py-3 shrink-0">
        {isLimited ? (
          <div className="max-w-2xl mx-auto text-center py-2 rounded-xl bg-muted/40 border border-border">
            <p className="text-sm font-semibold">You&apos;ve used all your free messages</p>
            <p className="text-xs text-muted-foreground mt-1 mb-2">Sign in to keep chatting with the AI study assistant.</p>
            <Link href="/signup" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              Get free access <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about notes, formulas, labs, past questions…"
              disabled={sending}
              className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || sending}
              className="h-11 px-4 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
