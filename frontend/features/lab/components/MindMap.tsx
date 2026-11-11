"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface MindMapNode {
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

const SUBJECT_FILTERS = ["All", "Math", "Physics", "Chemistry"];

export function MindMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("All");

  const filteredNodes =
    filterSubject === "All"
      ? MIND_MAP_NODES
      : MIND_MAP_NODES.filter((n) => n.subject === filterSubject);
  const selectedNodeData = MIND_MAP_NODES.find((n) => n.id === selectedNode);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-[180px]" aria-label="Filter by subject">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_FILTERS.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-lg border border-border bg-muted/30">
        <svg width="100%" height="100%" className="absolute top-0 left-0">
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
                  stroke="currentColor"
                  className="text-primary/30"
                  strokeWidth="2"
                />
              );
            })
          )}
        </svg>

        {filteredNodes.map((node) => {
          const color = SUBJECT_COLORS[node.subject] ?? "#64748b";
          const isSelected = selectedNode === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node.id)}
              className={`absolute rounded-full border-2 px-4 py-2 text-xs font-semibold transition-all ${
                isSelected ? "text-white" : "bg-card text-foreground"
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                borderColor: color,
                backgroundColor: isSelected ? color : undefined,
                boxShadow: isSelected ? `0 0 20px ${color}` : undefined,
              }}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      {selectedNodeData && (
        <div className="rounded-lg bg-primary/10 p-3 text-sm">
          <strong style={{ color: SUBJECT_COLORS[selectedNodeData.subject] }}>
            {selectedNodeData.label}
          </strong>
          <span className="ml-2 text-muted-foreground">— {selectedNodeData.subject}</span>
          {selectedNodeData.connections.length > 0 && (
            <div className="mt-2 text-muted-foreground">
              Connected to:{" "}
              {selectedNodeData.connections
                .map((id) => MIND_MAP_NODES.find((n) => n.id === id)?.label)
                .filter(Boolean)
                .join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
