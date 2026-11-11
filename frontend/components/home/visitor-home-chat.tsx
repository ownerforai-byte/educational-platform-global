"use client";

import { useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { postPlatformGuideMessage } from "@/lib/api/platform-guide";

type ChatLine = { role: "user" | "assistant"; content: string };

const OPENING =
  "Hi — I'm Veer AI. Ask me anything — I'll keep it short and simple.";

export function VisitorHomeChat() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<ChatLine[]>([
    { role: "assistant", content: OPENING },
  ]);

  async function send() {
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
      setError(err instanceof Error ? err.message : "Could not reach the chat. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      aria-label="Chat with AI"
      className="mx-auto w-full max-w-xl rounded-2xl border-2 border-border/80 bg-card text-left shadow-sm"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Chat with AI</h2>
        <p className="text-xs text-muted-foreground">Quick answers · free · text only</p>
      </div>
      <div className="max-h-80 space-y-3 overflow-y-auto bg-muted/20 px-4 py-3 text-sm leading-relaxed">
        {lines.map((line, i) => {
          const mine = line.role === "user";
          return (
            <article
              key={`${line.role}-${i}`}
              className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : "flex-row"}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  mine ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                }`}
                aria-hidden="true"
              >
                {mine ? <UserRound className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </span>
              <div className={`max-w-[85%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <span className={`px-1 text-[10px] font-bold uppercase tracking-wide ${mine ? "text-primary" : "text-foreground"}`}>
                  {mine ? "You" : "Veer AI"}
                </span>
                <p
                  className={
                    mine
                      ? "rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground"
                      : "rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-foreground"
                  }
                >
                  {line.content}
                </p>
              </div>
            </article>
          );
        })}
        {sending && (
          <article className="flex items-end gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background" aria-hidden="true">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="px-1 text-[10px] font-bold uppercase tracking-wide text-foreground">Veer AI</span>
              <p className="rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-muted-foreground">
                Writing a reply…
              </p>
            </div>
          </article>
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
        <label className="sr-only" htmlFor="visitor-home-chat">
          Message
        </label>
        <input
          id="visitor-home-chat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything"
          maxLength={500}
          disabled={sending}
          className="min-h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send
        </button>
      </form>
    </section>
  );
}
