"use client";

import { useState } from "react";
import { Heart, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { labStorageKey, useLabStorage } from "./use-lab-storage";

export interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Thread {
  id: string;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Reply[];
  likes: number;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: "1",
    title: "Understanding 3D Geometry",
    author: "Alice",
    content: "Can someone explain how the golden ratio appears in icosahedrons?",
    timestamp: new Date().toISOString(),
    likes: 8,
    replies: [
      { id: "r1", author: "Bob", content: "The ratio of edge to diagonal in an icosahedron is the golden ratio φ!", timestamp: new Date().toISOString(), likes: 3 },
    ],
  },
  {
    id: "2",
    title: "Calculus Help",
    author: "Charlie",
    content: "Need help with integration by parts. Any resources?",
    timestamp: new Date().toISOString(),
    likes: 5,
    replies: [],
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString();
}

export interface DiscussionThreadProps {
  labId: string;
}

export function DiscussionThread({ labId }: DiscussionThreadProps) {
  const [threads, setThreads] = useLabStorage<Thread[]>(
    labStorageKey(labId, "discussion"),
    INITIAL_THREADS
  );
  const [newThread, setNewThread] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [userName, setUserName] = useState("Student");

  const handlePostThread = () => {
    if (!newThread.trim() || !newTitle.trim()) return;
    const thread: Thread = {
      id: Date.now().toString(),
      title: newTitle,
      author: userName,
      content: newThread,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setThreads([thread, ...threads]);
    setNewThread("");
    setNewTitle("");
  };

  const handleReply = (threadId: string) => {
    if (!replyContent.trim()) return;
    setThreads(
      threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: [
                ...t.replies,
                {
                  id: Date.now().toString(),
                  author: userName,
                  content: replyContent,
                  timestamp: new Date().toISOString(),
                  likes: 0,
                },
              ],
            }
          : t
      )
    );
    setReplyContent("");
    setReplyTo(null);
  };

  const handleLike = (threadId: string, replyId?: string) => {
    setThreads(
      threads.map((t) => {
        if (t.id !== threadId) return t;
        if (replyId) {
          return {
            ...t,
            replies: t.replies.map((r) =>
              r.id === replyId ? { ...r, likes: r.likes + 1 } : r
            ),
          };
        }
        return { ...t, likes: t.likes + 1 };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input
          type="text"
          placeholder="Thread title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="min-w-[200px] flex-1"
        />
        <Input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-[140px]"
        />
      </div>
      <Textarea
        placeholder="Start a discussion…"
        value={newThread}
        onChange={(e) => setNewThread(e.target.value)}
        className="min-h-[80px] resize-y"
      />
      <Button onClick={handlePostThread}>
        <Send className="mr-2 h-4 w-4" />
        Post Thread
      </Button>

      <div className="flex flex-col gap-4">
        {threads.map((thread) => (
          <div key={thread.id} className="rounded-lg border border-border bg-muted/40 p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">{thread.title}</h3>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {formatDate(thread.timestamp)}
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-foreground/90">{thread.content}</p>
            <div className="mb-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleLike(thread.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Heart className="h-3.5 w-3.5" />
                {thread.likes}
              </button>
              <button
                type="button"
                onClick={() => setReplyTo(replyTo === thread.id ? null : thread.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Reply ({thread.replies.length})
              </button>
            </div>

            {replyTo === thread.id && (
              <div className="mb-3 flex gap-2">
                <Input
                  type="text"
                  placeholder="Write a reply…"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReply(thread.id)}
                  className="h-9 flex-1 text-xs"
                />
                <Button size="sm" onClick={() => handleReply(thread.id)}>
                  Send
                </Button>
              </div>
            )}

            {thread.replies.length > 0 && (
              <div className="ml-4 border-l-2 border-primary/30 pl-3">
                {thread.replies.map((reply) => (
                  <div key={reply.id} className="mb-3 last:mb-0">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold">{reply.author}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatTime(reply.timestamp)}
                      </span>
                    </div>
                    <p className="mb-1 text-xs text-foreground/90">{reply.content}</p>
                    <button
                      type="button"
                      onClick={() => handleLike(thread.id, reply.id)}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Heart className="h-3 w-3" />
                      {reply.likes}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
