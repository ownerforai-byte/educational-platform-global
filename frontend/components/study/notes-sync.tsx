"use client";

import { useEffect } from "react";
import { flushQueue, syncNotes } from "@/lib/user-state";

/**
 * Invisible sync driver for /my-notes. Runs on mount, on reconnect and when
 * the tab becomes visible again. It renders nothing and holds no state, so a
 * background sync can never re-render or block the editor.
 */
export function NotesSync({ onSynced }: { onSynced: () => void }) {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await flushQueue();
      const result = await syncNotes();
      if (!cancelled && result.changed) onSynced();
    };

    void run();
    window.addEventListener("online", run);
    const onVisible = () => {
      if (document.visibilityState === "visible") void run();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.removeEventListener("online", run);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [onSynced]);

  return null;
}
