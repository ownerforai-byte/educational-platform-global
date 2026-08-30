"use client";

import { useState } from "react";

interface BoardAnnotation {
  id: string;
  author: string;
  annotationId: string;
  note: string;
  timestamp: Date;
  likes: number;
}

const INITIAL_ANNOTATIONS: BoardAnnotation[] = [
  { id: "1", author: "Alice", annotationId: "1", note: "This vertex is crucial for understanding symmetry!", timestamp: new Date(), likes: 5 },
  { id: "2", author: "Bob", annotationId: "2", note: "The golden ratio connection is fascinating", timestamp: new Date(), likes: 3 },
  { id: "3", author: "Charlie", annotationId: "3", note: "Can someone explain the normal vector better?", timestamp: new Date(), likes: 1 },
];

export function SharedAnnotationBoard({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [annotations, setAnnotations] = useState<BoardAnnotation[]>(INITIAL_ANNOTATIONS);
  const [newNote, setNewNote] = useState("");
  const [selectedAnnotation, setSelectedAnnotation] = useState("1");
  const [userName, setUserName] = useState("Student");
  const isDark = theme === "dark";

  const handleSubmit = () => {
    if (!newNote.trim()) return;
    const annotation: BoardAnnotation = {
      id: Date.now().toString(),
      author: userName,
      annotationId: selectedAnnotation,
      note: newNote,
      timestamp: new Date(),
      likes: 0,
    };
    setAnnotations([annotation, ...annotations]);
    setNewNote("");
  };

  const handleLike = (id: string) => {
    setAnnotations(annotations.map((a) => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 600 }}>💬 Shared Annotation Board</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "13px",
            width: "120px",
          }}
        />
        <select
          value={selectedAnnotation}
          onChange={(e) => setSelectedAnnotation(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "13px",
            flex: 1,
          }}
        >
          <option value="1">Vertex A</option>
          <option value="2">Edge B</option>
          <option value="3">Face C</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(99, 102, 241, 0.9)",
            color: "#f8fafc",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "300px", overflowY: "auto" }}>
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
              border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontWeight: 600, fontSize: "13px" }}>{annotation.author}</span>
              <span style={{ fontSize: "11px", opacity: 0.6 }}>
                {annotation.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p style={{ margin: "0 0 8px", fontSize: "13px", lineHeight: 1.5 }}>{annotation.note}</p>
            <button
              onClick={() => handleLike(annotation.id)}
              style={{
                background: "none",
                border: "none",
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ❤️ {annotation.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
