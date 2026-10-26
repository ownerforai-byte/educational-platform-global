"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, UserRound, X } from "lucide-react";
import { CaptainAvatar, CaptainMark } from "@/components/ai/captain-logo";
import { recordAiSparkUse } from "@/components/ai/ai-spark-badge";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { useSession } from "@/features/auth/hooks/use-session";
import { chat } from "@/lib/api/ai";
import type { AIChatMessage } from "@/types/api";

type Line = { role: "user" | "assistant"; content: string };

const OPENING =
  "I'm Veer. Ask a syllabus question and I'll answer here. Open the full chat when you want history, photos, or a longer thread.";

/**
 * Left-side Veer panel for approved accounts only. Visitors keep the plain
 * home chat. This one talks to the signed-in Veer route and spends AI sparks.
 */
export function AIWidget() {
  const { user, isLoading } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([{ role: "assistant", content: OPENING }]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, sending, open]);

  if (!mounted || isLoading || !user) return null;
  if (pathname === "/chat" || pathname.startsWith("/chat/")) return null;

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    const history: AIChatMessage[] = [
      ...lines.map((line) => ({ role: line.role, content: line.content })),
      { role: "user", content: text },
    ];
    setInput("");
    setError(null);
    setLines((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const res = await chat(history);
      recordAiSparkUse();
      setLines((prev) => [...prev, { role: "assistant", content: res.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veer could not answer. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed left-4 bottom-safe z-50 flex flex-col items-start gap-2">
      {open && (
        <section
          aria-label="Veer chat"
          className="flex h-[min(78vh,720px)] w-[min(100vw-2rem,42rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <header className="flex items-center justify-between gap-2 border-b border-border bg-foreground px-3 py-2.5 text-background">
            <div className="min-w-0">
              <p className="text-sm font-bold">Veer</p>
              <p className="text-[10px] text-background/70">Approved account · uses your AI sparks</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 hover:bg-background/10"
              aria-label="Close Veer"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollerRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/20 px-4 py-4">
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

          <form
            className="flex gap-2 border-t border-border p-3"
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
              placeholder="Ask Veer"
              disabled={sending}
              className="min-h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
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
