"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  BookOpen,
  FlaskConical,
  MessageSquareText,
  ArrowRight,
  History,
  Wand2,
} from "lucide-react";
import {
  chat,
  guestChat,
  streamChat,
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  enhancePrompt,
} from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { MathMarkdown } from "@/components/content/math-markdown";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";

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
        "👋, I am the captain here. Feel free to clear your doubts.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoredCount, setRestoredCount] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyLoadedRef = useRef(false);

  // Restore the signed-in user's persisted conversation once per mount.
  useEffect(() => {
    if (!isLoggedIn || historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    getChatHistory("default", 200)
      .then(({ messages }) => {
        if (!messages.length) return;
        setMessages((prev) => [
          ...prev,
          ...messages.map((m) => ({ role: m.role, content: m.content }) as AIChatMessage),
        ]);
        setRestoredCount(messages.length);
      })
      .catch(() => {
        // History unavailable (table not migrated yet / offline) — fresh chat is fine.
      });
  }, [isLoggedIn]);

  const visibleMessages = messages.filter((m) => m.role !== "system");
  const hasStarted = visibleMessages.length > 1;

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || sending) return;

    const userMsg: AIChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      if (isLoggedIn) {
        // Use streaming for logged-in users
        let accumulated = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
        
        for await (const chunk of streamChat([...messages, userMsg])) {
          accumulated += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: accumulated };
            return updated;
          });
        }
        saveChatHistory("default", [
          { role: "user", content: text },
          { role: "assistant", content: accumulated },
        ]).catch(() => {});
      } else {
        const res = await guestChat([...messages, userMsg]);
        setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
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

  const clearChat = () => {
    setMessages([
      { role: "system", content: PLATFORM_SYSTEM_PROMPT },
      {
        role: "assistant",
        content:
          "👋, I am the captain here. Feel free to clear your doubts.",
      },
    ]);
    setError(null);
    setRestoredCount(null);
    if (isLoggedIn) clearChatHistory("default").catch(() => {});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-bold leading-none">Ravikisan's AI Tutor</h2>
          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            Online · answers + points you to notes, labs &amp; PYQs
          </p>
        </div>
        {isLoggedIn && (
          <button
            onClick={clearChat}
            disabled={sending || enhancing}
            className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            title="New chat — clears your saved history for this device session"
            aria-label="New chat (clear history)"
          >
            <History className="h-3.5 w-3.5" />
          </button>
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
              <h2 className="text-lg font-bold">Learn with your AI study buddy</h2>
              <p className="text-xs text-muted-foreground mt-1">
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
                    <span className="text-xs font-medium group-hover:text-foreground">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto space-y-4">
          {restoredCount !== null && restoredCount > 0 && (
            <div className="flex justify-center">
              <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-medium text-muted-foreground">
                Restored {restoredCount} earlier message{restoredCount === 1 ? "" : "s"} from your history
              </span>
            </div>
          )}
          {visibleMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <MathMarkdown content={m.content} className="chat-prose" />
                )}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs text-muted-foreground">
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
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about notes, formulas, labs, past questions…"
            disabled={sending}
            className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
          />
          <button
            onClick={handleEnhance}
            disabled={!input.trim() || sending || enhancing}
            className="h-11 w-11 rounded-xl border border-primary/40 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Enhance my prompt — rewrite it into a sharper study question"
            aria-label="Enhance prompt"
          >
            {enhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || sending}
            className="h-11 px-4 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
