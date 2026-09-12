"use client";

import { useState } from "react";

interface MindMapNode {
  id: string;
  label: string;
  subject: string;
  connections: string[];
  x: number;
  y: number;
}

const MIND_MAP_NODES: MindMapNode[] = [
  { id: "1", label: "Mathematics", subject: "Math", connections: ["2", "3", "4"], x: 50, y: 50 },
  { id: "2", label: "Geometry", subject: "Math", connections: ["5", "6"], x: 20, y: 20 },
  { id: "3", label: "Algebra", subject: "Math", connections: ["7"], x: 80, y: 20 },
  { id: "4", label: "Calculus", subject: "Math", connections: ["8"], x: 50, y: 80 },
  { id: "5", label: "3D Shapes", subject: "Math", connections: [], x: 10, y: 10 },
  { id: "6", label: "Trigonometry", subject: "Math", connections: [], x: 30, y: 10 },
  { id: "7", label: "Equations", subject: "Math", connections: [], x: 90, y: 10 },
  { id: "8", label: "Derivatives", subject: "Math", connections: [], x: 50, y: 90 },
  { id: "9", label: "Physics", subject: "Physics", connections: ["10", "11"], x: 20, y: 50 },
  { id: "10", label: "Mechanics", subject: "Physics", connections: [], x: 10, y: 40 },
  { id: "11", label: "Electromagnetism", subject: "Physics", connections: [], x: 30, y: 40 },
  { id: "12", label: "Chemistry", subject: "Chemistry", connections: ["13", "14"], x: 80, y: 50 },
  { id: "13", label: "Organic", subject: "Chemistry", connections: [], x: 70, y: 40 },
  { id: "14", label: "Inorganic", subject: "Chemistry", connections: [], x: 90, y: 40 },
];

const SUBJECT_COLORS: Record<string, string> = {
  Math: "#6366f1",
  Physics: "#10b981",
  Chemistry: "#f59e0b",
};

export function MindMap({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("All");
  const isDark = theme === "dark";
  const subjects = ["All", "Math", "Physics", "Chemistry"];

  const filteredNodes = filterSubject === "All" ? MIND_MAP_NODES : MIND_MAP_NODES.filter((n) => n.subject === filterSubject);
  const selectedNodeData = MIND_MAP_NODES.find((n) => n.id === selectedNode);

  return (
    <div style={{
      background: isDark ? "#1e293b" : "#f8fafc",
      border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
      borderRadius: "12px",
      padding: "20px",
      color: isDark ? "#f8fafc" : "#1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>🧠 Cross-Subject Mind Map</h2>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
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
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div style={{
        position: "relative",
        height: "400px",
        background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          {filteredNodes.map((node) =>
            node.connections.map((connId) => {
              const connNode = MIND_MAP_NODES.find((n) => n.id === connId);
              if (!connNode) return null;
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${connNode.x}%`}
                  y2={`${connNode.y}%`}
                  stroke={isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}
                  strokeWidth="2"
                />
              );
            })
          )}
        </svg>

        {filteredNodes.map((node) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node.id)}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              padding: "8px 16px",
              borderRadius: "20px",
              background: selectedNode === node.id ? SUBJECT_COLORS[node.subject] : isDark ? "rgba(30, 41, 59, 0.9)" : "rgba(248, 250, 252, 0.9)",
              border: `2px solid ${SUBJECT_COLORS[node.subject]}`,
              color: selectedNode === node.id ? "white" : isDark ? "#f8fafc" : "#1e293b",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: selectedNode === node.id ? `0 0 20px ${SUBJECT_COLORS[node.subject]}` : "none",
            }}
          >
            {node.label}
          </div>
        ))}
      </div>

      {selectedNodeData && (
        <div style={{
          marginTop: "16px",
          padding: "12px 16px",
          borderRadius: "8px",
          background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
          fontSize: "13px",
        }}>
          <strong style={{ color: SUBJECT_COLORS[selectedNodeData.subject] }}>{selectedNodeData.label}</strong>
          <span style={{ marginLeft: "8px", opacity: 0.7 }}>— {selectedNodeData.subject}</span>
          {selectedNodeData.connections.length > 0 && (
            <div style={{ marginTop: "8px", opacity: 0.8 }}>
              Connected to: {selectedNodeData.connections.map((id) => MIND_MAP_NODES.find((n) => n.id === id)?.label).filter(Boolean).join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
