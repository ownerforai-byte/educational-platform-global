"use client";

import { useState } from "react";

interface AnalyticsData {
  topic: string;
  attempts: number;
  correct: number;
  avgTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

const ANALYTICS_DATA: AnalyticsData[] = [
  { topic: "3D Geometry", attempts: 15, correct: 12, avgTime: 45, difficulty: "Easy" },
  { topic: "Trigonometry", attempts: 20, correct: 14, avgTime: 60, difficulty: "Medium" },
  { topic: "Calculus", attempts: 10, correct: 6, avgTime: 90, difficulty: "Hard" },
  { topic: "Algebra", attempts: 25, correct: 22, avgTime: 35, difficulty: "Easy" },
  { topic: "Physics Laws", attempts: 18, correct: 16, avgTime: 40, difficulty: "Medium" },
];

export function Analytics({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [sortBy, setSortBy] = useState<"topic" | "accuracy" | "time">("accuracy");
  const isDark = theme === "dark";

  const sortedData = [...ANALYTICS_DATA].sort((a, b) => {
    if (sortBy === "topic") return a.topic.localeCompare(b.topic);
    if (sortBy === "accuracy") return (b.correct / b.attempts) - (a.correct / a.attempts);
    return a.avgTime - b.avgTime;
  });

  const overallAccuracy = Math.round(ANALYTICS_DATA.reduce((acc, d) => acc + (d.correct / d.attempts), 0) / ANALYTICS_DATA.length * 100);
  const totalAttempts = ANALYTICS_DATA.reduce((acc, d) => acc + d.attempts, 0);
  const avgTime = Math.round(ANALYTICS_DATA.reduce((acc, d) => acc + d.avgTime, 0) / ANALYTICS_DATA.length);

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>📈 Performance Analytics</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            background: isDark ? "rgba(15, 23, 42, 0.5)" : "white",
            color: isDark ? "#f8fafc" : "#1e293b",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <option value="accuracy">Sort by Accuracy</option>
          <option value="time">Sort by Time</option>
          <option value="topic">Sort by Topic</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
        <div style={{
          padding: "16px",
          borderRadius: "8px",
          background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#818cf8" }}>{overallAccuracy}%</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Overall Accuracy</div>
        </div>
        <div style={{
          padding: "16px",
          borderRadius: "8px",
          background: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#10b981" }}>{totalAttempts}</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Total Attempts</div>
        </div>
        <div style={{
          padding: "16px",
          borderRadius: "8px",
          background: isDark ? "rgba(245, 158, 11, 0.2)" : "rgba(245, 158, 11, 0.1)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#f59e0b" }}>{avgTime}s</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Avg Time/Question</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {sortedData.map((data, index) => {
          const accuracy = Math.round((data.correct / data.attempts) * 100);
          return (
            <div
              key={index}
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: "14px" }}>{data.topic}</span>
                <span style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: data.difficulty === "Easy" ? "rgba(16, 185, 129, 0.2)" : data.difficulty === "Medium" ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)",
                  color: data.difficulty === "Easy" ? "#10b981" : data.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
                }}>
                  {data.difficulty}
                </span>
              </div>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>{data.attempts} attempts</span>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>{data.avgTime}s avg</span>
                <span style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: accuracy >= 80 ? "#10b981" : accuracy >= 60 ? "#f59e0b" : "#ef4444",
                }}>
                  {accuracy}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
