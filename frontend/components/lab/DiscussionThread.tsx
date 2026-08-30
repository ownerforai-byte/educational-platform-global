"use client";

import { useState } from "react";

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  content: string;
  timestamp: Date;
  replies: Reply[];
  likes: number;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: "1",
    title: "Understanding 3D Geometry",
    author: "Alice",
    content: "Can someone explain how the golden ratio appears in icosahedrons?",
    timestamp: new Date(),
    likes: 8,
    replies: [
      { id: "r1", author: "Bob", content: "The ratio of edge to diagonal in an icosahedron is the golden ratio φ!", timestamp: new Date(), likes: 3 },
    ],
  },
  {
    id: "2",
    title: "Calculus Help",
    author: "Charlie",
    content: "Need help with integration by parts. Any resources?",
    timestamp: new Date(),
    likes: 5,
    replies: [],
  },
];

export function DiscussionThread({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [newThread, setNewThread] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [userName, setUserName] = useState("Student");
  const isDark = theme === "dark";

  const handlePostThread = () => {
    if (!newThread.trim() || !newTitle.trim()) return;
    const thread: Thread = {
      id: Date.now().toString(),
      title: newTitle,
      author: userName,
      content: newThread,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };
    setThreads([thread, ...threads]);
    setNewThread("");
    setNewTitle("");
  };

  const handleReply = (threadId: string) => {
    if (!replyContent.trim()) return;
    setThreads(threads.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [...t.replies, {
            id: Date.now().toString(),
            author: userName,
            content: replyContent,
            timestamp: new Date(),
            likes: 0,
          }],
        };
      }
      return t;
    }));
    setReplyContent("");
    setReplyTo(null);
  };

  const handleLike = (threadId: string, replyId?: string) => {
    setThreads(threads.map((t) => {
      if (t.id === threadId) {
        if (replyId) {
          return {
            ...t,
            replies: t.replies.map((r) => r.id === replyId ? { ...r, likes: r.likes + 1 } : r),
          };
        }
        return { ...t, likes: t.likes + 1 };
      }
      return t;
    }));
  };

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 600 }}>💭 Discussion Threads</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Thread title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "13px",
          }}
        />
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            width: "120px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "13px",
          }}
        />
      </div>
      <textarea
        placeholder="Start a discussion..."
        value={newThread}
        onChange={(e) => setNewThread(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "8px",
          border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
          background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
          color: isDark ? "#f8fafc" : "#1e293b",
          fontSize: "13px",
          resize: "vertical",
          minHeight: "80px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={handlePostThread}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(99, 102, 241, 0.9)",
          color: "#f8fafc",
          fontSize: "13px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Post Thread
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {threads.map((thread) => (
          <div
            key={thread.id}
            style={{
              padding: "16px",
              borderRadius: "8px",
              background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
              border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>{thread.title}</h3>
              <span style={{ fontSize: "11px", opacity: 0.6 }}>{thread.timestamp.toLocaleDateString()}</span>
            </div>
            <p style={{ margin: "0 0 12px", fontSize: "13px", opacity: 0.9, lineHeight: 1.5 }}>{thread.content}</p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <button
                onClick={() => handleLike(thread.id)}
                style={{ background: "none", border: "none", color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                ❤️ {thread.likes}
              </button>
              <button
                onClick={() => setReplyTo(replyTo === thread.id ? null : thread.id)}
                style={{ background: "none", border: "none", color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px", cursor: "pointer" }}
              >
                💬 Reply ({thread.replies.length})
              </button>
            </div>

            {replyTo === thread.id && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReply(thread.id)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
                    background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
                    color: isDark ? "#f8fafc" : "#1e293b",
                    fontSize: "12px",
                  }}
                />
                <button
                  onClick={() => handleReply(thread.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    background: "rgba(99, 102, 241, 0.9)",
                    color: "#f8fafc",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            )}

            {thread.replies.length > 0 && (
              <div style={{ marginLeft: "16px", borderLeft: "2px solid rgba(99, 102, 241, 0.3)", paddingLeft: "12px" }}>
                {thread.replies.map((reply) => (
                  <div key={reply.id} style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 600, fontSize: "12px" }}>{reply.author}</span>
                      <span style={{ fontSize: "10px", opacity: 0.6 }}>{reply.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p style={{ margin: "0 0 4px", fontSize: "12px", opacity: 0.9 }}>{reply.content}</p>
                    <button
                      onClick={() => handleLike(thread.id, reply.id)}
                      style={{ background: "none", border: "none", color: isDark ? "#94a3b8" : "#64748b", fontSize: "11px", cursor: "pointer" }}
                    >
                      ❤️ {reply.likes}
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
