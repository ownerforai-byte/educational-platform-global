"use client";

import { useEffect, useState } from "react";
import type { SubjectPyqBank } from "@/lib/pyq-bank";

/**
 * Loads the PYQ bank for a `classSlug/subjectSlug` key via the gated server
 * route `GET /api/content/subject-bank`. The external interface is unchanged:
 * callers receive `{ bank, loading, failed }` with the same `SubjectPyqBank`
 * shape. Direct calls to `getSubjectPyqBank` (a node:fs-dependent lib) are
 * removed from the client bundle — the server route calls it instead.
 */
export function useSubjectBank(subjectKey: string | null) {
  const [bank, setBank] = useState<SubjectPyqBank | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!subjectKey) return;
    const [classSlug, subjectSlug] = subjectKey.split("/");
    let cancelled = false;
    setLoading(true);
    setFailed(false);

    const params = new URLSearchParams({ classSlug, subjectSlug });
    fetch(`/api/content/subject-bank?${params.toString()}`, {
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((b: SubjectPyqBank) => !cancelled && setBank(b))
      .catch(() => !cancelled && (setBank(null), setFailed(true)))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [subjectKey]);

  return { bank, loading, failed };
}
