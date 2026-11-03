"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";
import { postPlatformGuideMessage } from "@/lib/api/platform-guide";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatLine = { role: "user" | "assistant"; content: string };

const OPENING =
  "Hi — I'm Veer AI. Ask me anything: I give the short, general answer here, and full step-by-step help opens inside the app.";

export function PlatformGuideWidget() {
  const pathname = usePathname() ?? "/";
  const { user, isLoading } = useSession();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<ChatLine[]>([
    { role: "assistant", content: OPENING },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  const visible =
    mounted &&
    !isLoading &&
    shouldShowPlatformGuideWidget(pathname, user ?? null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setError(null);
    setLines((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const { reply } = await postPlatformGuideMessage(text);
      setLines((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not reach the guide. Try again.";
      setError(msg);
    } finally {
      setSending(false);
    }
  }, [input, sending]);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-safe z-[45] flex flex-col items-end gap-2">
      {open && (
        <div
          className="w-[min(100vw-2rem,320px)] overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-xl shadow-black/10 backdrop-blur-md"
          role="dialog"
          aria-label="Platform guide chat"
        >
          <header className="flex items-center justify-between gap-2 border-b border-border/60 bg-gradient-to-r from-primary/10 via-card to-card px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Veer AI</p>
              <p className="text-[10px] text-muted-foreground truncate">About Ravikisan · not tutoring</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close guide"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="max-h-52 overflow-y-auto px-3 py-2 space-y-2 text-[13px] leading-snug"
          >
            {lines.map((line, i) => (
              <div
                key={`${line.role}-${i}`}
                className={
                  line.role === "user"
                    ? "ml-6 rounded-xl bg-primary/15 px-2.5 py-1.5 text-foreground"
                    : "mr-4 rounded-xl bg-muted/60 px-2.5 py-1.5 text-muted-foreground"
                }
              >
                {line.content}
              </div>
            ))}
            {sending && (
              <p className="text-[11px] text-muted-foreground animate-pulse">Thinking…</p>
            )}
            {error && <p className="text-[11px] text-destructive">{error}</p>}
          </div>

          <form
            className="flex gap-1.5 border-t border-border/60 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the platform…"
              className="h-9 text-xs"
              disabled={sending}
              maxLength={500}
              aria-label="Message to platform guide"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={sending || !input.trim()}>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-label={open ? "Close platform guide" : "Open platform guide"}
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
