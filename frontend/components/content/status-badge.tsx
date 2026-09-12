import { NOTE_STATUS, NOTE_STATUS_HINTS, type NoteStatus } from "@/lib/content/note-status";

const STYLES: Record<NoteStatus, string> = {
  [NOTE_STATUS.NOT_ADDED]:
    "border-border bg-muted/50 text-muted-foreground",
  [NOTE_STATUS.EMPTY]:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  [NOTE_STATUS.BROKEN]:
    "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400",
  [NOTE_STATUS.OK]: "",
};

/**
 * Pill showing one of the content lifecycle code words
 * (NOT_ADDED | EMPTY | BROKEN). OK is never rendered — no badge means OK.
 */
export function StatusBadge({ status }: { status: NoteStatus }) {
  if (status === NOTE_STATUS.OK) return null;
  return (
    <span
      title={NOTE_STATUS_HINTS[status]}
      className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
