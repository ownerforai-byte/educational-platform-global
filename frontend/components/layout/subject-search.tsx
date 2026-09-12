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

      {/* Filtered Notes Output */}
      {filteredGroups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No notes match your search. Try another keyword or subject filter.
        </div>
      ) : (
        <div className="space-y-6 pt-2">
          {filteredGroups.map((group) => (
            <div key={group.subject} className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="font-semibold capitalize text-foreground flex items-center gap-2 text-base">
                  <span>{group.subject}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    ({group.notes.length} note{group.notes.length !== 1 ? "s" : ""})
                  </span>
                </h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.notes.slice(0, 30).map((note) => {
                  const href =
                    note.source === "r-export"
                      ? `/r-notes/${encodeURIComponent(note.subject)}/${encodeURIComponent(note.unit ?? "general")}`
                      : `/ravikishan-notes/${encodeURIComponent(note.path)}`;

                  return (
                    <a
                      key={note.path + note.title}
                      href={href}
                      className="group flex flex-col justify-between rounded-xl border border-border/60 bg-card p-3.5 hover:border-primary/50 hover:bg-muted/30 transition-all shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {note.title}
                        </span>
                        {note.unit && (
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            Unit: {note.unit}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between pt-2 border-t border-border/30 text-[10px] text-muted-foreground">
                        <span className="uppercase tracking-wider font-mono">{note.source}</span>
                        <span className="text-primary font-medium group-hover:underline">Read →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
              {group.notes.length > 30 && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  + {group.notes.length - 30} more notes in {group.subject}. Refine your search query to see specific topics.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
