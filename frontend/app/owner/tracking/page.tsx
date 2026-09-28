"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageSquareText, RefreshCw, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getOwnerUsers,
  getOwnerUserChats,
  type OwnerChatMessage,
  type OwnerChatSession,
  type OwnerUser,
} from "@/lib/api/owner";

export default function OwnerTrackingPage() {
  const [users, setUsers] = useState<OwnerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<OwnerChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<OwnerChatMessage[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setUsers(await getOwnerUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleUser = async (u: OwnerUser) => {
    if (expandedId === u.id) {
      setExpandedId(null);
      setSessions([]);
      setMessages([]);
      setActiveSession(null);
      return;
    }
    setExpandedId(u.id);
    setSessions([]);
    setMessages([]);
    setActiveSession(null);
    setLoadingChats(true);
    try {
      const res = await getOwnerUserChats(u.id);
      setSessions(res.sessions);
    } catch {
      setError("Could not load chat history for this user");
    } finally {
      setLoadingChats(false);
    }
  };

  const openSession = async (userId: string, session: string) => {
    if (activeSession === session) {
      setActiveSession(null);
      setMessages([]);
      return;
    }
    setActiveSession(session);
    setLoadingChats(true);
    try {
      const res = await getOwnerUserChats(userId, session, 300);
      setMessages(res.messages);
    } catch {
      setError("Could not load messages");
    } finally {
      setLoadingChats(false);
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? users.filter((u) => u.email.toLowerCase().includes(q) || (u.full_name ?? "").toLowerCase().includes(q))
    : users;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquareText className="h-6 w-6 text-primary" />
            Tracking
          </h1>
          <p className="text-sm text-muted-foreground">
            Per-user AI chat history: sessions, activity and full conversations.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by email or name…"
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No users found.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((u) => (
                <div key={u.id} className="rounded-lg border overflow-hidden">
                  <button
                    onClick={() => toggleUser(u)}
                    className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{u.full_name || u.email}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {u.email} · joined {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                      </p>
                    </div>
                    {expandedId === u.id ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>

                  {expandedId === u.id && (
                    <div className="border-t bg-muted/20 p-4 space-y-3">
                      {loadingChats && sessions.length === 0 ? (
                        <Skeleton className="h-16" />
                      ) : sessions.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No chat history yet.</p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Conversations ({sessions.length})
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {sessions.map((s) => (
                              <button
                                key={s.session}
                                onClick={() => openSession(u.id, s.session)}
                                className={`text-xs rounded-lg border px-2.5 py-1.5 text-left max-w-64 transition-colors ${
                                  activeSession === s.session
                                    ? "border-primary/60 bg-primary/10 text-primary"
                                    : "border-border/60 bg-background hover:border-primary/40"
                                }`}
                              >
                                <span className="block truncate font-medium">
                                  {s.preview || s.session}
                                </span>
                                <span className="block text-[10px] text-muted-foreground">
                                  {s.messages} msgs · {new Date(s.lastMessageAt).toLocaleDateString()}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {activeSession && (
                        <div className="space-y-2 max-h-96 overflow-y-auto rounded-lg border border-border/50 bg-background p-3">
                          {loadingChats ? (
                            <Skeleton className="h-24" />
                          ) : messages.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No messages.</p>
                          ) : (
                            messages.map((m, i) => (
                              <div
                                key={m.id ?? i}
                                className={`text-xs rounded-xl px-3 py-2 max-w-[85%] ${
                                  m.role === "user"
                                    ? "bg-primary/10 border border-primary/20 ml-auto"
                                    : "bg-muted/40 border border-border/60 mr-auto"
                                }`}
                              >
                                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">
                                  {m.role} · {new Date(m.created_at).toLocaleString()}
                                </p>
                                <p className="whitespace-pre-wrap break-words line-clamp-8">{m.content}</p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
