import { EmptyState } from "@/components/content/empty-state";
import { StatusBadge } from "@/components/content/status-badge";
import { NOTE_STATUS, NOTE_STATUS_HINTS } from "@/lib/content/note-status";
import {
  getImportedNotesForSubject,
  getImportedNotesForTopic,
  getImportedNotesForUnit,
  type NotesTrack,
} from "@/lib/imported-notes";
import { RenderedImportedNote } from "@/components/content/rendered-imported-note";

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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-xl font-bold tracking-tight">Notes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, idx) => (
          <div
            key={note.path}
            className="animate-slide-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <RenderedImportedNote note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}
