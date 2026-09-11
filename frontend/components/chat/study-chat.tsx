"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  BookOpen,
  FlaskConical,
  MessageSquareText,
  ArrowRight,
  Settings2,
} from "lucide-react";
import { chat, guestChat, streamChat, getProviders } from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { AIChatMessage } from "@/types/api";
import { useSession } from "@/features/auth/hooks/use-session";

// Renders AI replies as clean plain text. Markdown links ([Title](url)) are
// harvested BEFORE scrubbing so they survive, then rendered as clickable chips
// (internal links use next/link, external ones open in a new tab). Everything
// else is stripped of symbol soup (LaTeX/markdown leftovers) for a pure look.
function formatAiReply(raw: string): React.ReactNode {
  const links: Array<{ title: string; url: string }> = [];
  const guarded = raw.replace(
    /\[([^\]\n]{1,80})\]\(([^)\s]{1,300})\)/g,
    (_match: string, title: string, url: string) => {
      links.push({ title: title.trim(), url: url.trim() });
      return `RVKLINKREF${links.length - 1}RVKLINKREF`;
    }
  );

  // Pure appearance: drop banned symbol chars (keeps unicode letters so
  // Nepali text and emoji survive), then tidy spacing without killing lines.
  // eslint-disable-next-line no-useless-escape -- [ and ] must stay escaped in the class
  const cleaned = guarded
    .replace(/[<>=+*#$^&\\|{}~`\[\]]/g, " ")
    .replace(/[^\S\n]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const segments = cleaned.split(/(RVKLINKREF\d+RVKLINKREF)/g);
  const chipClass =
    "inline-flex items-center gap-1 mx-0.5 my-1 px-2 py-1 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors align-baseline";
  const linkIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  );

  const parts: React.ReactNode[] = [];
  segments.forEach((seg, idx) => {
    const token = /^RVKLINKREF(\d+)RVKLINKREF$/.exec(seg);
    if (token) {
      const l = links[Number(token[1])];
      if (!l) return;
      if (l.url.startsWith("/")) {
        parts.push(
          <Link key={`l${idx}`} href={l.url} className={chipClass}>
            {linkIcon}
            {l.title}
          </Link>
        );
      } else {
        parts.push(
          <a key={`l${idx}`} href={l.url} target="_blank" rel="noopener noreferrer" className={chipClass}>
            {linkIcon}
            {l.title}
          </a>
        );
      }
      return;
    }
    if (seg.trim()) parts.push(<span key={`t${idx}`}>{seg}</span>);
  });

  if (!parts.length) return null;
  return <div className="leading-relaxed whitespace-pre-line">{parts}</div>;
}

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
  const [providers, setProviders] = useState<string[]>([]);
  const [defaultProvider, setDefaultProvider] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [showProviderSelector, setShowProviderSelector] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load available providers
    getProviders().then(({ providers: provs, defaultProvider: defProv }) => {
      setProviders(provs);
      setDefaultProvider(defProv);
      setSelectedProvider(defProv);
    }).catch(() => {
      setProviders([]);
    });
  }, []);

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
        
        for await (const chunk of streamChat([...messages, userMsg], selectedProvider)) {
          accumulated += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: accumulated };
            return updated;
          });
        }
      } else {
        const res = await guestChat([...messages, userMsg], selectedProvider);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const providerLabel = (name: string) => {
    const labels: Record<string, string> = {
      internal: "Internal",
      gemini: "Gemini",
      openrouter: "OpenRouter",
      agnes: "Agnes",
    };
    return labels[name] || name;
  };

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-bold leading-none">Ravikishan Study Assistant</h2>
          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            Online · answers + points you to notes, labs &amp; PYQs
          </p>
        </div>
        
        {/* Provider selector */}
        {providers.length > 0 && (
          <div className="relative shrink-0">
            <button
              onClick={() => setShowProviderSelector(!showProviderSelector)}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted"
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span>{providerLabel(selectedProvider)}</span>
            </button>
            
            {showProviderSelector && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowProviderSelector(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg z-20 py-1">
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setSelectedProvider(p);
                        setShowProviderSelector(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors ${
                        p === selectedProvider ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {providerLabel(p)}
                      {p === defaultProvider && <span className="ml-1 text-muted-foreground">(default)</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
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
          {visibleMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {m.role === "user"
                  ? m.content
                  : formatAiReply(m.content)}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {selectedProvider ? `Streaming via ${providerLabel(selectedProvider)}…` : "Thinking…"}
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
