"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { isFirebaseAuthEnabled } from "@/lib/firebase/client-auth";
import { isFirebaseWebConfigured } from "@/lib/fcm/config";
import { useLobbyMessages } from "./use-lobby-messages";

export function LobbyChat() {
  const { user } = useAuth();
  const firebaseAuth = isFirebaseAuthEnabled();
  const configured = isFirebaseWebConfigured();
  const { messages, send, ready, error, firebaseUid } = useLobbyMessages();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  if (!firebaseAuth || !configured) {
    return (
      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
        Realtime chat needs Firebase web config and <code className="text-xs">NEXT_PUBLIC_USE_FIREBASE_AUTH=true</code>.
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">Sign in to join the live lobby.</p>
    );
  }

  if (!firebaseUid) {
    return (
      <p className="text-sm text-muted-foreground">
        Firebase session is refreshing — open this page again after signing in, or reload once.
      </p>
    );
  }

  const handleSend = async () => {
    if (!draft.trim()) return;
    setSending(true);
    try {
      await send(draft);
      setDraft("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[min(70dvh,640px)] min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <p className="border-b border-border px-4 py-2 text-xs text-muted-foreground">
        Community chat for the whole platform — be kind, keep it study-friendly.
      </p>
      <div ref={scrollerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {!ready ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting…
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        ) : null}
        {ready && messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Say hello.</p>
        ) : null}
        {messages.map((m) => {
          const own = m.senderId === firebaseUid;
          return (
            <div
              key={m.id}
              className={`flex ${own ? "justify-end" : "justify-start"}`}
              data-testid="lobby-message"
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                  own
                    ? "bg-[#D2223D] text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{m.text}</p>
                <p className={`mt-1 text-[10px] ${own ? "text-white/70" : "text-muted-foreground"}`}>
                  {own ? "You" : m.senderId.slice(0, 8)}
                  {m.createdAt ? ` · ${m.createdAt.toLocaleTimeString()}` : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend();
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message the lobby…"
          className="min-h-11 flex-1 rounded-full border border-border bg-background px-4 text-base outline-none ring-primary focus:ring-2"
          maxLength={2000}
          data-testid="lobby-composer"
        />
        <Button
          type="submit"
          className="h-11 w-11 shrink-0 rounded-full"
          disabled={sending || !draft.trim()}
          aria-label="Send message"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}