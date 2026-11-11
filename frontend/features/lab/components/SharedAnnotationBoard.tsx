"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { labStorageKey, useLabStorage } from "./use-lab-storage";

export interface BoardAnnotation {
  id: string;
  author: string;
  annotationId: string;
  note: string;
  timestamp: string;
  likes: number;
}

const INITIAL_ANNOTATIONS: BoardAnnotation[] = [
  { id: "1", author: "Alice", annotationId: "1", note: "This vertex is crucial for understanding symmetry!", timestamp: new Date().toISOString(), likes: 5 },
  { id: "2", author: "Bob", annotationId: "2", note: "The golden ratio connection is fascinating", timestamp: new Date().toISOString(), likes: 3 },
  { id: "3", author: "Charlie", annotationId: "3", note: "Can someone explain the normal vector better?", timestamp: new Date().toISOString(), likes: 1 },
];

const ANNOTATION_TARGETS = [
  { value: "1", label: "Vertex A" },
  { value: "2", label: "Edge B" },
  { value: "3", label: "Face C" },
];

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString();
}

export interface SharedAnnotationBoardProps {
  labId: string;
}

export function SharedAnnotationBoard({ labId }: SharedAnnotationBoardProps) {
  const [annotations, setAnnotations] = useLabStorage<BoardAnnotation[]>(
    labStorageKey(labId, "annotations"),
    INITIAL_ANNOTATIONS
  );
  const [newNote, setNewNote] = useState("");
  const [selectedAnnotation, setSelectedAnnotation] = useState("1");
  const [userName, setUserName] = useState("Student");

  const handleSubmit = () => {
    if (!newNote.trim()) return;
    const annotation: BoardAnnotation = {
      id: Date.now().toString(),
      author: userName,
      annotationId: selectedAnnotation,
      note: newNote,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setAnnotations([annotation, ...annotations]);
    setNewNote("");
  };

  const handleLike = (id: string) => {
    setAnnotations(
      annotations.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-[140px]"
        />
        <Select value={selectedAnnotation} onValueChange={setSelectedAnnotation}>
          <SelectTrigger className="flex-1" aria-label="Annotation target">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ANNOTATION_TARGETS.map((target) => (
              <SelectItem key={target.value} value={target.value}>
                {target.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a note…"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1"
        />
        <Button onClick={handleSubmit}>Post</Button>
      </div>

      <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto">
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className="rounded-lg border border-border bg-muted/40 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{annotation.author}</span>
              <span className="text-[11px] text-muted-foreground">
                {formatTime(annotation.timestamp)}
              </span>
            </div>
            <p className="mb-2 text-sm leading-relaxed">{annotation.note}</p>
            <button
              type="button"
              onClick={() => handleLike(annotation.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Heart className="h-3.5 w-3.5" />
              {annotation.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
