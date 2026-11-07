"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NotebookPen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPTY_DRAFT,
  MAX_NOTE_BODY,
  MAX_NOTE_QUOTE,
  addNote,
  notesScope,
  filterNotes,
  readNotes,
  removeNote,
  updateNote,
  validateNote,
  writeNotes,
  type NoteDraft,
  type PersonalNote,
} from "@/lib/personal-notes";
import { listGoalSubjects } from "@/lib/study-goals";
import { pushNotes } from "@/lib/user-state";
import { NotesSync } from "./notes-sync";

const SELECT = "h-9 rounded-md border bg-background px-2 text-sm";

/** /my-notes: the student's own notes and annotations, device-local, apart from curriculum notes. */
export function MyNotesView() {
  const subjects = listGoalSubjects();
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [draft, setDraft] = useState<NoteDraft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  // Scope the notes were loaded under. A save is only valid in that scope.
  const loadedScope = useRef<string | null>(null);
  const load = useCallback(() => {
    loadedScope.current = notesScope();
    setNotes(readNotes());
  }, []);
  useEffect(load, [load]);

  /** Returns false (and reloads) when the account changed since load. */
  const commit = (next: PersonalNote[]): boolean => {
    if (!writeNotes(next, loadedScope.current ?? notesScope())) {
      load();
      setDraft(EMPTY_DRAFT);
      setEditing(null);
      setError("Your account changed in another tab. Your notes were reloaded and this change was not saved.");
      return false;
    }
    setNotes(next);
    // Best-effort account-backed write; failures leave the local copy intact
    // and queue the change for the next reconnect.
    void pushNotes();
    return true;
  };

  const save = () => {
    const problem = validateNote(draft);
    setError(problem);
    if (problem) return;
    const now = new Date().toISOString();
    const saved = commit(
      editing
        ? updateNote(notes, editing, draft, now)
        : addNote(notes, draft, `n-${Date.now().toString(36)}-${notes.length}`, now),
    );
    if (!saved) return;
    setDraft(EMPTY_DRAFT);
    setEditing(null);
  };

  const subjectName = (key: string) => subjects.find((s) => s.key === key)?.subjectName;
  const shown = filterNotes(notes, query, filter);

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <NotebookPen className="h-6 w-6" /> My notes
        </h1>
        <p className="text-sm text-muted-foreground">
          Your own notes and annotations, separate from the curriculum notes. Saved on this device and synced to your account when you&apos;re online.
        </p>
        <NotesSync onSynced={load} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{editing ? "Edit note" : "New note"}</CardTitle>
          <CardDescription>Paste a passage into “Annotating” to comment on it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="note-title">Title</Label>
            <Input id="note-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="note-subject">Subject</Label>
            <select
              id="note-subject"
              className={SELECT}
              value={draft.subjectKey}
              onChange={(e) => setDraft({ ...draft, subjectKey: e.target.value })}
            >
              <option value="">No subject</option>
              {subjects.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.subjectName} ({s.className})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="note-quote">Annotating (optional)</Label>
            <Textarea id="note-quote" rows={2} maxLength={MAX_NOTE_QUOTE} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="note-body">Note</Label>
            <Textarea id="note-body" rows={5} maxLength={MAX_NOTE_BODY} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={save}>{editing ? "Save changes" : "Add note"}</Button>
            {editing && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setDraft(EMPTY_DRAFT);
                  setError(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-2">
        <Input aria-label="Search notes" className="max-w-xs" placeholder="Search notes" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter by subject" className={SELECT} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.key} value={s.key}>
              {s.subjectName} ({s.className})
            </option>
          ))}
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {notes.length === 0 ? "No notes yet. Add your first one above." : "No notes match."}
        </p>
      ) : (
        <ul className="space-y-3">
          {shown.map((n) => (
            <li key={n.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{n.title}</CardTitle>
                  <CardDescription>
                    {subjectName(n.subjectKey) ?? "No subject"} · edited {n.updatedAt.slice(0, 10)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {n.quote && <blockquote className="border-l-2 pl-3 text-sm italic text-muted-foreground">{n.quote}</blockquote>}
                  {n.body && <p className="whitespace-pre-wrap text-sm">{n.body}</p>}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(n.id);
                        setDraft({ title: n.title, body: n.body, quote: n.quote, subjectKey: n.subjectKey });
                        setError(null);
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" aria-label={`Delete ${n.title}`} onClick={() => commit(removeNote(notes, n.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
