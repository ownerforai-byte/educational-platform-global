"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { postPlatformGuideMessage } from "@/lib/api/platform-guide";

type ChatLine = { role: "user" | "assistant"; content: string };

const OPENING =
  "Hi — ask me about this platform, plans, and sign-in. I only answer in text, and I don't teach syllabus topics.";

/**
 * The free visitor chat: a text box and a send button. It does not spend
 * Veer sparks. Shown on the universal welcome and the guest home.
 */
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
      className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-card text-left shadow-sm"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Chat with AI</h2>
        <p className="text-xs text-muted-foreground">Free on this page · text only</p>
      </div>
      <div className="max-h-64 space-y-2 overflow-y-auto px-4 py-3 text-sm leading-relaxed">
        {lines.map((line, i) => (
          <p
            key={`${line.role}-${i}`}
            className={
              line.role === "user"
                ? "ml-8 rounded-xl bg-primary/10 px-3 py-2 text-foreground"
                : "mr-8 rounded-xl bg-muted px-3 py-2 text-muted-foreground"
            }
          >
            {line.content}
          </p>
        ))}
        {sending && <p className="text-xs text-muted-foreground">Thinking…</p>}
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
          placeholder="Type a message"
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
