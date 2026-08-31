"use client";

import { useState } from "react";

interface Topic {
  id: string;
  name: string;
  subject: string;
  progress: number;
  completed: boolean;
}

const INITIAL_TOPICS: Topic[] = [
  { id: "1", name: "3D Geometry Basics", subject: "Math", progress: 75, completed: false },
  { id: "2", name: "Trigonometric Functions", subject: "Math", progress: 45, completed: false },
  { id: "3", name: "Calculus Introduction", subject: "Math", progress: 20, completed: false },
  { id: "4", name: "Newton's Laws", subject: "Physics", progress: 90, completed: true },
  { id: "5", name: "Electromagnetism", subject: "Physics", progress: 30, completed: false },
  { id: "6", name: "Organic Chemistry", subject: "Chemistry", progress: 60, completed: false },
  { id: "7", name: "Periodic Table", subject: "Chemistry", progress: 85, completed: true },
  { id: "8", name: "Molecular Structure", subject: "Chemistry", progress: 10, completed: false },
];

export function ProgressTracker({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
  const [filterSubject, setFilterSubject] = useState("All");
  const isDark = theme === "dark";
  const subjects = ["All", ...new Set(topics.map((t) => t.subject))];

  const filteredTopics = filterSubject === "All" ? topics : topics.filter((t) => t.subject === filterSubject);
  const overallProgress = Math.round(topics.reduce((acc, t) => acc + t.progress, 0) / topics.length);

  const _updateProgress = (id: string, progress: number) => {
    setTopics((prev) =>
      prev.map((t) => t.id === id ? { ...t, progress: Math.min(100, Math.max(0, progress)), completed: progress >= 100 } : t)
    );
  };

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>📊 Progress Tracker</h2>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#818cf8" }}>{overallProgress}%</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Overall Progress</div>
        </div>
      </div>

      <select
        value={filterSubject}
        onChange={(e) => setFilterSubject(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
          background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
          color: isDark ? "#f8fafc" : "#1e293b",
          fontSize: "13px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        {subjects.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            style={{
              padding: "14px 16px",
              borderRadius: "8px",
              background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
              border: `1px solid ${topic.completed ? "rgba(16, 185, 129, 0.3)" : isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: "14px" }}>{topic.name}</span>
                <span style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.2)",
                  color: "#818cf8",
                }}>
                  {topic.subject}
                </span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: topic.completed ? "#10b981" : "#818cf8" }}>
                {topic.progress}%
              </span>
            </div>
            <div style={{
              height: "6px",
              borderRadius: "3px",
              background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
              overflow: "hidden",
            }}>
              <div
                style={{
                  height: "100%",
                  width: `${topic.progress}%`,
                  background: topic.completed ? "#10b981" : "#6366f1",
                  borderRadius: "3px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
