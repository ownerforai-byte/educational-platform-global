"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { chat, guestChat } from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";

export function AIWidget() {
  const { user } = useSession();
  const isLoggedIn = !!user;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    { role: "system", content: PLATFORM_SYSTEM_PROMPT },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: AIChatMessage = { role: "user", content: text };
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
      }
    } catch (e: any) {
      if (e.message?.includes("429") || e.message?.includes("limit reached")) {
        setError(e.message || "Failed to get response");
        const assistantMsg: AIChatMessage = { role: "assistant", content: "⚠️ Something went wrong. Please try again." };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setError(e.message || "Failed to get response");
        const assistantMsg: AIChatMessage = { role: "assistant", content: "⚠️ Something went wrong. Please try again." };
        setMessages((prev) => [...prev, assistantMsg]);
      }
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

  return (
    <>
      {/* Floating toggle button — bottom-left */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          open
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-br from-primary to-primary/70 hover:scale-105"
        }`}
        aria-label="Toggle AI chat"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </button>

      {/* Chat panel — bottom-left, above the toggle */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col" style={{ height: "min(520px, calc(100vh - 8rem))" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
             <div className="flex-1 min-w-0">
               <p className="text-xs font-semibold leading-none">Study Assistant</p>
               <p className="text-[10px] text-muted-foreground mt-0.5">Ask about NEB Study Vault content</p>
             </div>
             <Link
               href="/chat"
               onClick={() => setOpen(false)}
               className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline shrink-0"
               title="Open full chat"
             >
               <MessageSquareText className="h-3 w-3" />
               Full chat
             </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.filter(m => m.role !== "system").map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl px-3 py-2 flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Thinking…</span>
                </div>
              </div>
            )}
            {error && (
              <div className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{error}</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border p-3 shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about notes, labs, syllabus…"
                disabled={sending}
                className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
