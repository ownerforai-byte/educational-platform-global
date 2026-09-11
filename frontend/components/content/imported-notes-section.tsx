import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { StatusBadge } from "@/components/content/status-badge";
import { NOTE_STATUS, NOTE_STATUS_HINTS } from "@/lib/content/note-status";
import {
  getImportedNotesForSubject,
  getImportedNotesForTopic,
  getImportedNotesForUnit,
  type NotesTrack,
} from "@/lib/imported-notes";
import { FileText } from "lucide-react";

type ImportedNotesSectionProps = {
  subject: string;
  unitId?: string;
  topicTitle?: string;
  target?: NotesTrack;
};

export async function ImportedNotesSection({
  subject,
  unitId,
  topicTitle,
  target = "class-11-notes",
}: ImportedNotesSectionProps) {
  const notes = topicTitle && unitId
    ? await getImportedNotesForTopic(subject, unitId, topicTitle, target)
    : unitId
      ? await getImportedNotesForUnit(subject, unitId, target)
      : await getImportedNotesForSubject(subject, target);

  if (notes.length === 0) {
    return (
      <div className="space-y-3">
        <StatusBadge status={NOTE_STATUS.NOT_ADDED} />
        <EmptyState
          title={NOTE_STATUS.NOT_ADDED}
          description={
            topicTitle
              ? `No note is attached to this syllabus topic yet. ${NOTE_STATUS_HINTS[NOTE_STATUS.NOT_ADDED]}`
              : unitId
                ? `No note is attached to this syllabus unit yet. ${NOTE_STATUS_HINTS[NOTE_STATUS.NOT_ADDED]}`
                : `No note is attached to this subject yet. ${NOTE_STATUS_HINTS[NOTE_STATUS.NOT_ADDED]}`
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-xl font-bold tracking-tight">Notes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-xs text-muted-foreground">{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {notes.map((note, idx) => (
          <Link
            key={note.path}
            href={note.path}
            className="group flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-accent/30"
            style={{ animationDelay: `${idx * 20}ms` }}
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {note.title}
              </p>
              {note.unit && (
                <p className="text-xs text-muted-foreground">{note.unit}</p>
              )}
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {note.source === "ravikishan" ? "RK" : "RE"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
