"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ImportedNote } from "@/lib/imported-notes";

type NoteGroup = {
  subject: string;
  notes: ImportedNote[];
};

type SubjectSearchProps = {
  subjects: { slug: string; name: string }[];
  initialGroups: NoteGroup[];
};

export function SubjectSearch({ subjects, initialGroups }: SubjectSearchProps) {
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const filteredGroups = useMemo(() => {
    let groups = initialGroups;

    if (activeSubject) {
      groups = groups.filter((g) => g.subject === activeSubject);
    }

    if (!query.trim()) return groups;

    const q = query.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        notes: group.notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.subject.toLowerCase().includes(q) ||
            (n.unit ?? "").toLowerCase().includes(q) ||
            n.path.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.notes.length > 0);
  }, [query, activeSubject, initialGroups]);

  const totalNotes = filteredGroups.reduce((sum, g) => sum + g.notes.length, 0);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search notes by title, subject, or unit…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 backdrop-blur-sm bg-background/80"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSubject(null)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            activeSubject === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          All Subjects
        </button>
        {subjects.map((s) => {
          const count = initialGroups.find((g) => g.subject === s.slug)?.notes.length ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={s.slug}
              onClick={() => setActiveSubject(activeSubject === s.slug ? null : s.slug)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeSubject === s.slug
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {s.name} ({count})
            </button>
          );
        })}
        {query && (
          <span className="ml-auto text-xs text-muted-foreground">
            {totalNotes} result{totalNotes !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}
